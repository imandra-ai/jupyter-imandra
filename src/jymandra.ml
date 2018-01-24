
module C = Jupyter_kernel.Client
module Main = Jupyter_kernel.Client_main
module Log = Jupyter_kernel.Log
module I = Imandra_top

module Exec = struct
  let init () = I.do_init ()

  let bigflush () =
    Format.pp_print_flush Format.std_formatter ();
    Format.pp_print_flush Format.err_formatter ();
    flush_all ()

  let wrap_capture callback f =
    let open Unix in
    CCIO.File.with_temp ~prefix:"jupyter-imandra" ~suffix:".capture"
      (fun capture ->
         print_endline @@ "capture file " ^ capture;
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
         print_endline @@ "done with " ^ capture;
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

  let exec code (callback:string -> unit) : unit =
    wrap_capture callback @@ fun () ->
      wrap_exec_exn ()      @@ fun () ->
      I.eval_string code

  let exec_lwt (code:string) : string Lwt.t =
    let r = ref "" in
    exec code (fun s -> r := s);
    Lwt.return !r
end

(* idempotent initialization *)
let start = lazy (Exec.init ())

(* blocking function *)
let run_ count str : C.Kernel.exec_status_ok C.or_error Lwt.t =
  Lazy.force start;
  let open Lwt.Infix in
  print_endline @@ "run " ^ str;
  Log.log ("parse " ^ str);
  Lwt.catch
    (fun res ->
       Exec.exec_lwt str >|= fun res ->
       Result.Ok (C.Kernel.ok ~actions:[] @@ Some res))
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

let is_complete _ = Lwt.return C.Kernel.Is_complete

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
  Lwt_main.run
    (Main.main ~usage:"jupyter-imandra" kernel)
