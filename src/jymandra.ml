open Imandra_client_lib
open Jupyter_imandra

module C = Jupyter_kernel.Client
module Main = Jupyter_kernel.Client_main
module Log = Jupyter_kernel.Log
module H = Tyxml.Html

let mime_of_html (h:_ H.elt) : C.mime_data =
  let s = CCFormat.sprintf "%a@." (H.pp_elt ()) h in
  {C.mime_type="text/html"; mime_content=s; mime_b64=false}


let mime_of_txt (s:string) : C.mime_data =
  {C.mime_type="text/plain"; mime_content=s; mime_b64=false}

module Res = struct
  module R = Evaluator.Res
  type 'a html = 'a Doc_render.html

  let to_action (r : R.t) : C.Kernel.exec_action =
    let open Top_result in
    let m =
      match view r with
      | Decompose d ->
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
  Log.logf "parse %S\n%!" str;
  if str = "##coredump" then
    let () = Imandra.coredump () in
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
         Imandra.coredump ();
         Lwt.fail C.Restart
      )

(* auto-completion *)
let complete pos str =
  let module IC = Completion in
  let start, stop, l =
    if pos > String.length str then 0,0, []
    else (
      let {IC.start;stop;x=l} = IC.complete ~cursor_pos:pos str in
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
    Log.logf "inspection request %s :pos %d :lvl %d\n%!" c pos lvl;
    match Isp.inspect c ~cursor_pos:pos with
    | None ->
      (* not found *)
      Ok {C.Kernel.iro_status="ok"; iro_found=false; iro_data=[]}
    | Some (ev,_) ->
      let d = Event.to_doc ev in
      let txt = mime_of_txt @@
        Document.to_string d
      and html =
        mime_of_html @@ Doc_render.to_html d
      in
      Ok {C.Kernel.iro_status="ok"; iro_found=true; iro_data=[txt;html]}
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
  let use_reason = ref false in
  let fake_server_name = ref None in
  let server_name = ref (Some "imandra_network_client -imandra-web-host https://m.dev.imandracapital.com -auth0-base-host test-ai.eu.auth0.com -auth0-client-id DQs4kqaeTPAENZ8dAj64qEm2SbJgncNK -auth0-audience https://m.dev.imandracapital.com/api -config /Users/dave/.imandra-dev") in
  let imandra_init () =
    Evaluator.init ~reason:!use_reason ();
    print_endline "init done";
    let kernel = if !use_reason then reason_kernel else ocaml_kernel in
    Lwt.return kernel
  in
  Client.with_server ?server_name:!server_name (fun () ->
      Lwt_main.run
        (Main.main
           ~args:[
             ("--lockdown", Arg.Int(fun lockdown_uuid -> Imandra_client_lib.Pconfig.State.Set.lockdown (Some lockdown_uuid)), " Lockdown mode to the given user id");
             ("--coredump-dir", Arg.String(fun dir -> Imandra_client_lib.Pconfig.State.Set.coredump_dir (Some dir)), " Enable coredumps and write them to given dir");
             ("--require", Arg.String Imandra_client_lib.Imandra.require_lib_at_init, " Require given library");
             ("--reason", Arg.Set use_reason, " Use reason syntax");
             ("--server", Arg.String (fun s -> fake_server_name := Some s), " Name of server process")
           ]
           ~usage:"jupyter-imandra"
           ~kernel_init:imandra_init))
