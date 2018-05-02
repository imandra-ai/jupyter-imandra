define(['nbextensions/nbimandra/carrotsearch.foamtree', 'nbextensions/nbimandra/styles'], function (_, styles) {

    return {
        draw: function (id, data) {
            console.log(data);
            var foamtree = new window.CarrotSearchFoamTree({
                id: id,
                dataObject: {
                    groups: data.regions
                }
            });
            foamtree.set(styles);
        }
    };
});
