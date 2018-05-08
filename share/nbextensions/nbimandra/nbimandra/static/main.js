define(['jquery', 'nbextensions/nbimandra/carrotsearch.foamtree'], function ($) {

    function load_ipython_extension () {

        console.log('load_ipyt');

        //Add clear button for terminal
        if (window.terminal) {
            $('#site').css('margin-top', 50);
            $('#terminado-container .terminal').css('position', 'relative');
            $('#terminado-container .terminal').prepend('<button id="terminado-clear" class="btn btn-primary">Clear terminal</button>');
            $('#terminado-clear').css('position', 'absolute').css('top', 10).css('right', 20).css('opacity', 0.5).css('z-index', 99);
            $('#terminado-clear').on('click', function () {
                window.terminal.term.clear();
                window.terminal.term.focus();
            });
        }

    }

    return {
        load_ipython_extension: load_ipython_extension
    };
});
