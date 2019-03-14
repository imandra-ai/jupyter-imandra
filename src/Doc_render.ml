open Imandra_client_lib

module H = Tyxml.Html
module D = Document
module J = Yojson.Basic

type 'a html = ([> Html_types.div] as 'a) H.elt

module StringMap = CCMap.Make(String)

type region_group =
  { rg_constraints: string list
  ; rg_label_path : int list
  ; rg_region: D.region option
  ; rg_children : region_group list
  ; rg_weight: int
  }

let to_region ~pp_cs (decompose_region : Top_result.decompose_region) : D.region =
  let constraints = pp_cs decompose_region.reg_constraints in
  let invariant = String.concat "\n" @@ pp_cs [decompose_region.reg_invariant] in
  { constraints = if constraints = [] then ["true"] else constraints
  ; invariant
  }

let regions_js ft_id = Printf.sprintf {|
(function () {
  require(['nbextensions/nbimandra/regions'], function (regions) {
    var target = '#%s';
    regions.hydrate(target);
  });
})();
|} ft_id

let fold_js elId = Printf.sprintf {|
require(['nbextensions/nbimandra/fold'], function (fold) {
  var target = '#%s';
  fold.hydrate(target);
});
|}  elId

let alternatives_js elId = Printf.sprintf {|
require(['nbextensions/nbimandra/alternatives'], function (alternatives) {
  var target = '#%s';
  alternatives.hydrate(target);
});
|} elId

let graphviz_js elId = Printf.sprintf {|
require(['nbextensions/nbimandra/graphviz'], function (graphviz) {
  var target = '#%s';
  graphviz.hydrate(target);
});
|} elId

let alternatives (children : (string * [< Html_types.div_content_fun] H.elt) list) : _ html =
  let id = "alt-" ^ (Uuidm.v `V4 |> Uuidm.to_string) in
  H.div ~a:[H.a_class ["imandra-alternatives"]; H.a_id id]
    [ H.ul ~a:[H.a_class ["nav nav-tabs"]]
        (children |> List.mapi (fun i (name, _) ->
             let selected = if i = 0 then ["active"] else [] in
             H.li ~a:[H.a_class selected; H.a_user_data "toggle" "tab"]
               [H.a [H.txt name]]));
      H.div ~a:[H.a_class ["tab-content"]]
        (children |> List.mapi (fun i (_, sub) ->
          let selected = if i = 0 then ["active"] else [] in
          H.div ~a:[H.a_class (["tab-pane"] @ selected)] [sub]));
      H.script (H.Unsafe.data (alternatives_js id))
    ]

let rec group_regions (idx_path : int list) (constraint_path: string list) (regions: D.region list) : region_group list =
  let all_constraints_with_dup =
    regions
    |> CCList.flat_map (fun (r : D.region) -> r.constraints)
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
        let (has, without) = regions |> CCList.partition (fun (r : D.region) ->
            CCList.exists (fun c -> c = konstraint) r.constraints) in

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

let region_to_json (r : D.region) : J.json =
  `Assoc [ ("constraints", `List (CCList.map (fun c -> `String c) r.constraints))
         ; ("invariant", `String r.invariant)
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

let regions_to_json regions : J.json  =
  let region_groups = group_regions [] [] regions in
  `Assoc [("regions", `List (CCList.map region_group_to_json region_groups))]

let regions_to_html (regions : D.region list) =
  let uuid = Uuidm.v `V4 |> Uuidm.to_string in
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

(* display a document as HTML *)
let to_html (doc:D.t) : [> Html_types.div] html =
  let mk_header ?a ~depth l : _ html = match depth with
    | 1 -> H.h1 ?a l
    | 2 -> H.h2 ?a l
    | 3 -> H.h3 ?a l
    | 4 -> H.h4 ?a l
    | 5 -> H.h5 ?a l
    | n when n>=6 -> H.h6 ?a l
    | _ -> assert false
  in
  let rec aux ~depth (doc:D.t) : _ html =
    (* obtain HTML attributes *)
    let a =
      CCList.filter_map
        (function
          | D.A_color s -> Some (H.a_style ("color:"^s))
          | D.A_class s -> Some (H.a_class [s])
          | D.A_custom _ -> None)
        (D.attrs doc)
    in
    aux_content ~a ~depth doc
  and aux_content ~a ~depth doc : _ html=
    match D.view doc with
    | D.Section s -> mk_header ~a ~depth [H.txt s]
    | D.String s -> H.txt s
    | D.Text s -> H.txt s
    | D.Pre s -> H.pre ~a [H.txt s]
    | D.List {l;_} ->
      H.ul ~a (List.map (fun sub -> H.li [aux ~depth sub]) l)
    | D.Block l ->
      H.div ~a (List.map (aux ~depth) l)
    | D.V_block l ->
      (* insert paragraphs for skipping lines *)
      H.div ~a (CCList.flat_map (fun d -> [aux ~depth d; H.p []]) l)
    | D.Indented (s,sub) ->
      let depth = depth+1 in
      H.div ~a [
        mk_header ~a ~depth [H.txt s];
        aux ~depth sub;
      ]
    | D.Tbl {headers;rows} ->
      let thead = match headers with
        | None -> None
        | Some l ->
          let l = List.map (fun s -> H.th [H.txt s]) l in
          Some (H.thead [H.tr l])
      and rows =
        let depth=depth+1 in
        List.map
          (fun row -> H.tr (List.map (fun s -> H.td [aux ~depth s]) row))
          rows
      in
      let id = "table-" ^ (Uuidm.v `V4 |> Uuidm.to_string) in
      H.div ~a:[H.a_class ["imandra-table"]; H.a_id id]
        [ H.table ~a:[] ?thead rows]

    | D.Graphviz s ->
      let id = "graphviz-" ^ (Uuidm.v `V4 |> Uuidm.to_string) in
      H.div ~a:[H.a_class ["imandra-graphviz"]; H.a_id id]
        [ H.textarea ~a:[H.a_style "display: none"] (H.txt s)
        ; H.button ~a:[H.a_class ["btn"; "btn-primary"]] [(H.txt "Load graph")]
        ; H.div ~a:[H.a_class ["imandra-graphviz-loading"; "display-none"]] [(H.txt "Loading..")]
        ; H.div ~a:[H.a_class ["imandra-graphviz-target"]] []
        ; H.script (H.Unsafe.data (graphviz_js id))
        ]
    | D.Enum l ->
      H.ol ~a (List.map (fun sub -> H.li [aux ~depth sub]) l)
    | D.Bold d -> H.b ~a [H.txt @@ D.to_string d]
    | D.Italic d -> H.i ~a [H.txt @@ D.to_string d]
    | D.Url {url;txt} -> H.a ~a:[H.a_href url] [H.txt txt]
    | D.OCamldoc_ref _
    | D.OCamldoc_tag _ -> H.txt @@ D.to_string doc

    | D.Fold { folded_by_default; summary; sub } ->
      let body_class = if folded_by_default then ["collapse"] else [] in
      let down_icon_class = if folded_by_default then ["hidden"] else [] in
      let right_icon_class = if folded_by_default then [] else ["hidden"] in
      let id = "fold-" ^ (Uuidm.v `V4 |> Uuidm.to_string) in
      H.div ~a:[H.a_class ["imandra-fold panel panel-default"]; H.a_id id]
        [ H.div ~a:[H.a_class ["panel-heading"]]
            [ H.div
                [ H.i ~a:[H.a_class (["fa fa-chevron-down"] @ down_icon_class)] []
                ; H.i ~a:[H.a_class (["fa fa-chevron-right"] @ right_icon_class)] []
                ; H.span [H.txt (if summary = "" then "Expand" else summary)]
                ]
            ]
        ; H.div ~a:[H.a_class (["panel-body"] @ body_class)] [aux ~depth sub]
        ; H.script (H.Unsafe.data (fold_js id))
        ]

    | D.Alternatives {views=vs; _} ->
      alternatives (vs |> List.map (fun (name, sub) ->
          (name, aux ~depth sub)))

    | D.Regions rs ->
       regions_to_html rs

    | _ ->
      (* protect against fast moving changes to {!Document.t} *)
      H.txt @@ D.to_string doc
    [@@ocaml.warning "-11"]
  in
  H.div [aux ~depth:3 doc]

module Styles = struct
  let proved_color = "green"
  let refuted_color = "#D84315"
  let unknown_color = "#337ab7"

  let imandra_vr =
    ["font-size: 1.2em"; "padding: 0.5em"]

  let imandra_vr_proved =
    ["border-top: 1px solid " ^ proved_color; "border-bottom: 1px solid " ^ proved_color]

  let imandra_vr_refuted =
    ["border-top: 1px dashed " ^ refuted_color; "border-bottom: 1px dashed " ^ refuted_color]

  let imandra_vr_unknown =
    ["border-top: 1px dashed " ^ unknown_color; "border-bottom: 1px dashed " ^ unknown_color]

  let imandra_vr_i color =
    ["margin-right: 0.5em"; "color: " ^ color]

  let imandra_vr_text =
    ["display: inline-block"; "margin-left: 0.5em"; "font-family: 'Merriweather Sans', sans-serif"; "font-weight: bold"]

end

let success_result text =
  H.div ~a:[H.a_style (CCString.concat "; " (Styles.imandra_vr @ Styles.imandra_vr_proved))] [
    H.i ~a:[H.a_class ["fa"; "fa-check-circle"]; H.a_style (CCString.concat "; " (Styles.imandra_vr_i Styles.proved_color))] [];
    H.span [H.txt text]
  ]

let fail_result text =
  H.div ~a:[H.a_style (CCString.concat "; " (Styles.imandra_vr @ Styles.imandra_vr_refuted))] [
    H.i ~a:[H.a_class ["fa"; "fa-times-circle-o"]; H.a_style (CCString.concat "; " (Styles.imandra_vr_i Styles.refuted_color))] [];
    H.span [H.txt text]
  ]

let unknown_result reason =
  H.div ~a:[H.a_style (CCString.concat "; " (Styles.imandra_vr @ Styles.imandra_vr_unknown))] [
    H.i ~a:[H.a_class ["fa"; "fa-question-circle-o"]; H.a_style (CCString.concat "; " (Styles.imandra_vr_i Styles.unknown_color))] [];
    H.span [H.txt (Printf.sprintf "Unknown (%s)" reason)]
  ]

let proof_alternatives proof callgraph =
  to_html
     (D.alternatives @@ List.flatten
        [(match proof with
          | None -> []
          | Some proof ->
            ["proof", D.block ~a:[D.A.cls "imandra-proof-top"] [proof]]);
         (match callgraph with
          | None -> []
          | Some (lazy c) ->
            ["call graph", D.graphviz @@ c]);
        ])

let proof_attempt_alternatives callgraph proof =
  to_html
     (D.alternatives @@ List.flatten
        [(match callgraph with
          | None -> []
          | Some callgraph ->
            [ "call graph", D.graphviz @@ Lazy.force callgraph]);
         (match proof with
          | None -> []
          | Some proof ->
            ["proof", D.block ~a:[D.A.cls "imandra-proof-top"] [proof]])
        ])

let proof_attempt_instances_alternatives instances callgraph proof =
  to_html
     (D.alternatives @@ List.flatten
        [(match instances with
          | None -> []
          | Some instances ->
            [ "instances", D.fold ~folded_by_default:true @@ instances]);
         (match callgraph with
          | None -> []
          | Some callgraph ->
            ["call graph", D.graphviz @@ Lazy.force callgraph]);
         (match proof with
          | None -> []
          | Some proof ->
           ["proof", D.block ~a:[D.A.cls "imandra-proof-top"] [proof]])
        ])

let p_upto fmt = function
  | Imandra_client_lib.Event.Upto_bound b -> Format.fprintf fmt "up to bound %i" b
  | Upto_steps s -> Format.fprintf fmt "up to steps %i" s

let html_of_verify_result (vr : Imandra_client_lib.Top_result.verify_result) : [> Html_types.div] html =
  let open Imandra_client_lib.Top_result in
  match vr with
  | V_proved {proof; callgraph; _} ->
    H.div [ success_result "Proved";
            proof_alternatives proof callgraph
          ]
  | V_proved_upto {callgraph; upto} ->
     H.div [ success_result (Format.asprintf "Proved %a" p_upto upto);
            proof_alternatives None callgraph
          ]
  | V_refuted {proof; callgraph;_} ->
    H.div [ fail_result "Refuted";
            proof_attempt_alternatives callgraph proof
          ]
  | V_unknown {proof;callgraph;instances;reason} ->
    H.div [ unknown_result reason;
            proof_attempt_instances_alternatives instances callgraph proof
          ]

let html_of_instance_result (ir : Imandra_client_lib.Top_result.instance_result) : [> Html_types.div] html =
  let open Imandra_client_lib.Top_result in
  match ir with
  | I_sat {proof;callgraph;_} ->
    H.div [ success_result "Instance"
          ; proof_attempt_alternatives callgraph proof
          ]
  | (I_unsat {proof; callgraph; _}) ->
    H.div [ fail_result "Unsatisfiable"
          ; proof_alternatives proof callgraph
          ]
  | (I_unsat_upto {callgraph; upto}) ->
    H.div [ fail_result (Format.asprintf "Unsatisfiable %a" p_upto upto)
          ; proof_alternatives None callgraph
          ]
  | (I_unknown {proof;callgraph;instances;reason}) ->
    H.div [ unknown_result reason
          ; proof_attempt_instances_alternatives instances callgraph proof
          ]
