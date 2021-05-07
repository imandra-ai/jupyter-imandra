open Imandra_client_lib
open Jupyter_imandra

module C = Jupyter_kernel.Client
module Main = Jupyter_kernel.Client_main
module H = Tyxml.Html

let mime_of_html (h:_ H.elt) : C.mime_data =
  let s = CCFormat.sprintf "%a@." (H.pp_elt ()) h in
  {C.mime_type="text/html"; mime_content=s; mime_b64=false}


let mime_of_txt (s:string) : C.mime_data =
  {C.mime_type="text/plain"; mime_content=s; mime_b64=false}
let mime_of_md (s:string) : C.mime_data =
  {C.mime_type="text/markdown"; mime_content=s; mime_b64=false}

module Res = struct
  module R = Evaluator.Res
  type 'a html = 'a Doc_render.html

  let to_action (r : R.t) : C.Kernel.exec_action =
    let open Top_result in
    let m =
      match view r with
      | Modular_decomp d ->
        Decompose_render.to_html r d
        |> mime_of_html

      | Verify vr ->
        Doc_render.html_of_verify_result vr
        |> mime_of_html

      | Instance ir ->
        Doc_render.html_of_instance_result ir
        |> mime_of_html

      | _ ->
        R.to_doc r
        |> Doc_render.to_html
        |> mime_of_html
    in
    C.Kernel.Mime [m]
end

(* blocking function *)
let run_ count str : C.Kernel.exec_status_ok C.or_error Lwt.t =
  let open Lwt.Infix in
  Log.debug (fun k->k "parse %S" str);
  if str = "##coredump" then
    let () = Coredump.into_file None in
    (Result.Ok (C.Kernel.ok (Some "Coredump written.")))
    |> Lwt.return
  else
    Lwt.catch
      (fun () ->
         Evaluator.exec_lwt ~count str >|= fun (out,res_l) ->
         let actions = List.map Res.to_action res_l in
         Result.Ok (C.Kernel.ok ~actions @@ Some out))
      (fun _e ->
         (* Any exception that reaches here from imandra should indicate a
         problem, so we want to know about it *)
         Log.err (fun k->k "exn: %s\n%s\n%!" (Printexc.to_string _e) (Printexc.get_backtrace()));
         Coredump.into_file None;
         print_endline "exception, restart";
         Lwt.fail C.Restart
      )

(* auto-completion *)
let complete pos str =
  let module IC = Completion in
  let hist = History.State.get() in
  let ctx = {IC.env = History.last_env hist; db = History.db hist} in
  let start, stop, l =
    if pos > String.length str then 0,0, []
    else (
      let {IC.start;stop;x=l} = IC.complete_at ctx ~cursor_pos:pos str in
      start, stop, List.map (fun c -> c.IC.text) l
    )
  in
  let c = {
    C.Kernel.completion_matches=l;
    completion_start=start; completion_end=stop;
  } in
  c

(* inspection *)
let inspect (r:C.Kernel.inspect_request) : (C.Kernel.inspect_reply_ok, string) result =
  try
    let module Isp = Completion.Inspect in
    let {C.Kernel.ir_code=c; ir_cursor_pos=pos; ir_detail_level=lvl} = r in
    Log.debug (fun k->k "inspection request %s :pos %d :lvl %d" c pos lvl);
    let hist = History.State.get() in
    let ctx = {Completion.env = History.last_env hist; db = History.db hist} in
    match Isp.inspect_at ctx c ~cursor_pos:pos with
    | None ->
      (* not found *)
      Ok {C.Kernel.iro_status="ok"; iro_found=false; iro_data=[]}
    | Some {text; descr; ev=None; _} ->
      let txt = mime_of_txt @@ Printf.sprintf "%s\n%s" text descr in
      Ok {C.Kernel.iro_status="ok"; iro_found=true; iro_data=[txt]}
    | Some {ev=Some ev;_} ->
      let d = Event.to_doc ~proofs:true ev in
      let txt_md = mime_of_md @@ Document.to_string_markdown d
      and html = mime_of_html @@ Doc_render.to_html d in
      Ok {C.Kernel.iro_status="ok"; iro_found=true; iro_data=[txt_md;html]}
  with e ->
    let bt = Printexc.get_backtrace() in
    Error (Printexc.to_string e ^ bt)

let is_complete s =
  let r =
    if CCString.mem ~sub:";;" s
    then C.Kernel.Is_complete else C.Kernel.Is_not_complete ""
  in
  Lwt.return r


let ocaml_kernel : C.Kernel.t =
  C.Kernel.make
    ~banner:"Imandra"
    ~exec:(fun ~count msg -> run_ count msg)
    ~is_complete
    ~history:(fun _ -> Lwt.return [])
    ~inspect:(fun ir -> Lwt.return @@ inspect ir)
    ~language:"ocaml"
    ~language_version:[0;1;0]
    ~codemirror_mode:"mllike"
    ~file_extension:".ml"
    ~complete:(fun ~pos msg -> Lwt.return @@ complete pos msg)
    ()

let reason_kernel : C.Kernel.t =
  C.Kernel.make
    ~banner:"Imandra (ReasonML)"
    ~exec:(fun ~count msg -> run_ count msg)
    ~is_complete
    ~history:(fun _ -> Lwt.return [])
    ~inspect:(fun ir -> Lwt.return @@ inspect ir)
    ~language:"reasonml"
    ~language_version:[0;1;0]
    ~codemirror_mode:"rust" (* rust mode highlights reason files surprisingly well *)
    ~file_extension:".re"
    ~complete:(fun ~pos msg -> Lwt.return @@ complete pos msg)
    ()

let () =
  Unix.putenv "TERM" "dumb";
  Log.setup_logs_sync ();
  let use_reason = ref false in
  let server_name = ref None in
  let address = ref None in
  let socket_dir = ref None in
  let no_start_server = ref false in
  let no_backend = ref false in
  let use_tcp = ref false in

  let config = Main.mk_config
    ~additional_args:[
      ("--lockdown", Arg.Int(fun lockdown_uuid -> Pconfig.State.Set.lockdown (Some lockdown_uuid)), " Lockdown mode to the given user id");
      ("--coredump-dir", Arg.String(fun dir -> Pconfig.State.Set.coredump_dir (Some dir)), " Enable coredumps and write them to given dir");
      ("--require", Arg.String Imandra.require_lib_at_init, " Require given library at init");
      ("--require-use", Arg.String (Imandra.require_lib_at_init ~meth:`Use), " Require given library at init using `#use`");
      ("--require-mod-use", Arg.String (Imandra.require_lib_at_init ~meth:`Mod_use), " Require given library at init using `#mod_use`");
      ("--use", Arg.String Imandra.use_at_init, " Use code snippet at init");
      ("--reason", Arg.Set use_reason, " Use reason syntax");
      ("--server", Arg.String (fun s -> server_name := Some s), " Name of server process");
      ("--address", Arg.String (fun s -> address := Some(s)), " Socket address used to communicate with the server");
      ("--socket-dir", Arg.String (fun s -> socket_dir := Some(s)), " Directory in which to create the socket used to communicate with the server");
      ("--no-start-server", Arg.Set no_start_server, " Don't try to start the server subprocess (use in combination with --address if you are running the server in a separate process)");
      ("--no-backend", Arg.Set no_backend, " no Imandra backend");
      ("--tcp", Arg.Set use_tcp, " Use tcp to communicate with server");
    ]
    ~usage:"jupyter-imandra"
    ()
  in
  let run() =
    Logs.info (fun k->k "jymandra: run");
    Evaluator.init ~reason:(!use_reason) ();
    let kernel = if !use_reason then reason_kernel else ocaml_kernel in
    Lwt_main.run (Main.main ~config ~kernel);
    Logs.info (fun k->k "main loop finished");
    ()
  in
  if !no_backend then (
    Imandra_client_lib.Client_with_no_backend.run run
  ) else (
    Client.with_server
      ?address:!address
      ~use_tcp:!use_tcp
      ?socket_dir:!socket_dir
      ~start_server:(not !no_start_server)
      ?server_name:!server_name
      run
  )
