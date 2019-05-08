open Imandra_surface

module H = Tyxml.Html
module D = Document
module J = Yojson.Basic

type 'a html = ([> Html_types.div] as 'a) H.elt

let regions_doc ?(pp_cs = (List.map Term.to_string)) regions =
  let open Top_result in
  let r_to_doc region = { Document.constraints = pp_cs region.reg_constraints;
                          invariant = List.hd @@ pp_cs [region.reg_invariant] }
  in
  Document.regions @@ List.map r_to_doc regions

let to_html ?(pp_cs = (List.map Term.to_string)) (res : Top_result.t) (decompose_regions: Top_result.decompose_region list) : _ html =
  let regions = decompose_regions |> CCList.map (Doc_render.to_region ~pp_cs) in
  Doc_render.alternatives
    [("Voronoi" , Doc_render.regions_to_html regions)
    ; ("Table" , (res |> Top_result.to_doc |> Doc_render.to_html))
    ]
