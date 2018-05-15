require.config({
    shim: {
        'nbextensions/nbimandra/lib/carrotsearch.foamtree': {
            exports: 'CarrotSearchFoamTree'
        },
        'nbextensions/nbimandra/lib/viz': {
            exports: 'Viz'
        }
    }
});


define([
    'jquery'
], function ($) {

    function load_ipython_extension () {
        $('head').append('<link rel="stylesheet" href="/nbextensions/nbimandra/styles.css" type="text/css">');
    }

    return {
        load_ipython_extension: load_ipython_extension
    };
});
