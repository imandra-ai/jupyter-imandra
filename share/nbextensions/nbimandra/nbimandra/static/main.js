require.config({
    paths: {
        'svg-pan-zoom': '/nbextensions/nbimandra/lib/svg-pan-zoom'
    },
    shim: {
        'nbextensions/nbimandra/lib/carrotsearch.foamtree': {
            exports: 'CarrotSearchFoamTree'
        }
    }
});


define([
    'jquery',
    'base/js/utils'
], function ($, utils) {

    function load_ipython_extension () {
        var baseUrl = utils.get_body_data("baseUrl");
        $('head').append('<link rel="stylesheet" href="' + baseUrl + 'nbextensions/nbimandra/styles.css" type="text/css">');
    }

    return {
        load_ipython_extension: load_ipython_extension
    };
});
