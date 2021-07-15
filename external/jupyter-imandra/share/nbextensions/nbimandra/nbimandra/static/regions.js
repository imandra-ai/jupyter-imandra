define([
    'nbextensions/nbimandra/lib/carrotsearch.foamtree',
    'nbextensions/nbimandra/regions-styles'
], function (ft, styles) {

    function hydrate (target) {
        var detailsSelector = target + ' .decompose-details';

        var dataStr = $(target + ' textarea').val();

        var data = JSON.parse(dataStr);

        var el = $(target + ' .decompose-foamtree')[0];
        var foamtree = new ft({element: el});

        foamtree.set(styles);
        foamtree.set({ dataObject: { groups: data.regions } });

        foamtree.set({ onGroupSelectionChanged: function (info) {

            if (!info.groups.length) {
                $(detailsSelector + ' .decompose-details-selection').addClass('hidden');
                $(detailsSelector + ' .decompose-details-no-selection').removeClass('hidden');

            } else {
                $(detailsSelector + ' .decompose-details-no-selection').addClass('hidden');
                $(detailsSelector + ' .decompose-details-selection').removeClass('hidden');

                var g = info.groups[0];

                var constraints = g.constraints.map(function (c) {
                    return '<pre class="decompose-details-constraint">' + c + '</pre>';
                });

                $(detailsSelector + ' .decompose-details-constraints').html(constraints.join('\n'));
                $(detailsSelector + ' .decompose-details-direct-sub-regions-text').html(g.groups.length);
                $(detailsSelector + ' .decompose-details-contained-regions-text').html(g.weight);

                if (!g.region) {
                    $(detailsSelector + ' .decompose-details-invariant').addClass('hidden');
                } else {
                    $(detailsSelector + ' .decompose-details-invariant').removeClass('hidden');
                    $(detailsSelector + ' .decompose-details-invariant-text').html(g.region.invariant);
                }
            }
        }});
    }

    return {
        hydrate: hydrate
    };
});
