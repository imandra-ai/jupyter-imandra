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
  let r_constraints = CCList.map Term.to_string decompose_region.reg_constraints in
  { r_constraints = if r_constraints = [] then ["true"] else r_constraints
  ; r_invariant = Term.to_string decompose_region.reg_invariant
  }

module StringSet = CCSet.Make(String)

let rec group_regions (idx_path : int list) (constraint_path: string list) (regions: region list) : region_group list =
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
    |> CCList.map (fun (c, _) -> c)
  in
  let grouped =
    constraints_by_most_frequent
    |> CCList.fold_left (fun (groups, regions) konstraint ->
        let (has, without) = regions |> CCList.partition (fun r ->
            CCList.exists (fun c -> c = konstraint) r.r_constraints) in

        let i = CCList.length groups + 1 in
        let idx_path = i :: idx_path in
        let constraint_path = konstraint :: constraint_path in

        if CCList.length has > 0 then
          let rg_children = group_regions idx_path (constraint_path) has in
          let group =
            match rg_children with
            | [child] -> child (* collapse groups with a single child. *)
            | _ ->
              { rg_constraints = (CCList.rev constraint_path)
              ; rg_region = if CCList.length has = 1 then Some (List.hd has) else None
              ; rg_children
              ; rg_label_path = idx_path
              ; rg_weight = CCList.length has
              }
          in
          (group :: groups, without)
        else
          (groups, without)

      ) ([], regions)
  in
  grouped |> fst

let region_to_json (r : region) : J.json =
  `Assoc [ ("constraints", `List (CCList.map (fun c -> `String c) r.r_constraints))
         ; ("invariant", `String r.r_invariant)
         ]

let rec region_group_to_json (rg : region_group) : J.json =
  let label_path = (rg.rg_label_path |> CCList.rev |> CCList.map string_of_int |> CCString.concat ".") in
  let label = match rg.rg_region with Some _ -> "R[" ^ label_path ^ "]" | None -> "(" ^ label_path ^ ")"in
  `Assoc [ ("constraints", `List (CCList.map (fun s -> `String s) rg.rg_constraints))
         ; ("region", match rg.rg_region with Some r -> region_to_json r | None -> `Null)
         ; ("groups", `List (CCList.map region_group_to_json rg.rg_children))
         ; ("label", `String label)
         ; ("weight", `Int rg.rg_weight)
         ]

let regions_to_json (decompose_regions: Top_result.decompose_region list) : J.json  =
  let region_groups = decompose_regions |> CCList.map to_region |> group_regions [] [] in
  `Assoc [("regions", `List (CCList.map region_group_to_json region_groups))]

let regions_js ft_id = Printf.sprintf {|
(function () {
  require(['nbextensions/nbimandra/regions'], function (regions) {
    var target = '#%s';
    regions.hydrate(target);
  });
})();
|} ft_id

let to_html (res : R.t) (regions: Top_result.decompose_region list) : _ html =
  Doc_render.alternatives
    [("Voronoi"
     , (let uuid = (Uuidm.v `V4 |> Uuidm.to_string) in
        let id = "decompose-" ^ uuid in
        H.div ~a:[H.a_id id; H.a_class ["decompose"]]
          [ H.textarea ~a:[H.a_class ["display-none"]] (H.txt (regions_to_json regions |> Yojson.Basic.pretty_to_string))
          ; H.div ~a:[H.a_class ["decompose-foamtree"]] []
          ; H.div ~a:[H.a_class ["decompose-details"]]
              [ H.div ~a:[H.a_class ["decompose-details-header"]]
                  [H.txt "Regions details"]

              ; H.div ~a:[H.a_class ["decompose-details-no-selection"]] [
                  H.txt "No group selected."
                ]

              ; H.div ~a:[H.a_class ["decompose-details-selection hidden"]]
                  [ H.div ~a:[] [ H.span ~a:[H.a_class ["decompose-details-label"]] [H.txt "Direct sub-regions: "]
                                ; H.span ~a:[H.a_class ["decompose-details-direct-sub-regions-text"]] [H.txt "-"]
                                ]
                  ; H.div ~a:[] [H.span ~a:[H.a_class ["decompose-details-label"]] [H.txt "Contained regions: "]
                                ; H.span ~a:[H.a_class ["decompose-details-contained-regions-text"]] [H.txt "-"]
                                ]
                  ; H.div ~a:[H.a_class ["decompose-details-section-header"]] [H.txt "Constraints"]
                  ; H.div ~a:[H.a_class ["decompose-details-constraints"]]
                       [ H.pre ~a:[H.a_class ["decompose-details-constraint"]] [H.txt "<constraint>"]
                       ]
                  ; H.div ~a:[H.a_class ["decompose-details-invariant"]]
                       [ H.div ~a:[H.a_class ["decompose-details-section-header"]] [H.txt "Invariant"]
                       ; H.pre ~a:[H.a_class ["decompose-details-invariant-text"]] [H.txt "<invariant>"]
                       ]

                  ]]
          ; H.script (H.Unsafe.data (regions_js id))
          ]
       )
     )
    ; ("Table"
      , (res |> Top_result.to_doc |> Doc_render.to_html))
    ]
