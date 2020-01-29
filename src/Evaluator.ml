module Log = Jupyter_imandra.Log
open Imandra_client_lib

let init ?(reason=false) () =
  Log.debug (fun k->k "initialize reason=%B" reason);
  Printexc.record_backtrace true;
  Pconfig.State.Set.print_banner false;
  let syntax = if reason then Syntax.Reason else Syntax.Iml in
  Imandra_client_lib.Imandra.do_init ~syntax ~linenoise:false ();
  (* reflect jupyter imandra *)
  Topdirs.dir_directory @@ Imandra_interactive.Util_packages.ocamlfind_dir_of_lib "jupyter-imandra";
  (* setup some params *)
  Pconfig.State.Set.push_top_results true;
  Pconfig.State.Set.console_tags [Console.T.Waterfall; Console.T.Suggestions];
  Pconfig.State.Set.redef true;
  Pconfig.State.Set.timeout 60_000;
  Log.debug (fun k->k "init done");
  ()

let bigflush () =
  Log.debug (fun k->k "bigflush start");
  Format.pp_print_flush Format.std_formatter ();
  Format.pp_print_flush Format.err_formatter ();
  Log.debug (fun k->k "bigflush done");
  ()

let wrap_capture (callback:string -> unit) (f:unit -> 'a) : 'a =
  let open Unix in
  Unix.putenv "TERM" ""; (* ensure that upon errors, invalid input is repeated *)
  CCIO.File.with_temp ~prefix:"jupyter-imandra" ~suffix:".capture"
    (fun capture ->
       Log.debug (fun k->k "wrap capture with %S" capture);
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
           Printf.printf "wrap_capture exception here: %s\n%s\n%!"
             (Printexc.to_string ex) (Printexc.get_backtrace ());
           bigflush();
           raise ex
       in
       reset ();
       let sz = (fstat fd).st_size in
       let buffer = Bytes.create sz in
       let _ = lseek fd 0 SEEK_SET in
       let _ = read  fd buffer 0 sz in
       close fd;
       callback (Bytes.unsafe_to_string buffer);
       Log.debug (fun k->k "wrap capture for %S is done" capture);
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
    | _ex ->
      Btype.backtrack snap;
      Printf.printf "Compiler exception:\n%s\n%!" (Printexc.to_string _ex);
      default

module Res = Imandra_client_lib.Top_result

let exec ~count code (callback:string -> unit) : Res.t list =
  Log.debug (fun k->k "(@[exec count=%d@ code=```@.%s@.```@])" count code);
  wrap_capture callback @@ fun () ->
  wrap_exec_exn []      @@ fun () ->
  let loc = Printf.sprintf "jupyter cell %d" count in
  Imandra.eval_string ~loc code

let exec_lwt ~count (code:string) : (string * Res.t list) Lwt.t =
  Lwt_preemptive.detach
    (fun () ->
      let out = ref "" in
      let r_l = exec ~count code (fun s -> out := s) in
      !out,r_l)
    ()
