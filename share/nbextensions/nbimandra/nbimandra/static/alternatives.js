define(['jquery'], function ($) {

    function hydrate (target) {
        $(target).find('.nav').first().find('li').on('click', function (e) {
            e.preventDefault();
            $li = $(this);

            var $alternatives = $li.parents('.imandra-alternatives').first();
            var selectedIdx;

            var $nav = $alternatives.find('.nav').first();
            $nav.children('li').each(function (i, item) {
                if ($(item).is($li)) {
                    selectedIdx = i;
                }
            });

            var $tabContent = $alternatives.find('.tab-content').first();
            $tabContent.children('.tab-pane').each(function (i, item) {
                var $item = $(item);
                $item.removeClass('active');
                if (i == selectedIdx) {
                    $item.addClass('active');
                }
            });
        });
    }

    return {
        hydrate: hydrate
    };
});
