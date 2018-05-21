define([
    'jquery',
    'nbextensions/nbimandra/lib/viz-js/viz',
    'nbextensions/nbimandra/lib/viz-js/full.render',
    'svg-pan-zoom'
], function ($, Viz, VizRender, svgPanZoom) {

    function hydrate (target) {
        $(target + ' button').click(function () {
            $(target + ' button').hide();
            $(target + ' .imandra-graphviz-loading').removeClass('display-none');

            var dotSrc = $(target + ' textarea').val();
            var viz = new Viz(VizRender);

            return viz.renderSVGElement(dotSrc, {
                engine: 'dot',
                format: 'svg'
            }).then(function(svgElement) {
                $(target + ' .imandra-graphviz-target').append(svgElement);

                $(svgElement)
                    .css('height', '70vh')
                    .css('cursor', 'move');

                $(target + ' .imandra-graphviz-loading').addClass('display-none');

                svgPanZoom(svgElement, {
                    controlIconsEnabled: true,
                    maxZoom: 20
                });
            });
        });
    }

    return {
        hydrate: hydrate
    };
});
