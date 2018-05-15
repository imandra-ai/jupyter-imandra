define([
    'jquery',
    'nbextensions/nbimandra/lib/viz'
], function ($, Viz) {

    function renderFromDot (target, dotSrc) {

        console.log(dotSrc);

        var result = Viz(dotSrc, {
            engine: 'dot',
            format: 'svg'
        });


        $(target + ' .imandra-graphviz-target').html(result);
    }

    function hydrate (target) {
        $(target + ' button').click(function () {
            $(target + ' button').hide();
            $(target + ' .imandra-graphviz-loading').removeClass('display-none');
            require(['nbextensions/nbimandra/graph'], function () {
                var src = $(target + ' textarea').val();
                renderFromDot(target, src);
                $(target + ' .imandra-graphviz-loading').addClass('display-none');
            });
        });
    }

    return {
        hydrate: hydrate
    };
});
