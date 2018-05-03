define(['nbextensions/nbimandra/carrotsearch.foamtree', 'nbextensions/nbimandra/styles'], function (ft, styles) {

    return {
        draw: function (id, detailsId, data) {
            console.log(data);
            var foamtree = new window.CarrotSearchFoamTree({id: id});
            foamtree.set(styles);
            foamtree.set({ dataObject: { groups: data.regions } });

            return foamtree;
        }
    };
});
