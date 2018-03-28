
open Imandra_lib

let init () =
  Pconfig.State.Set.push_top_results true;
  Pconfig.State.Set.console_print false;
  Imandra.do_init ()

let bigflush () =
  Format.pp_print_flush Format.std_formatter ();
  Format.pp_print_flush Format.err_formatter ();
  flush_all ()

let wrap_capture callback f =
  let open Unix in
  Unix.putenv "TERM" ""; (* ensure that upon errors, invalid input is repeated *)
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

module Res = Imandra_lib.Top_result

let exec code (callback:string -> unit) : Res.t list =
  wrap_capture callback @@ fun () ->
  wrap_exec_exn []      @@ fun () ->
  Imandra.eval_string code

let exec_lwt (code:string) : (string * Res.t list) Lwt.t =
  let out = ref "" in
  let r_l = exec code (fun s -> out := s) in
  Lwt.return (!out,r_l)
