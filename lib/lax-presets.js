"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function () {
  var elInOutY = function elInOutY(x) {
    return ["elInBottom", "elCenterVert-".concat(x), "elCenterVert", "elCenterVert+".concat(x), "elOutTop"];
  };

  var elInOutX = function elInOutX(x) {
    return ["elInRight", "elCenterHoriz-".concat(x), "elCenterHoriz", "elCenterHoriz+".concat(x), "elOutLeft"];
  };

  var axisToInOutMap = function axisToInOutMap(axis) {
    return axis === 'y' ? ["elInBottom", "elOutTop"] : ["elInRight", "elOutLeft"];
  };

  var speedToOffset = function speedToOffset(speed, axis) {
    var screenAxis = axis === "y" ? "screenHeight" : "screenWidth";
    var s = Math.max(Math.min(speed, 1), 0) / 2;
    return "((".concat(s, "*").concat(screenAxis, "))");
  };

  var inOut = function inOut(key, s, e, speed, axis) {
    var offset = speedToOffset(speed, axis);
    var arr1 = axis === 'y' ? elInOutY(offset) : elInOutX(offset);
    var arr2 = [s, e, e, e, s];
    return _defineProperty({}, key, [arr1, arr2, {
      easing: 'easeInOutQuad'
    }]);
  };

  var presets = {
    fadeInOut: function fadeInOut() {
      var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.2;
      var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.2;
      var axis = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'y';
      return inOut('opacity', v, 1, speed, axis);
    },
    scaleInOut: function scaleInOut() {
      var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.2;
      var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.2;
      var axis = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'y';
      return inOut('scale', v, 1, speed, axis);
    },
    blurInOut: function blurInOut() {
      var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 50;
      var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.2;
      var axis = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'y';
      return inOut('blur', v, 0, speed, axis);
    },
    panHorizontal: function panHorizontal() {
      var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
      var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.2;
      var axis = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'y';
      return {
        translateX: [axisToInOutMap(axis), [0, v]]
      };
    } // },
    // rightToLeft: {
    //   translateX: [
    //     ["elInBottom", "elOutTop"],
    //     [0, 'screenWidth+elWidth'],
    //   ],
    // },
    // LeftToRight: {
    //   translateX: [
    //     ["elInBottom", "elOutTop"],
    //     [0, '-screenWidth'],
    //   ],
    // }

  };
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') module.exports = presets;else window.laxPresets = presets;
})();