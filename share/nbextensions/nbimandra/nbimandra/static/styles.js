define([], function () {
    return {
        logging: false,
        pixelRatio: window.devicePixelRatio || 1,
        wireFramePixelRatio: window.devicePixelRatio || 1,
        layout: 'relaxed',
        layoutByWeightOrder: true,
        showZeroWeightGroups: false,
        groupMinDiameter: 0,
        rectangleAspectRatioPreference: -1,
        relaxationInitializer: 'fisheye', //fisheye, squarified,random
        relaxationMaxDuration: 3000,
        relaxationVisible: false,
        relaxationQualityThreshold: 0,
        stacking: 'flattened',
        descriptionGroupType: 'flattened', //stab
        descriptionGroupPosition: 225,
        descriptionGroupDistanceFromCenter: 1,
        descriptionGroupSize: 0.123,
        descriptionGroupMinHeight: 40,
        descriptionGroupMaxHeight: 1,
        descriptionGroupPolygonDrawn: false,
        maxGroups: 10000,
        maxGroupLevelsDrawn: 20,
        maxGroupLabelLevelsDrawn: 20,
        groupGrowingDuration: 0,
        groupGrowingEasing: 'bounce',
        groupGrowingDrag: 0,
        groupResizingBudget: 1,
        groupBorderRadius: 0.33, //group destinction
        groupBorderWidth: 3, //group destinction
        groupBorderWidthScaling: 1,
        groupInsetWidth: 5, //space for group indication
        groupBorderRadiusCorrection: 1,
        groupSelectionOutlineWidth: 3,
        groupSelectionOutlineColor: 'hsla(159, 69%, 100%, 1)',
        groupSelectionOutlineShadowSize: 0,
        groupSelectionOutlineShadowColor: '#fff',
        groupSelectionFillHueShift: 0,
        groupSelectionFillSaturationShift: 0,
        groupSelectionFillLightnessShift: 0,
        groupSelectionStrokeHueShift: 100,
        groupSelectionStrokeSaturationShift: 100,
        groupSelectionStrokeLightnessShift: 200,
        groupFillType: 'plain',
        groupFillGradientRadius: 0,
        groupFillGradientCenterHueShift: 0,
        groupFillGradientCenterSaturationShift: 0,
        groupFillGradientCenterLightnessShift: 27,
        groupFillGradientRimHueShift: 0,
        groupFillGradientRimSaturationShift: 0,
        groupFillGradientRimLightnessShift: 5,
        groupStrokeType: 'plain',
        groupStrokeWidth: 10,
        groupStrokePlainHueShift: 10,
        groupStrokePlainSaturationShift: 0,
        groupStrokePlainLightnessShift: -5,
        groupStrokeGradientRadius: 1,
        groupStrokeGradientAngle: 12,
        groupStrokeGradientUpperHueShift: 0,
        groupStrokeGradientUpperSaturationShift: 0,
        groupStrokeGradientUpperLightnessShift: 5,
        groupStrokeGradientLowerHueShift: -12,
        groupStrokeGradientLowerSaturationShift: 0,
        groupStrokeGradientLowerLightnessShift: -5,
        groupHoverFillHueShift: 0,
        groupHoverFillSaturationShift: 22,
        groupHoverFillLightnessShift: -22,
        groupHoverStrokeHueShift: 22,
        groupHoverStrokeSaturationShift: 0,
        groupHoverStrokeLightnessShift: 100,
        groupExposureScale: 1.39,
        groupExposureShadowColor: 'hsla(60, 0%, 98%, 1)',
        groupExposureShadowSize: 47,
        groupExposureZoomMargin: 0,
        groupUnexposureLightnessShift: 68,
        groupUnexposureSaturationShift: -78,
        groupUnexposureLabelColorThreshold: 0.35,
        exposeDuration: 100,
        exposeEasing: 'squareInOut',
        groupContentDecoratorTriggering: 'onLayoutDirty',
        openCloseDuration: 100,
        rainbowColorDistribution: 'linear', //linear, radial
        rainbowColorDistributionAngle: -45,
        rainbowLightnessDistributionAngle: 270,
        rainbowSaturationCorrection: 0,
        rainbowLightnessCorrection: 0,
        rainbowStartColor: 'hsla(162, 76%, 79%, 1)',
        rainbowEndColor: 'hsla(166, 78%, 80%, 1)',
        rainbowLightnessShift: 30,
        rainbowLightnessShiftCenter: 0.4,
        parentFillOpacity: 1,
        parentStrokeOpacity: 1,
        parentLabelOpacity: 1,
        parentOpacityBalancing: true,
        wireframeDrawMaxDuration: 15,
        wireframeLabelDrawing: 'true',
        wireframeContentDecorationDrawing: 'auto',
        wireframeToFinalFadeDuration: 50,
        wireframeToFinalFadeDelay: 50,
        finalCompleteDrawMaxDuration: 80,
        finalIncrementalDrawMaxDuration: 100,
        finalToWireframeFadeDuration: 200,
        androidStockBrowserWorkaround: false,
        incrementalDraw: 'fast',
        groupLabelFontFamily: 'Open Sans',
        groupLabelFontStyle: 'normal',
        groupLabelFontWeight: 'normal',
        groupLabelFontVariant: 'normal',
        groupLabelLineHeight: 0,
        groupLabelHorizontalPadding: 0,
        groupLabelVerticalPadding: 0,
        groupLabelMinFontSize: 0,
        groupLabelMaxFontSize: 18,
        groupLabelMaxTotalHeight: 1,
        groupLabelUpdateThreshold: 0.2,
        groupLabelDarkColor: 'hsla(191, 87%, 25%, 1)',
        groupLabelLightColor: 'hsla(191, 87%, 25%, 1)',
        groupLabelColorThreshold: 0,
        rolloutStartPoint: 'center',
        rolloutEasing: 'squareOut',
        rolloutMethod: 'groups',
        rolloutDuration: 0,
        pullbackStartPoint: 'center',
        pullbackEasing: 'squareIn',
        pullbackMethod: 'groups',
        pullbackDuration: 0,
        pullbackScalingStrength: -0.7,
        pullbackTranslationXStrength: 0,
        pullbackTranslationYStrength: 0,
        pullbackRotationStrength: -0.7,
        pullbackTransformationCenter: 0.7,
        pullbackPolygonDelay: 0.3,
        pullbackPolygonDrag: 0.1,
        pullbackPolygonDuration: 0.8,
        pullbackLabelDelay: 0,
        pullbackLabelDrag: 0.1,
        pullbackLabelDuration: 0.3,
        pullbackChildGroupsDelay: 0.1,
        pullbackChildGroupsDrag: 0.1,
        pullbackChildGroupsDuration: 0.3,
        fadeDuration: 0,
        fadeEasing: 'cubicInOut',
        zoomMouseWheelFactor: 0.5,
        zoomMouseWheelDuration: 200,
        zoomMouseWheelEasing: 'squareOut',
        maxLabelSizeForTitleBar: 8,
        titleBarFontFamily: null,
        titleBarFontStyle: 'normal',
        titleBarFontWeight: 'normal',
        titleBarFontVariant: 'normal',
        titleBarBackgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleBarTextColor: 'rgba(255, 255, 255, 1)',
        titleBarMinFontSize: 10,
        titleBarMaxFontSize: 40,
        titleBarTextPaddingLeftRight: 20,
        titleBarTextPaddingTopBottom: 15,
        interactionHandler: 'builtin',
        onGroupMouseMove: [],
        onGroupMouseUp: [],
        imageData: null,
        containerCoordinates: null,
        viewport: null,
        times: null
    };
});
