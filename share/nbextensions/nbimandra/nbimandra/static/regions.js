define([
    'nbextensions/nbimandra/lib/carrotsearch.foamtree',
    'nbextensions/nbimandra/regions-styles'
], function (ft, styles) {

    return {
        draw: function (id, detailsId, data) {
            var foamtree = new ft({id: id});
            foamtree.set(styles);
            foamtree.set({ dataObject: { groups: data.regions } });

            return foamtree;
        }
    };
});
