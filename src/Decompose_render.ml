open Imandra_surface
open Imandra_interactive
open Imandra_tools.Region_pp.PPrinter

module H = Tyxml.Html
module D = Imandra_document.Document
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
    { D.constraints = pp_cs (Modular_region.constraints region);
      invariant = List.hd @@ pp_cs ~inv:true [Modular_region.invariant region] }
  in
  List.map r_to_doc regions

let get_regions d =
  Modular_decomposition.to_region_list d
  |> CCList.filter_map
    (fun (i, _) ->
       try Some (Modular_decomp.get_region d i)
       with _ -> None)

let regions_doc ?(pp_cs=pp_cs) d =
  D.regions (terms_doc ~pp_cs (d |> get_regions))

let to_html ?(pp_cs=pp_cs) (res : Top_result.t) (d: Modular_decomposition.t) : _ html =
  let total = Modular_decomp.n_regions d in
  let capped = min total 256 in
  let regions = d |> get_regions |> CCList.take capped |> CCList.map (Doc_render.to_region ~pp_cs) in
  Doc_render.alternatives
    [((Printf.sprintf "Voronoi (%d of %d)" capped total), Doc_render.regions_to_html regions)
    ; ("Table" , (res |> Top_result.to_doc |> Doc_render.to_html))
    ]
