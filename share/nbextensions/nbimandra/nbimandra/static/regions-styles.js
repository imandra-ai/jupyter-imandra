define([], function () {
    return {
        logging: false,
        pixelRatio: window.devicePixelRatio || 1,
        wireFramePixelRatio: window.devicePixelRatio || 1,
        stacking: 'hierarchical',
        rainbowStartColor: 'hsla(162, 76%, 79%, 1)',
        rainbowEndColor: 'hsla(166, 78%, 80%, 1)',
        groupFillType: 'plain',
        rolloutDuration: 0,
        pullbackDuration: 0,
        parentFillOpacity: 0.1,
        parentLabelOpacity: 0.1,
        groupLabelMaxFontSize: 36,
        onGroupOpenOrCloseChanging: function (opts) {
            opts.group.open = opts.open;
        },
        groupLabelDecorator: function (opts, props, vars) {
            if (!props.group.region) {
                if (props.level == 0 || props.parent.open) {
                    vars.labelText = "Dbl click to zoom";
                } else {
                    vars.labelText = "";
                }
            }
        },
        onGroupMouseWheel: function (e) {
            e.allowOriginalEventDefault();
            e.preventDefault();
        },
        onGroupDrag: function (e) {
            // Prevent dragging only on touch devices
            if (('ontouchstart' in window)) {
                e.allowOriginalEventDefault();
                e.preventDefault();
            }
        }
    };
});
