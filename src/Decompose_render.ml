open Imandra_lib

module H = Tyxml.Html
module R = Evaluator.Res

type 'a html = ([> Html_types.div] as 'a) H.elt

module LabelTree :
sig
  val label : 'a list list -> (string * 'a list) list
end = struct
  type 'a t =
    | Node of ('a , 'a t) Hashtbl.t
    | Leaf

  let emptyNode () = Node (Hashtbl.create 2)

  let update (dict : ('a , 'b) Hashtbl.t) (key : 'a) (f:'b option -> 'b) : unit =
    if Hashtbl.mem dict key then
      Some ( Hashtbl.find dict key) |> f |> Hashtbl.replace dict key
    else
      None |> f |> Hashtbl.add dict key

  let rec insert (tree :'a t) (cs : 'a list) : 'a t =
    match tree with
    | Leaf -> insert (emptyNode ()) cs
    | Node dict -> begin
      let () = match cs with
      | []      -> ()
      | c :: [] -> update dict c (function Some _ -> failwith "Path ending at an non-empty node" | None -> Leaf)
      | c :: cs -> update dict c (function Some n -> insert n cs | None -> insert (emptyNode ()) cs )
      in tree
    end

  let labeltree (tree:'a t) : (string * 'a list) list =
    let result = ref [] in
    let iteri f (dict : ('a,'b) Hashtbl.t) =
      Hashtbl.fold (fun k v i -> f i k v; i + 1) dict 1 |> ignore
      in
    let rec scan (clist,cname) (tree : 'a t) =
      match tree with
      | Node dict ->
        iteri (fun i k v -> scan (k::clist, i::cname) v ) dict
      | Leaf ->
        let name = cname |> List.rev_map (fun i -> string_of_int @@ i )
                         |> String.concat "." in
        result := (name,clist)::!result
      in
    scan ([],[]) tree;
    !result

  let label (cs : 'a list list) : (string * 'a list) list =
    cs |> List.fold_left insert Leaf |> labeltree
end

module J = Yojson.Basic

let regions_to_json (regions: Top_result.decompose_region list) : J.json  =
  let label_input =
    regions
    |> CCList.map (fun x ->
        let open Top_result in
        (x.reg_constraints |> CCList.map Term.to_string) @ [Term.to_string x.reg_invariant])
  in
  LabelTree.label label_input |> List.map ( fun (name, constraints) ->
    let invariant = List.hd constraints in
    let constraints = constraints
      |> List.tl
      |> List.map (fun c -> `String c)
      |> List.rev
    in
    `Assoc [ ("name"       , `String name      )
           ; ("constraints", `List constraints )
           ; ("invariant"  , `String invariant )
           ]
  ) |> fun regions -> `Assoc [("regions", `List regions)]

let regions_js id regions = Printf.sprintf {|
(function () {
  var data = %s;
  console.log(data);
  var foamtree = new window.CarrotSearchFoamTree({
    id: '%s',
    dataObject: {
      groups: _.map(data.regions, function (r) {

      });
    }
  });
  foamtree.set(window.foamTreeStyles);
})();
|} regions id |> H.Unsafe.data

let to_html (res : R.t) (regions: Top_result.decompose_region list) : _ html =
  Doc_render.alternatives
    [("Voronoi"
     , (let id = "foamtree-" ^ (Uuidm.v `V4 |> Uuidm.to_string) in
        H.div
          [ H.script (regions_to_json regions |> Yojson.Basic.pretty_to_string |> regions_js id)
          ; H.div ~a:[H.a_id id; H.a_style "width: 100%; min-width: 100%; height: 200px;"] []
          ]
       )      )
    ; ("Table"
      , (res |> Top_result.to_doc |> Doc_render.to_html))
    ]
