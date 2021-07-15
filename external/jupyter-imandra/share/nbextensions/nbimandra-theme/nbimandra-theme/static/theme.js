define(['jquery', 'tree/js/terminallist', 'base/js/utils', 'base/js/events', 'base/js/namespace'], function ($, terminallist, utils, events, Jupyter) {

    // This is horrible but jupyter's built in JS does it anyway for modals, and
    // the CSS solutions all break one browser or another
    function fudgeScrollbarPadding() {
        if ($('#notebook-container').length > 0) {
            function fixPadding () {
                var containerX = $('#notebook-container')[0].getBoundingClientRect().left;
                var menuX = $('#menubar')[0].getBoundingClientRect().left;

                var paddingStr = $('#site')[0].style.paddingLeft;
                var padding = 0;
                if (paddingStr.match(/px$/)) {
                    padding = parseInt(paddingStr, 10);
                }

                var delta = menuX - containerX;
                $('#site')[0].style.paddingLeft = (padding + 2 * delta) + "px";
            }
            fixPadding();
            setTimeout(function () {
                fixPadding();
            }, 100);
        }
    }

    function addTryTerminalButtonToTreeView () {
        if ($('#notebooks').length) {
            $('#notebook_list').before(
                '<a class="try-imandra-console">' +
                    '<i class="fa fa-terminal"></i>' +
                    '<div class="try-imandra-console__text">Try Imandra in the terminal</div>' +
                    '</a>'
            );

            $('#ipython-main-app').on('click', '.try-imandra-console', function (e) {
                e.preventDefault();
                var tl = new terminallist.TerminalList(null, {
                    base_url: utils.get_body_data("baseUrl")
                });
                tl.new_terminal();
            });
        }
    }

    function addTerminalClearButton () {
        // Add clear button for terminal
        if (window.terminal) {
            $('#terminado-container .terminal').prepend(
                '<button id="terminado-clear" class="btn btn-primary">Clear terminal</button>'
            );
            $('#terminado-clear').on('click', function () {
                window.terminal.term.clear();
                window.terminal.term.focus();
            });
        }
    }


    return {
        load: function () {
            events.on('set_dirty.Notebook', function (e) { fudgeScrollbarPadding(); });
            events.on('create.Cell', function (e) { fudgeScrollbarPadding(); });
            events.on('delete.Cell', function (e) { fudgeScrollbarPadding(); });
            $('#site').on('scroll', function (e) { fudgeScrollbarPadding(); });
            $(window).on('resize', function (e) { fudgeScrollbarPadding(); });

            fudgeScrollbarPadding();
            addTryTerminalButtonToTreeView();
            addTerminalClearButton();
        }
    };
});
