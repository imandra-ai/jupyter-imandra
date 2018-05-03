define(['jquery', 'nbextensions/nbimandra/carrotsearch.foamtree'], function ($) {

    function load_ipython_extension () {

        console.log('load_ipyt');

        //Add clear button for terminal
        if (window.terminal) {
            $('#terminado-container').prepend('<div><button id="terminado-clear" class="btn btn-primary" style="margin-bottom: 1em;">Clear terminal</button></div>');
            $('#terminado-container').on('click', '#terminado-clear', function () {
                window.terminal.term.clear();
                window.terminal.term.focus();
            });
        }

    }

    return {
        load_ipython_extension: load_ipython_extension
    };
});
