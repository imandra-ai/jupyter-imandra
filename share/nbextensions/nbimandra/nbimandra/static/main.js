define([], function () {

    function load_ipython_extension () {
        require(['nbextensions/nbimandra/carrotsearch.foamtree']);
    }

    return {
        load_ipython_extension: load_ipython_extension
    };
});
