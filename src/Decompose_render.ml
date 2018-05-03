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
  require(['nbextensions/nbimandra/regions', 'underscore'], function (regions, _) {
    var foamtreeId = '%s';
    var detailsId = '%s';
    var ft = regions.draw(foamtreeId, detailsId, %s);

    ft.set({ onGroupSelectionChanged: function (info) {

    if (!info.groups.length) {
        $('#' + detailsId + ' .decompose-details-selection').addClass('hidden');
        $('#' + detailsId + ' .decompose-details-no-selection').removeClass('hidden');

    } else {
        $('#' + detailsId + ' .decompose-details-no-selection').addClass('hidden');
        $('#' + detailsId + ' .decompose-details-selection').removeClass('hidden');

        var g = info.groups[0];
        console.log(info);
        console.log(g);

        var constraints = _.map(g.constraints, function (c) {
            return '<pre class="decompose-details-constraint">' + c + '</pre>';
        });

        $('#' + detailsId + ' .decompose-details-constraints').html(constraints.join('\n'));
        $('#' + detailsId + ' .decompose-details-direct-sub-regions-text').html(g.groups.length);
        $('#' + detailsId + ' .decompose-details-contained-regions-text').html(g.weight);

        if (!g.region) {
            $('#' + detailsId + ' .decompose-details-invariant').addClass('hidden');
        } else {
            $('#' + detailsId + ' .decompose-details-invariant').removeClass('hidden');
            $('#' + detailsId + ' .decompose-details-invariant-text').html(g.region.invariant);
        }
    }
    }});
  });
})();
|} ft_id details_id regions |> H.Unsafe.data

let decompose_css (main_id : string) : string = Printf.sprintf {|
.decompose#%s {
    display: flex;
    justify-content: space-between;
}
.decompose#%s .decompose-foamtree {
    width: 50%%;
    height: 400px;
}
.decompose#%s .decompose-details {
    width: 50%%;
    height: 400px;
    overflow-y: scroll;
    padding: 10px;
}
.decompose#%s .decompose-details-header {
    font-weight: bold;
    font-size: 1.4em;
    margin: 0 0 0.5em 0;
}
.decompose#%s .decompose-details-section-header {
    font-weight: bold;
    font-size: 1.2em;
    margin: 1em 0 0.5em 0;
}
.decompose#%s .decompose-details-constraint {
    font-size: 0.8em;
    border-bottom: 1px black dotted;
}
.decompose#%s .decompose-details-invariant-text {
    font-size: 0.8em;
    font-weight: bold;
    border: 1px black solid;
    padding: 1em;
}
|} main_id main_id main_id main_id main_id main_id main_id

let to_html (res : R.t) (regions: Top_result.decompose_region list) : _ html =
  Doc_render.alternatives
    [("Voronoi"
     , (let uuid = (Uuidm.v `V4 |> Uuidm.to_string) in
        let main_id = "decompose-" ^ uuid in
        let ft_id = "decompose-foamtree-" ^ uuid  in
        let details_id = "decompose-details-" ^ uuid in
        H.div ~a:[H.a_id main_id; H.a_class ["decompose"]]
          [ H.style [H.Unsafe.data (decompose_css main_id)]
          ; H.div ~a:[H.a_id ft_id; H.a_class ["decompose-foamtree"]] []
          ; H.div ~a:[H.a_id details_id; H.a_class ["decompose-details"]]
              [ H.div ~a:[H.a_class ["decompose-details-header"]]
                  [H.pcdata "Regions details"]

              ; H.div ~a:[H.a_class ["decompose-details-no-selection"]] [
                  H.pcdata "No group selected."
                ]

              ; H.div ~a:[H.a_class ["decompose-details-selection hidden"]]
                  [ H.div ~a:[] [ H.span ~a:[H.a_class ["decompose-details-label"]] [H.pcdata "Direct sub-regions: "]
                                 ; H.span ~a:[H.a_class ["decompose-details-direct-sub-regions-text"]] [H.pcdata "3"]
                                 ]
                  ; H.div ~a:[] [H.span ~a:[H.a_class ["decompose-details-label"]] [H.pcdata "Contained regions: "]
                                ; H.span ~a:[H.a_class ["decompose-details-contained-regions-text"]] [H.pcdata "3"]
                                ]
                  ; H.div ~a:[H.a_class ["decompose-details-section-header"]] [H.pcdata "Constraints"]
                  ; H.div ~a:[H.a_class ["decompose-details-constraints"]]
                       [ H.pre ~a:[H.a_class ["decompose-details-constraint"]] [H.pcdata "not (alphabetty spaghetti)"]
                       ; H.pre ~a:[H.a_class ["decompose-details-constraint"]] [H.pcdata "not (alphabetty spaghetti)"]
                       ; H.pre ~a:[H.a_class ["decompose-details-constraint"]] [H.pcdata "not (alphabetty spaghetti)"]
                       ; H.pre ~a:[H.a_class ["decompose-details-constraint"]] [H.pcdata "not (alphabetty spaghetti)"]
                       ; H.pre ~a:[H.a_class ["decompose-details-constraint"]] [H.pcdata "not (alphabetty spaghetti)"]
                       ]
                  ; H.div ~a:[H.a_class ["decompose-details-invariant"]]
                       [ H.div ~a:[H.a_class ["decompose-details-section-header"]] [H.pcdata "Invariant"]
                       ; H.pre ~a:[H.a_class ["decompose-details-invariant-text"]] [H.pcdata "F = alphabetty spaghetti"]
                       ]

                  ]]
          ; H.script (regions_to_json regions |> Yojson.Basic.pretty_to_string |> regions_js ft_id details_id)
          ]
       )
     )
    ; ("Table"
      , (res |> Top_result.to_doc |> Doc_render.to_html))
    ]
