
val init : ?reason:bool -> unit -> unit

module Res : sig
  type t = Imandra_lib.Top_result.t
  val to_doc : t -> Imandra_lib.Document.t
end

val exec : count:int -> string -> (string -> unit) -> Res.t list

val exec_lwt : count:int -> string -> (string * Res.t list) Lwt.t
