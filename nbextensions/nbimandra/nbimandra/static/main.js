define([], function () {

    var load_ipython_extension = function () {
        $('<link/>')
            .attr({
                rel: 'stylesheet',
                type: 'text/css',
                href: requirejs.toUrl('../nbextensions/nbimandra/nbimandra.css')
            })
            .appendTo('head');


        $(document).on('click', '.imandra-fold', function (e) {
            e.preventDefault();
            var $div = $(this);
            console.log('cleeq');
            $div.toggleClass('imandra-fold-folded');
        });
    };

    return {
        load_ipython_extension: load_ipython_extension,
    };
});
