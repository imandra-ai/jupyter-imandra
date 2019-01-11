module C = Jupyter_kernel.Client
module H = Tyxml.Html
module D = Imandra_lib.Document

type 'a html = ([> Html_types.div] as 'a) H.elt

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

    | _ ->
      (* protect against fast moving changes to {!Document.t} *)
      H.txt @@ D.to_string doc
    [@@ocaml.warning "-11"]
  in
  H.div [aux ~depth:3 doc]

let success_result text =
  H.div ~a:[H.a_class ["imandra-vr"; "imandra-vr-proved"]] [
    H.i ~a:[H.a_class ["fa"; "fa-check-circle"]] [];
    H.span [H.txt text]
  ]

let fail_result text =
  H.div ~a:[H.a_class ["imandra-vr"; "imandra-vr-refuted"]] [
    H.i ~a:[H.a_class ["fa"; "fa-times-circle-o"]] [];
    H.span [H.txt text]
  ]

let unknown_result reason =
  H.div ~a:[H.a_class ["imandra-vr"; "imandra-vr-unknown"]] [
    H.i ~a:[H.a_class ["fa"; "fa-question-circle-o"]] [];
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
            Format.printf "callgraph: %S@." c;
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

let html_of_verify_result (vr : Imandra_lib.Top_result.verify_result) : [> Html_types.div] html =
  let open Imandra_lib.Top_result in
  Format.printf "html-of-verify-result %a@." pp_view (Verify vr);
  match vr with
  | V_proved {proof; callgraph; _} ->
    H.div [ success_result "Proved";
            proof_alternatives proof callgraph
          ]
  | V_refuted {proof; callgraph;_} ->
    H.div [ fail_result "Refuted";
            proof_attempt_alternatives callgraph proof
          ]
  | V_unknown {proof;callgraph;instances;reason} ->
    H.div [ unknown_result reason;
            proof_attempt_instances_alternatives instances callgraph proof
          ]

let html_of_instance_result (ir : Imandra_lib.Top_result.instance_result) : [> Html_types.div] html =
  let open Imandra_lib.Top_result in
  match ir with
  | I_sat {proof;callgraph;_} ->
    H.div [ success_result "Instance"
          ; proof_attempt_alternatives callgraph proof
          ]
  | (I_unsat {proof; callgraph; _}) ->
    H.div [ fail_result "Unsatisfiable"
          ; proof_alternatives proof callgraph
          ]
  | (I_unknown {proof;callgraph;instances;reason}) ->
    H.div [ unknown_result reason
          ; proof_attempt_instances_alternatives instances callgraph proof
          ]


let mime_of_html (h:_ H.elt) : C.mime_data =
  let s = CCFormat.sprintf "%a@." (H.pp_elt ()) h in
  {C.mime_type="text/html"; mime_content=s; mime_b64=false}


let mime_of_txt (s:string) : C.mime_data =
  {C.mime_type="text/plain"; mime_content=s; mime_b64=false}
