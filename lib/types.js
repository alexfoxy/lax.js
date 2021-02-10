"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cssValues = exports.isPresetName = void 0;
var LaxPresetNames = [
    "fadeIn",
    "fadeOut",
    "fadeInOut",
    "scaleIn",
    "scaleOut",
    "scaleInOut",
    "slideX",
    "slideY",
    "jiggle",
    "seesaw",
    "zigzag",
    "hueRotate",
    "spin",
    "flipX",
    "flipY",
    "blurIn",
    "blurOut",
    "blurInOut"
];
var isPresetName = function (presetName) { return LaxPresetNames.indexOf(presetName) !== -1 ? true : false; };
exports.isPresetName = isPresetName;
var cssValues;
(function (cssValues) {
    cssValues["opacity"] = "opacity";
    cssValues["scaleX"] = "scaleX";
    cssValues["scaleY"] = "scaleY";
    cssValues["scale"] = "scale";
    cssValues["skewX"] = "skewX";
    cssValues["skewY"] = "skewY";
    cssValues["skew"] = "skew";
    cssValues["rotateX"] = "rotateX";
    cssValues["rotateY"] = "rotateY";
    cssValues["rotate"] = "rotate";
    cssValues["translateX"] = "translateX";
    cssValues["translateY"] = "translateY";
    cssValues["translateZ"] = "translateZ";
    cssValues["blur"] = "blur";
    cssValues["hue-rotate"] = "hue-rotate";
    cssValues["brightness"] = "brightness";
})(cssValues = exports.cssValues || (exports.cssValues = {}));
//# sourceMappingURL=types.js.map