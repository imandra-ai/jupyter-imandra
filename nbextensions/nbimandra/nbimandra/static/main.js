define([], function () {

    function handleAlternatives () {
        $(document).on('click', '.imandra-alternatives .nav li', function (e) {
            e.preventDefault();
            $li = $(this);

            $alternatives = $li.closest('.imandra-alternatives');

            var selectedIdx;

            $alternatives.find('.nav li').each(function (i, item) {
                if ($(item).is($li)) {
                    selectedIdx = i;
                }
            });

            $alternatives.find('.tab-pane').each(function (i, item) {
                var $item = $(item);
                $item.removeClass('active');
                if (i == selectedIdx) {
                    $item.addClass('active');
                }
            });
        });
    }

    function handleFold () {
        $(document).on('click', '.imandra-fold .panel-heading', function (e) {
            e.preventDefault();
            $panelHeading = $(this);
            $fold = $panelHeading.closest('.imandra-fold');

            $panelBody = $fold.find('.panel-body');
            $panelBody.toggleClass('collapse');

            if ($panelBody.hasClass('collapse')) {
                $fold.children('.panel-heading').find('.fa-chevron-down').addClass('hidden');
                $fold.children('.panel-heading').find('.fa-chevron-right').removeClass('hidden');
            } else {
                $fold.children('.panel-heading').find('.fa-chevron-down').removeClass('hidden');
                $fold.children('.panel-heading').find('.fa-chevron-right').addClass('hidden');
            }
        });
    }

    var load_ipython_extension = function () {
        $('<link/>')
            .attr({
                rel: 'stylesheet',
                type: 'text/css',
                href: requirejs.toUrl('../nbextensions/nbimandra/nbimandra.css')
            })
            .appendTo('head');

        handleAlternatives();
        handleFold();
    };

    return {
        load_ipython_extension: load_ipython_extension,
    };
});
