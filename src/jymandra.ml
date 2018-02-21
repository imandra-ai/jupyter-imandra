
open Imandra_lib

module C = Jupyter_kernel.Client
module Main = Jupyter_kernel.Client_main
module Log = Jupyter_kernel.Log

module Res = struct
  module R = Evaluator.Res
  type 'a html = 'a Doc_render.html

  let to_action (r:R.t) : C.Kernel.exec_action =
    let m =
      R.to_doc r
      |> Doc_render.to_html
      |> Doc_render.mime_of_html
    in
    C.Kernel.Mime [m]
end

(* blocking function *)
let run_ count str : C.Kernel.exec_status_ok C.or_error Lwt.t =
  let open Lwt.Infix in
  Log.log ("parse " ^ str);
  Lwt.catch
    (fun res ->
       Evaluator.exec_lwt str >|= fun (out,res_l) ->
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
    ~language:"ocaml"
    ~language_version:[0;1;0]
    ~codemirror_mode:"mllike"
    ~file_extension:".ml"
    ~complete:(fun ~pos msg -> Lwt.return @@ complete pos msg)
    ()

let () =
  (* initialize before starting lwt *)
  Evaluator.init();
  ignore (Imandra.eval_string  "#redef;; ");
  Imandra_lib.Pconfig.State.Set.top_print false; (* we'll print results ourself *)
  print_endline "init done";
  Lwt_main.run
    (Main.main ~usage:"jupyter-imandra" kernel)
