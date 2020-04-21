open Imandra_surface
open Imandra_interactive
open Imandra_tools.Region_pp.PPrinter

module H = Tyxml.Html
module D = Document
module J = Yojson.Basic

type 'a html = ([> Html_types.div] as 'a) H.elt

let pp_cs ?inv cs =
  let nodes = pp ?inv cs in
  List.map (fun n ->
      CCFormat.to_string (Printer.print ()) n
      |> CCString.replace ~which:`All ~sub:"\n" ~by:" ")
    nodes

let terms_doc ?(pp_cs=pp_cs) regions =
  let r_to_doc region =
    { Document.constraints = pp_cs (Modular_region.constraints region);
      invariant = List.hd @@ pp_cs ~inv:true [Modular_region.invariant region] }
  in
  List.map r_to_doc regions

let regions_doc ?(pp_cs=pp_cs) regions =
  Document.regions (terms_doc ~pp_cs regions)

let get_regions d =
  Modular_decomposition.to_region_list d
  |> CCList.map (fun (i, _) -> Modular_decomp.get_region d i)

let to_html ?(pp_cs=pp_cs) (res : Top_result.t) (d: Modular_decomposition.t) : _ html =
  let regions = d |> get_regions |> CCList.map (Doc_render.to_region ~pp_cs) in
  Doc_render.alternatives
    [("Voronoi" , Doc_render.regions_to_html regions)
    ; ("Table" , (res |> Top_result.to_doc |> Doc_render.to_html))
    ]
