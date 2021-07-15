define([
    'nbextensions/nbimandra-theme/theme',
], function (theme) {

    function load_ipython_extension () {
        theme.load();
    }

    return {
        load_ipython_extension: load_ipython_extension
    };
});
