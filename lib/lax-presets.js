"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

(function () {
  var elInOutY = function elInOutY(x) {
    return ["elInY", "elCenterY-".concat(x), "elCenterY", "elCenterY+".concat(x), "elOutY"];
  };

  var elInOutX = function elInOutX(x) {
    return ["elInX", "elCenterX-".concat(x), "elCenterX", "elCenterX+".concat(x), "elOutX"];
  };

  var axisToInOutMap = function axisToInOutMap(axis) {
    return axis === 'y' ? ["elInY", "elOutY"] : ["elInX", "elOutX"];
  };

  var speedToOffset = function speedToOffset(speed, axis) {
    var screenAxis = axis === "y" ? "screenHeight" : "screenWidth";
    var s = Math.max(Math.min(speed, 1), 0) / 2;
    return "((".concat(s, "*").concat(screenAxis, "))");
  };

  var inOutHelper = function inOutHelper(key, s, e, speed, axis, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        sliceStart = _ref2[0],
        sliceEnd = _ref2[1];

    var offset = speedToOffset(speed, axis);
    var arr1 = axis === 'y' ? elInOutY(offset) : elInOutX(offset);
    var arr2 = [s, e, e, e, s];
    return _defineProperty({}, key, [arr1.slice(sliceStart, sliceEnd), arr2.slice(sliceStart, sliceEnd), {
      easing: 'easeInOutQuad'
    }]);
  };

  var presets = {
    // Fade
    fadeIn: function fadeIn() {
      var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.2;
      var axis = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'y';
      return inOutHelper('opacity', v, 1, speed, axis, [0, 3]);
    },
    fadeOut: function fadeOut() {
      var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.2;
      var axis = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'y';
      return inOutHelper('opacity', v, 1, speed, axis, [3, 5]);
    },
    fadeInOut: function fadeInOut() {
      var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.2;
      var axis = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'y';
      return inOutHelper('opacity', v, 1, speed, axis, [0, 5]);
    },
    // Scale
    scaleIn: function scaleIn() {
      var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.2;
      var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.2;
      var axis = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'y';
      return inOutHelper('scale', v, 1, speed, axis, [0, 3]);
    },
    scaleOut: function scaleOut() {
      var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.2;
      var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.2;
      var axis = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'y';
      return inOutHelper('scale', v, 1, speed, axis, [3, 5]);
    },
    scaleInOut: function scaleInOut() {
      var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.2;
      var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.2;
      var axis = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'y';
      return inOutHelper('scale', v, 1, speed, axis, [0, 5]);
    },
    // Blur
    blurIn: function blurIn() {
      var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 50;
      var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.2;
      var axis = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'y';
      return inOutHelper('blur', v, 0, speed, axis, [0, 3]);
    },
    blurOut: function blurOut() {
      var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 50;
      var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.2;
      var axis = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'y';
      return inOutHelper('blur', v, 0, speed, axis, [3, 5]);
    },
    blurInOut: function blurInOut() {
      var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 50;
      var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.2;
      var axis = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'y';
      return inOutHelper('blur', v, 0, speed, axis, [0, 5]);
    },
    // Rotate 
    spin: function spin() {
      var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
      return {
        rotate: [[0, v], [0, 360], {
          modValue: v
        }]
      };
    },
    // Skew
    lightspeed: function lightspeed() {
      var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 20;
      var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;
      var axis = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'y';
      var offset = speedToOffset(speed, axis);
      var arr1 = axis === 'y' ? elInOutY(offset) : elInOutX(offset);
      return {
        skewX: [arr1, [-v, -v, 0, v, v], {
          easing: 'easeInOutQuad'
        }]
      };
    },
    panHorizontal: function panHorizontal() {
      var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
      var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.2;
      var axis = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'y';
      return {
        translateX: [axisToInOutMap(axis), [0, v]]
      };
    },
    panVertical: function panVertical() {
      var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
      var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.2;
      var axis = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'y';
      return {
        translateY: [axisToInOutMap(axis), [0, v]]
      };
    }
  };
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') module.exports = presets;else window.laxPresets = presets;
})();