define(['jquery', 'nbextensions/nbimandra/carrotsearch.foamtree'], function ($) {

    function load_ipython_extension () {

        console.log('load_ipyt');

        //Add clear button for terminal
        if (window.terminal) {
            $('#terminado-container').css('position', 'relative');
            $('#terminado-container').prepend('<div><button id="terminado-clear" class="btn btn-primary">Clear terminal</button></div>');
            $('#terminado-clear').css('position', 'fixed').css('top', 100).css('right', 10).css('opacity', 0.5);
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
