open Imandra_lib

module H = Tyxml.Html
module R = Evaluator.Res

type 'a html = ([> Html_types.div] as 'a) H.elt

module J = Yojson.Basic

module StringMap = CCMap.Make(String)

type region =
  { r_constraints : string list
  ; r_invariant : string
  }

type region_group =
  { rg_constraints: string list
  ; rg_label_path : int list
  ; rg_region: region option
  ; rg_children : region_group list
  ; rg_weight: int
  }

let to_region (decompose_region : Top_result.decompose_region) : region =
  { r_constraints = CCList.map Term.to_string decompose_region.reg_constraints
  ; r_invariant = Term.to_string decompose_region.reg_invariant
  }

module StringSet = CCSet.Make(String)

let rec group_regions (idx_path : int list) (constraint_path: string list) (regions: region list) : region_group list =
  let open Top_result in
  let all_constraints_with_dup =
    regions
    |> CCList.flat_map (fun r -> r.r_constraints)
    |> CCList.filter (fun c1 -> not (CCList.exists (fun c2 -> c1 = c2) constraint_path) )
  in
  let constraints_by_most_frequent =
    all_constraints_with_dup
    |> CCList.fold_left (fun acc c ->
        StringMap.update c (function None -> Some 1 | Some i -> Some (i+1)) acc
      ) StringMap.empty
    |> StringMap.to_list
    |> CCList.sort (fun (_, count_a) (_, count_b) -> compare count_a count_b)
    |> CCList.rev
    |> CCList.map (fun (c, count) -> c)
  in
  let grouped =
    constraints_by_most_frequent
    |> CCList.fold_left (fun (groups, regions) konstraint ->
        let (has, without) = regions |> CCList.partition (fun r ->
            CCList.exists (fun c -> c = konstraint) r.r_constraints) in

        let i = CCList.length groups + 1 in
        let idx_path = i :: idx_path in
        let constraint_path = konstraint :: constraint_path in

        (if CCList.length has > 0 then
           ({ rg_constraints = (CCList.rev constraint_path)
            ; rg_region = if CCList.length has = 1 then Some (List.hd has) else None
            ; rg_children = group_regions idx_path (constraint_path) has
            ; rg_label_path = idx_path
            ; rg_weight = CCList.length has
            } :: groups
           , without)
         else
           groups
         , without)

      ) ([], regions)
  in
  grouped |> fst

let region_to_json (r : region) : J.json =
  `Assoc [ ("constraints", `List (CCList.map (fun c -> `String c) r.r_constraints))
         ; ("invariant", `String r.r_invariant)
         ]

let rec region_group_to_json (rg : region_group) : J.json =
  let label_path = (rg.rg_label_path |> CCList.rev |> CCList.map string_of_int |> CCString.concat ".") in
  let label = match rg.rg_region with Some r -> "R[" ^ label_path ^ "]" | None -> "(" ^ label_path ^ ")"in
  `Assoc [ ("constraints", `List (CCList.map (fun s -> `String s) rg.rg_constraints))
         ; ("region", match rg.rg_region with Some r -> region_to_json r | None -> `Null)
         ; ("groups", `List (CCList.map region_group_to_json rg.rg_children))
         ; ("label", `String label)
         ; ("weight", `Int rg.rg_weight)
         ]

let regions_to_json (decompose_regions: Top_result.decompose_region list) : J.json  =
  let region_groups = decompose_regions |> CCList.map to_region |> group_regions [] [] in
  `Assoc [("regions", `List (CCList.map region_group_to_json region_groups))]

let regions_js ft_id details_id regions = Printf.sprintf {|
(function () {
  require(['nbextensions/nbimandra/regions'], function (regions) {
    regions.draw('%s', '%s', %s);
  });
})();
|} ft_id details_id regions |> H.Unsafe.data

let to_html (res : R.t) (regions: Top_result.decompose_region list) : _ html =
  Doc_render.alternatives
    [("Voronoi"
     , (let uuid = (Uuidm.v `V4 |> Uuidm.to_string) in
        let ft_id = "decompose-foamtree-" ^ uuid  in
        let details_id = "decompose-details-" ^ uuid in
        H.div ~a:[H.a_style "display: flex; justify-content: space-between;"]
          [ H.div ~a:[H.a_id ft_id; H.a_style "width: 50%; height: 400px;"] []
          ; H.div ~a:[H.a_id details_id; H.a_style "width: 45%; height: 400px;"] []
          ; H.script (regions_to_json regions |> Yojson.Basic.pretty_to_string |> regions_js ft_id details_id)
          ]
       )
     )
    ; ("Table"
      , (res |> Top_result.to_doc |> Doc_render.to_html))
    ]
