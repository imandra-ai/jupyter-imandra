
module C = Jupyter_kernel.Client
module Main = Jupyter_kernel.Client_main
module Log = Jupyter_kernel.Log
module I_top = Imandra_lib.Imandra (* imandra toplevel *)

module Res = struct
  module R = Imandra_lib.Top_result
  module H = Tyxml.Html

  type t = Imandra_lib.Top_result.t
  type 'a html = ([<Html_types.div] as 'a) H.elt

  (* render result as HTML *)
  let html_of_res (r:t) : _ html =
    let module Expr = Imandra_lib.Expr in
    begin match R.view r with
      | R.Verify v ->
        let header = match v with
          | R.V_proved _ -> H.h4 ~a:[H.a_style "color=green"] @@ [H.pcdata "Proved"]
          | R.V_refuted _ -> H.h4 ~a:[H.a_style "color=red"] @@ [H.pcdata "Refuted"]
          | R.V_unknown _ -> H.h4 ~a:[H.a_style "color=yellow"] @@ [H.pcdata "Unknown"]
        in
        H.div [header; H.p @@ [H.pcdata (R.to_string r)]]
      | R.Decompose l ->
        let rows =
          List.map
            (fun { R.reg_constraints; reg_invariant } ->
               let col1 =
                 H.ul
                   (List.map
                      (fun f -> H.li [H.pcdata @@ Expr.to_string f]) reg_constraints)
               and col2 =
                 H.pcdata @@ Expr.to_string reg_invariant
               in
               H.tr [H.td [col1]; H.td [col2]])
            l
        in
        let thead =
          H.thead [H.tr [H.th [H.pcdata "constraints"]; H.th [H.pcdata "invariants"]]]
        in
        H.div [H.table ~thead rows]
    end

  let mime_of_html (h:_ H.elt) : C.mime_data =
    let s = CCFormat.sprintf "%a@." (H.pp_elt ()) h in
    {C.mime_type="text/html"; mime_content=s; mime_b64=false}

  let to_action (r:t) : C.Kernel.exec_action =
    let m = html_of_res r |> mime_of_html in
    C.Kernel.Mime [m]
end

module Exec = struct
  let init () = I_top.do_init ()

  let bigflush () =
    Format.pp_print_flush Format.std_formatter ();
    Format.pp_print_flush Format.err_formatter ();
    flush_all ()

  let wrap_capture callback f =
    let open Unix in
    CCIO.File.with_temp ~prefix:"jupyter-imandra" ~suffix:".capture"
      (fun capture ->
         let fd = openfile capture [ O_RDWR; O_TRUNC; O_CREAT ] 0o600  in
         let tmp_cout, tmp_cerr = dup stdout, dup stderr in
         dup2 fd stdout;
         dup2 fd stderr;
         let reset () =
           bigflush ();
           dup2 tmp_cout stdout;
           dup2 tmp_cerr stderr;
         in
         let result =
           try f ()
           with ex ->
             reset ();
             close fd;
             print_endline "wrap_capture exception here";
             flush_all ();
             raise ex
         in
         reset ();
         let sz = (fstat fd).st_size in
         let buffer = Bytes.create sz in
         let _ = lseek fd 0 SEEK_SET in
         let _ = read  fd buffer 0 sz in
         close fd;
         callback buffer;
         result)

  (* TODO: wow ??? *)
  let wrap_exec_exn default f =
    let snap = Btype.snapshot () in
    try
      f ()
    with
      | Sys.Break ->
        Btype.backtrack snap;
        print_endline "Keyboard interrupt.";
        default
      | x ->
        Btype.backtrack snap;
        print_endline "Compiler exception:";
        flush_all ();
        Location.report_exception Format.err_formatter x;
        default

  let exec code (callback:string -> unit) : Res.t list =
    wrap_capture callback @@ fun () ->
    wrap_exec_exn []      @@ fun () ->
    I_top.eval_string code

  let exec_lwt (code:string) : (string * Res.t list) Lwt.t =
    let out = ref "" in
    let r_l = exec code (fun s -> out := s) in
    Lwt.return (!out,r_l)
end

(* blocking function *)
let run_ count str : C.Kernel.exec_status_ok C.or_error Lwt.t =
  let open Lwt.Infix in
  Log.log ("parse " ^ str);
  Lwt.catch
    (fun res ->
       Exec.exec_lwt str >|= fun (out,res_l) ->
       let actions = List.map Res.to_action res_l in
       Result.Ok (C.Kernel.ok ~actions @@ Some out))
    (function
      | Stack_overflow ->
        Lwt.return @@ Result.Error "stack overflow."
      | e ->
        Result.Error
          (CCFormat.sprintf "error: %s@." (Printexc.to_string e))
        |> Lwt.return )

(* auto-completion *)
let complete pos str =
  let completion_matches = []
  (* FIXME
    if pos > String.length str then []
    else
      Completion.complete ~cursor_pos:pos str
      |> List.map (fun c -> c.Completion.text)
  *)
  in
  let c = {
    C.Kernel.completion_matches;
    completion_start=0; completion_end=pos
  } in
  c

let is_complete s =
  let r =
    if CCString.mem ~sub:";;" s
    then C.Kernel.Is_complete else C.Kernel.Is_not_complete ""
  in
  Lwt.return r

let kernel : C.Kernel.t =
  C.Kernel.make
    ~banner:"Imandra"
    ~exec:(fun ~count msg -> run_ count msg)
    ~is_complete
    ~history:(fun _ -> Lwt.return [])
    ~inspect:(fun _ -> Lwt.return (Result.Error "not implemented"))
    ~language:"Imandra"
    ~language_version:[0;1;0]
    ~complete:(fun ~pos msg -> Lwt.return @@ complete pos msg)
    ()

let () =
  (* initialize before starting lwt *)
  Exec.init();
  Imandra_lib.Pconfig.State.Set.top_print false; (* we'll print results ourself *)
  print_endline "init done";
  Lwt_main.run
    (Main.main ~usage:"jupyter-imandra" kernel)
