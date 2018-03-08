
module C = Jupyter_kernel.Client
module H = Tyxml.Html
module D = Imandra_lib.Document

type 'a html = ([<Html_types.div] as 'a) H.elt

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

(* display a document as HTML *)
let to_html (doc:D.t) : _ html =
  let mk_header ?a ~depth l = match depth with
    | 1 -> H.h1 ?a l
    | 2 -> H.h2 ?a l
    | 3 -> H.h3 ?a l
    | 4 -> H.h4 ?a l
    | 5 -> H.h5 ?a l
    | n when n>=6 -> H.h6 ?a l
    | _ -> assert false
  in
  let rec aux ~depth (doc:D.t) =
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
  and aux_content ~a ~depth doc =
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
      let a = H.a_style "border:1px" :: a in
      H.table ~a ?thead rows
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
