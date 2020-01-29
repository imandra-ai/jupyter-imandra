
let src = Logs.Src.create ~doc:"jupyter-imandra interface" "jymandra"
include (val Logs.src_log src)

module Fmt = CCFormat

let buf_fmt () =
  let b = Buffer.create 512 in
  let fmt = Fmt.formatter_of_buffer b in
  Fmt.set_color_tag_handling fmt;
  let flush() =
    Format.fprintf fmt "@]@?";
    let m = Buffer.contents b in
    Buffer.reset b;
    m
  in
  fmt, flush

let pp_h out (src,lvl,_) =
  let src = Logs.Src.name src in
  let src = if src = "application" then "app" else src in
  match lvl with
  | Logs.Debug -> Fmt.fprintf out "[@{<black>debug@}:%s]" src
  | Logs.Info -> Fmt.fprintf out "[@{<cyan>info@}:%s]" src
  | Logs.Error -> Fmt.fprintf out "[@{<Red>error@}:%s]" src
  | Logs.Warning -> Fmt.fprintf out "[@{<yellow>warning@}:%s]" src
  | Logs.App -> Fmt.fprintf out "[@{<blue>app@}:%s]" src

let sync_reporter () =
  Fmt.set_color_default true;
  let app, app_flush = buf_fmt () in
  let dst, dst_flush = buf_fmt () in
  let pp_header fmt header =
    let now = Unix.gettimeofday() in
    Format.fprintf fmt "@[<2>[%a] %a@ "
      ISO8601.Permissive.pp_datetime now pp_h header
  in
  let report src level ~over k msgf =
    let k _ =
      begin match level with
        | Logs.App -> output_string stdout (app_flush ()); flush stdout
        | _ -> output_string stderr (dst_flush ()); flush stderr
      end;
      over ();
      k ()
    in
    msgf (fun ?header ?tags:_ fmt ->
      let ppf = if level = App then app else dst in
      Format.kfprintf k ppf ("%a@[" ^^ fmt ^^ "@]@.") pp_header (src, level, header))
  in
  { Logs.report = report }

let enable_debug () =
  Logs.set_level ~all:true (Some Logs.Debug);
  Logs.info (fun k->k"enable debug");
  ()

let setup_logs_sync ?(debug=false) () =
  Logs.set_reporter @@ sync_reporter ();
  if debug || (try bool_of_string(Sys.getenv "JYMANDRA_LOG") with _ -> false) then (
  enable_debug();
  );
  ()
