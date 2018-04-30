
module C = Jupyter_kernel.Client
module H = Tyxml.Html
module D = Imandra_lib.Document

type 'a html = ([> Html_types.div] as 'a) H.elt

(* render the graph as SVG *)
let svg_of_graphiz (s:string) : string =
  Jupyter_kernel.Log.log "get svg for graph...\n";
  CCIO.File.with_temp ~prefix:"jymandra" ~suffix:"dot"
    (fun dot_file ->
       CCIO.with_out dot_file (fun oc -> output_string oc s);
       let p = CCUnix.call_full "dot '%s' -Tsvg " dot_file in
       let _ = p#errcode in
       let data = p#stdout in
       let data64 = Jupyter_kernel.Base64.encode data in
       Jupyter_kernel.Log.logf "got svg (%d bytes, %d after base64)\n"
         (String.length data) (String.length data64);
       "data:image/svg+xml;base64," ^ data64)

let fold_js elId = Printf.sprintf {|
        $('#%s.imandra-fold').find('.panel-heading').first().on('click', function (e) {
            e.preventDefault();
            $panelHeading = $(this);
            $fold = $panelHeading.closest('.imandra-fold');

            $panelBody = $fold.find('.panel-body').first();
            $panelBody.toggleClass('collapse');

            if ($panelBody.hasClass('collapse')) {
                $panelHeading.find('.fa-chevron-down').addClass('hidden');
                $panelHeading.find('.fa-chevron-right').removeClass('hidden');
            } else {
                $panelHeading.find('.fa-chevron-down').removeClass('hidden');
                $panelHeading.find('.fa-chevron-right').addClass('hidden');
            }
        });
|}  elId

let fold_css elId = Printf.sprintf {| .imandra-fold#%s .panel-heading i { min-width: 20px; } |} elId

let alternatives_js elId = Printf.sprintf {|
        $('#%s.imandra-alternatives').find('.nav').first().find('li').on('click', function (e) {
            e.preventDefault();
            $li = $(this);

            $alternatives = $li.closest('.imandra-alternatives');

            var selectedIdx;

            $alternatives.find('.nav').first().find('li').each(function (i, item) {
                if ($(item).is($li)) {
                    selectedIdx = i;
                }
            });

            $alternatives.find('.tab-content').first().find('.tab-pane').each(function (i, item) {
                var $item = $(item);
                $item.removeClass('active');
                if (i == selectedIdx) {
                    $item.addClass('active');
                }
            });
        });
|} elId

let alternatives_css elId = Printf.sprintf {|
.imandra-alternatives#%s a {
    text-decoration: none;
    font-weight: bold;
}

.imandra-alternatives#%s ul.nav-tabs {
    padding-left: 0;
}|} elId elId

let table_css elId = Printf.sprintf {|
.imandra-table#%s table td {
  text-align: left;
}|} elId

let alternatives (children : ( string * [< Html_types.div_content_fun ] H.elt ) list) : _ html =
  let id = "alt-" ^ (Uuidm.v `V4 |> Uuidm.to_string) in
  H.div ~a:[H.a_class ["imandra-alternatives"]; H.a_id id]
    [ H.script (H.pcdata (alternatives_js id))
    ; H.style [H.pcdata (alternatives_css id)]
    ; H.ul ~a:[H.a_class ["nav nav-tabs"]]
        (children |> List.mapi (fun i (name, _) ->
             let selected = if i = 0 then ["active"] else [] in
             H.li ~a:[H.a_class selected; H.a_user_data "toggle" "tab"]
               [H.a [H.pcdata name]]))

    ; H.div ~a:[H.a_class ["tab-content"]]
        (children |> List.mapi (fun i (_, sub) ->
          let selected = if i = 0 then ["active"] else [] in
          H.div ~a:[H.a_class (["tab-pane"] @ selected)] [sub]))
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
    | D.Section s -> mk_header ~a ~depth [H.pcdata s]
    | D.String s -> H.pcdata s
    | D.Text s -> H.pcdata s
    | D.Pre s -> H.pre ~a [H.pcdata s]
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
        mk_header ~a ~depth [H.pcdata s];
        aux ~depth sub;
      ]
    | D.Tbl {headers;rows} ->
      let thead = match headers with
        | None -> None
        | Some l ->
          let l = List.map (fun s -> H.th [H.pcdata s]) l in
          Some (H.thead [H.tr l])
      and rows =
        let depth=depth+1 in
        List.map
          (fun row -> H.tr (List.map (fun s -> H.td [aux ~depth s]) row))
          rows
      in
      let id = "table-" ^ (Uuidm.v `V4 |> Uuidm.to_string) in
      H.div ~a:[H.a_class ["imandra-table"]; H.a_id id]
        [ H.style [H.pcdata (table_css id)]
        ; H.table ~a:[] ?thead rows]

    | D.Graphviz s ->
      let svg_data = svg_of_graphiz s in
      H.img ~src:svg_data ~alt:"svg of graph" ()
    | D.Enum l ->
      H.ol ~a (List.map (fun sub -> H.li [aux ~depth sub]) l)
    | D.Bold d -> H.b ~a [H.pcdata @@ D.to_string d]
    | D.Italic d -> H.i ~a [H.pcdata @@ D.to_string d]
    | D.Url {url;txt} -> H.a ~a:[H.a_href url] [H.pcdata txt]
    | D.OCamldoc_ref _
    | D.OCamldoc_tag _ -> H.pcdata @@ D.to_string doc

    | D.Fold { folded_by_default; summary; sub } ->
      let body_class = if folded_by_default then ["collapse"] else [] in
      let down_icon_class = if folded_by_default then ["hidden"] else [] in
      let right_icon_class = if folded_by_default then [] else ["hidden"] in
      let id = "fold-" ^ (Uuidm.v `V4 |> Uuidm.to_string) in
      H.div ~a:[H.a_class ["imandra-fold panel panel-default"]; H.a_id id]
        [ H.script (H.pcdata (fold_js id))
        ; H.style [H.pcdata (fold_css id)]
        ; H.div ~a:[H.a_class ["panel-heading"]]
            [ H.div
                [ H.i ~a:[H.a_class (["fa fa-chevron-down"] @ down_icon_class)] []
                ; H.i ~a:[H.a_class (["fa fa-chevron-right"] @ right_icon_class)] []
                ; H.span [H.pcdata (if summary = "" then "Expand" else summary)]
                ]
            ]
        ; H.div ~a:[H.a_class (["panel-body"] @ body_class)] [aux ~depth sub]
        ]

    | D.Alternatives {views=vs; _} ->
      alternatives (vs |> List.map (fun (name, sub) ->
          (name, aux ~depth sub)))

    | _ ->
      (* protect against fast moving changes to {!Document.t} *)
      H.pcdata @@ D.to_string doc
  in
  H.div [aux ~depth:3 doc]

let mime_of_html (h:_ H.elt) : C.mime_data =
  let s = CCFormat.sprintf "%a@." (H.pp_elt ()) h in
  {C.mime_type="text/html"; mime_content=s; mime_b64=false}


let mime_of_txt (s:string) : C.mime_data =
  {C.mime_type="text/plain"; mime_content=s; mime_b64=false}
