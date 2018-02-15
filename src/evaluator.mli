
val init : unit -> unit

module Res : sig
  type t = Imandra_lib.Top_result.t
  val to_doc : t -> Imandra_lib.Document.t
end

val exec : string -> (string -> unit) -> Res.t list

val exec_lwt : string -> (string * Res.t list) Lwt.t
