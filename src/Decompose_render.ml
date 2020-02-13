open Imandra_surface
    (* TODO
open Imandra_tools.Region_pp.PPrinter
       *)

module H = Tyxml.Html
module D = Document
module J = Yojson.Basic

type 'a html = ([> Html_types.div] as 'a) H.elt

let pp_cs ?inv:_ (_cs:Term.t list) : string list =
  []
  (* TODO
  let nodes = pp ?inv cs in
  List.map (fun n ->
      CCFormat.to_string (Printer.print ()) n
      |> CCString.replace ~which:`All ~sub:"\n" ~by:" ")
    nodes
     *)

let terms_doc ?(pp_cs=pp_cs) regions =
  let open Top_result in
  let r_to_doc region =
    { Document.constraints = pp_cs region.reg_constraints;
      invariant = List.hd @@ pp_cs ~inv:true [region.reg_invariant] }
  in
  List.map r_to_doc regions

let regions_doc ?(pp_cs=pp_cs) regions =
  Document.regions (terms_doc ~pp_cs regions)

let to_html ?(pp_cs=pp_cs) (res : Top_result.t) (decompose_regions: Top_result.decompose_region list) : _ html =
  let regions = decompose_regions |> CCList.map (Doc_render.to_region ~pp_cs) in
  Doc_render.alternatives
    [("Voronoi" , Doc_render.regions_to_html regions)
    ; ("Table" , (res |> Top_result.to_doc |> Doc_render.to_html))
    ]
