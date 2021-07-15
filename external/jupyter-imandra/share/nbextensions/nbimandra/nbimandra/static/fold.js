define(['jquery'], function ($) {

    function hydrate (target) {
        $(target).find('.panel-heading').first().on('click', function (e) {
            e.preventDefault();
            $panelHeading = $(this);
            $fold = $panelHeading.closest('.imandra-fold');

            $panelBody = $fold.find('.panel-body').first();
            $panelBody.toggleClass('collapse');

            if ($panelBody.hasClass('collapse')) {
                $panelHeading.find('.fa-chevron-down').addClass('hidden');
                $panelHeading.find('.fa-chevron-right').removeClass('hidden');
            } else {
                $panelHeading.find('.fa-chevron-down').removeClass('hidden');
                $panelHeading.find('.fa-chevron-right').addClass('hidden');
            }
        });
    }

    return {
        hydrate: hydrate
    };
});
