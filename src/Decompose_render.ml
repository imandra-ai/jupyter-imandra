open Imandra_lib

module H = Tyxml.Html
module R = Evaluator.Res

type 'a html = ([> Html_types.div] as 'a) H.elt

let to_html (rs : R.t) (d: Top_result.decompose_region list) : _ html =
  Doc_render.alternatives
    [ ("Table"
      , (rs |> Top_result.to_doc |> Doc_render.to_html))
    ; ("Veroni"
       , H.div (d |> List.map (fun r -> H.div [])))
    ]
