"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

(function () {
  var inOutMap = function inOutMap() {
    var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 30;
    return ["elInY+elHeight", "elCenterY-".concat(y), "elCenterY", "elCenterY+".concat(y), "elOutY-elHeight"];
  };

  var laxPresets = {
    fadeInOut: function fadeInOut() {
      var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 30;
      var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return {
        "opacity": [inOutMap(y), [str, 1, 1, 1, str]]
      };
    },
    fadeIn: function fadeIn() {
      var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'elCenterY';
      var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return {
        "opacity": [["elInY+elHeight", y], [str, 1]]
      };
    },
    fadeOut: function fadeOut() {
      var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'elCenterY';
      var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return {
        "opacity": [[y, "elOutY-elHeight"], [1, str]]
      };
    },
    blurInOut: function blurInOut() {
      var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
      var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
      return {
        "blur": [inOutMap(y), [str, 0, 0, 0, str]]
      };
    },
    blurIn: function blurIn() {
      var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'elCenterY';
      var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
      return {
        "blur": [["elInY+elHeight", y], [str, 0]]
      };
    },
    blurOut: function blurOut() {
      var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'elCenterY';
      var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
      return {
        "opacity": [[y, "elOutY-elHeight"], [0, str]]
      };
    },
    scaleInOut: function scaleInOut() {
      var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
      var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.6;
      return {
        "scale": [inOutMap(y), [str, 1, 1, 1, str]]
      };
    },
    scaleIn: function scaleIn() {
      var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'elCenterY';
      var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.6;
      return {
        "scale": [["elInY+elHeight", y], [str, 1]]
      };
    },
    scaleOut: function scaleOut() {
      var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'elCenterY';
      var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.6;
      return {
        "scale": [[y, "elOutY-elHeight"], [1, str]]
      };
    },
    slideX: function slideX() {
      var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
      return {
        "translateX": [['elInY', y], [0, str]]
      };
    },
    slideY: function slideY() {
      var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
      return {
        "translateY": [['elInY', y], [0, str]]
      };
    },
    spin: function spin() {
      var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
      var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 360;
      return {
        "rotate": [[0, y], [0, str], {
          modValue: y
        }]
      };
    },
    flipX: function flipX() {
      var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
      var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 360;
      return {
        "rotateX": [[0, y], [0, str], {
          modValue: y
        }]
      };
    },
    flipY: function flipY() {
      var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
      var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 360;
      return {
        "rotateY": [[0, y], [0, str], {
          modValue: y
        }]
      };
    },
    jiggle: function jiggle() {
      var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 50;
      var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 40;
      return {
        "skewX": [[0, y * 1, y * 2, y * 3, y * 4], [0, str, 0, -str, 0], {
          modValue: y * 4
        }]
      };
    },
    seesaw: function seesaw() {
      var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 50;
      var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 40;
      return {
        "skewY": [[0, y * 1, y * 2, y * 3, y * 4], [0, str, 0, -str, 0], {
          modValue: y * 4
        }]
      };
    },
    zigzag: function zigzag() {
      var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
      var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
      return {
        "translateX": [[0, y * 1, y * 2, y * 3, y * 4], [0, str, 0, -str, 0], {
          modValue: y * 4
        }]
      };
    },
    hueRotate: function hueRotate() {
      var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 600;
      var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 360;
      return {
        "hue-rotate": [[0, y], [0, str], {
          modValue: y
        }]
      };
    }
  };

  var laxInstance = function () {
    var transformKeys = ["perspective", "scaleX", "scaleY", "scale", "skewX", "skewY", "skew", "rotateX", "rotateY", "rotate"];
    var filterKeys = ["blur", "hue-rotate", "brightness"];
    var translate3dKeys = ["translateX", "translateY", "translateZ"];
    var pxUnits = ["perspective", "border-radius", "blur", "translateX", "translateY", "translateZ"];
    var degUnits = ["hue-rotate", "rotate", "rotateX", "rotateY", "skew", "skewX", "skewY"];

    function getArrayValues(arr, windowWidth) {
      if (Array.isArray(arr)) return arr;
      var keys = Object.keys(arr).map(function (x) {
        return parseInt(x);
      }).sort(function (a, b) {
        return a > b ? 1 : -1;
      });
      var retKey = keys[keys.length - 1];

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];

        if (windowWidth < key) {
          retKey = key;
          break;
        }
      }

      return arr[retKey];
    }

    function lerp(start, end, t) {
      return start * (1 - t) + end * t;
    }

    function invlerp(a, b, v) {
      return (v - a) / (b - a);
    }

    function interpolate(arrA, arrB, v, easingFn) {
      var k = 0;
      arrA.forEach(function (a) {
        if (a < v) k++;
      });

      if (k <= 0) {
        return arrB[0];
      }

      if (k >= arrA.length) {
        return arrB[arrA.length - 1];
      }

      var j = k - 1;
      var vector = invlerp(arrA[j], arrA[k], v);
      if (easingFn) vector = easingFn(vector);
      var lerpVal = lerp(arrB[j], arrB[k], vector);
      return lerpVal;
    }

    var easings = {
      easeInQuad: function easeInQuad(t) {
        return t * t;
      },
      easeOutQuad: function easeOutQuad(t) {
        return t * (2 - t);
      },
      easeInOutQuad: function easeInOutQuad(t) {
        return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      },
      easeInCubic: function easeInCubic(t) {
        return t * t * t;
      },
      easeOutCubic: function easeOutCubic(t) {
        return --t * t * t + 1;
      },
      easeInOutCubic: function easeInOutCubic(t) {
        return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      },
      easeInQuart: function easeInQuart(t) {
        return t * t * t * t;
      },
      easeOutQuart: function easeOutQuart(t) {
        return 1 - --t * t * t * t;
      },
      easeInOutQuart: function easeInOutQuart(t) {
        return t < .5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
      },
      easeInQuint: function easeInQuint(t) {
        return t * t * t * t * t;
      },
      easeOutQuint: function easeOutQuint(t) {
        return 1 + --t * t * t * t * t;
      },
      easeInOutQuint: function easeInOutQuint(t) {
        return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
      },
      easeOutBounce: function easeOutBounce(t) {
        var n1 = 7.5625;
        var d1 = 2.75;

        if (t < 1 / d1) {
          return n1 * t * t;
        } else if (t < 2 / d1) {
          return n1 * (t -= 1.5 / d1) * t + 0.75;
        } else if (t < 2.5 / d1) {
          return n1 * (t -= 2.25 / d1) * t + 0.9375;
        } else {
          return n1 * (t -= 2.625 / d1) * t + 0.984375;
        }
      },
      easeInBounce: function easeInBounce(t) {
        return 1 - easings.easeOutBounce(1 - t);
      },
      easeOutBack: function easeOutBack(t) {
        var c1 = 1.70158;
        var c3 = c1 + 1;
        return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
      },
      easeInBack: function easeInBack(t) {
        var c1 = 1.70158;
        var c3 = c1 + 1;
        return c3 * t * t * t - c1 * t * t;
      }
    };

    function flattenStyles(styles) {
      var flattenedStyles = {
        transform: '',
        filter: ''
      };
      var translate3dValues = {
        translateX: 0.00001,
        translateY: 0.00001,
        translateZ: 0.00001
      };
      Object.keys(styles).forEach(function (key) {
        var val = styles[key];
        var unit = pxUnits.includes(key) ? 'px' : degUnits.includes(key) ? 'deg' : '';

        if (translate3dKeys.includes(key)) {
          translate3dValues[key] = val;
        } else if (transformKeys.includes(key)) {
          flattenedStyles.transform += "".concat(key, "(").concat(val).concat(unit, ") ");
        } else if (filterKeys.includes(key)) {
          flattenedStyles.filter += "".concat(key, "(").concat(val).concat(unit, ") ");
        } else {
          flattenedStyles[key] = "".concat(val).concat(unit, " ");
        }
      });
      flattenedStyles.transform = "translate3d(".concat(translate3dValues.translateX, "px, ").concat(translate3dValues.translateY, "px, ").concat(translate3dValues.translateZ, "px) ").concat(flattenedStyles.transform);
      return flattenedStyles;
    } // https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY#Notes


    function getScrollPosition() {
      var supportPageOffset = window.pageXOffset !== undefined;
      var isCSS1Compat = (document.compatMode || '') === 'CSS1Compat';
      var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;
      var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
      return [y, x];
    }

    function parseValue(val, _ref, index) {
      var width = _ref.width,
          height = _ref.height,
          x = _ref.x,
          y = _ref.y;

      if (typeof val === 'number') {
        return val;
      }

      var pageHeight = document.body.scrollHeight;
      var pageWidth = document.body.scrollWidth;
      var screenWidth = window.innerWidth;
      var screenHeight = window.innerHeight;

      var _getScrollPosition = getScrollPosition(),
          _getScrollPosition2 = _slicedToArray(_getScrollPosition, 2),
          scrollTop = _getScrollPosition2[0],
          scrollLeft = _getScrollPosition2[1];

      var left = x + scrollLeft;
      var right = left + width;
      var top = y + scrollTop;
      var bottom = top + height;
      return Function("return ".concat(val.replace(/screenWidth/g, screenWidth).replace(/screenHeight/g, screenHeight).replace(/pageHeight/g, pageHeight).replace(/pageWidth/g, pageWidth).replace(/elWidth/g, width).replace(/elHeight/g, height).replace(/elInY/g, top - screenHeight).replace(/elOutY/g, bottom).replace(/elCenterY/g, top + height / 2 - screenHeight / 2).replace(/elInX/g, left - screenWidth).replace(/elOutX/g, right).replace(/elCenterX/g, left + width / 2 - screenWidth / 2).replace(/index/g, index)))();
    }

    var LaxDriver = function LaxDriver(name, getValueFn) {
      var _this = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      _classCallCheck(this, LaxDriver);

      _defineProperty(this, "getValueFn", void 0);

      _defineProperty(this, "name", '');

      _defineProperty(this, "lastValue", 0);

      _defineProperty(this, "frameStep", 1);

      _defineProperty(this, "m1", 0);

      _defineProperty(this, "m2", 0);

      _defineProperty(this, "inertia", 0);

      _defineProperty(this, "inertiaEnabled", false);

      _defineProperty(this, "getValue", function (frame) {
        var value = _this.lastValue;

        if (frame % _this.frameStep === 0) {
          value = _this.getValueFn(frame);
        }

        if (_this.inertiaEnabled) {
          var delta = value - _this.lastValue;
          var damping = 0.8;
          _this.m1 = _this.m1 * damping + delta * (1 - damping);
          _this.m2 = _this.m2 * damping + _this.m1 * (1 - damping);
          _this.inertia = Math.round(_this.m2 * 5000) / 15000;
        }

        _this.lastValue = value;
        return [_this.lastValue, _this.inertia];
      });

      this.name = name;
      this.getValueFn = getValueFn;
      Object.keys(options).forEach(function (key) {
        _this[key] = options[key];
      });
      this.lastValue = this.getValueFn(0);
    };

    var LaxElement = function LaxElement(selector, laxInstance, domElement, transformsData) {
      var _this2 = this;

      var groupIndex = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

      var _options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};

      _classCallCheck(this, LaxElement);

      _defineProperty(this, "domElement", void 0);

      _defineProperty(this, "transformsData", void 0);

      _defineProperty(this, "styles", {});

      _defineProperty(this, "selector", '');

      _defineProperty(this, "groupIndex", 0);

      _defineProperty(this, "laxInstance", void 0);

      _defineProperty(this, "onUpdate", void 0);

      _defineProperty(this, "update", function (driverValues, frame) {
        var transforms = _this2.transforms;
        var styles = {};

        for (var driverName in transforms) {
          var styleBindings = transforms[driverName];

          if (!driverValues[driverName]) {
            console.error("No lax driver with name: ", driverName);
          }

          var _driverValues$driverN = _slicedToArray(driverValues[driverName], 2),
              value = _driverValues$driverN[0],
              inertiaValue = _driverValues$driverN[1];

          for (var key in styleBindings) {
            var _styleBindings$key = _slicedToArray(styleBindings[key], 3),
                arr1 = _styleBindings$key[0],
                arr2 = _styleBindings$key[1],
                _styleBindings$key$ = _styleBindings$key[2],
                options = _styleBindings$key$ === void 0 ? {} : _styleBindings$key$;

            var modValue = options.modValue,
                _options$frameStep = options.frameStep,
                frameStep = _options$frameStep === void 0 ? 1 : _options$frameStep,
                easing = options.easing,
                inertia = options.inertia,
                inertiaMode = options.inertiaMode,
                cssFn = options.cssFn,
                _options$cssUnit = options.cssUnit,
                cssUnit = _options$cssUnit === void 0 ? '' : _options$cssUnit;
            var easingFn = easings[easing];

            if (frame % frameStep === 0) {
              var v = modValue ? value % modValue : value;
              var interpolatedValue = interpolate(arr1, arr2, v, easingFn);

              if (inertia) {
                var inertiaExtra = inertiaValue * inertia;
                if (inertiaMode === 'absolute') inertiaExtra = Math.abs(inertiaExtra);
                interpolatedValue += inertiaExtra;
              }

              var unit = cssUnit || pxUnits.includes(key) ? 'px' : degUnits.includes(key) ? 'deg' : '';
              var dp = unit === 'px' ? 0 : 3;
              var val = interpolatedValue.toFixed(dp);
              styles[key] = cssFn ? cssFn(val, _this2.domElement) : val + cssUnit;
            }
          }
        }

        _this2.applyStyles(styles);

        if (_this2.onUpdate) _this2.onUpdate(driverValues, _this2.domElement);
      });

      _defineProperty(this, "calculateTransforms", function () {
        _this2.transforms = {};
        var windowWidth = _this2.laxInstance.windowWidth;

        var _loop = function _loop(driverName) {
          var styleBindings = _this2.transformsData[driverName];
          var parsedStyleBindings = {};
          var _styleBindings$preset = styleBindings.presets,
              presets = _styleBindings$preset === void 0 ? [] : _styleBindings$preset;
          presets.forEach(function (presetString) {
            var _presetString$split = presetString.split(":"),
                _presetString$split2 = _slicedToArray(_presetString$split, 3),
                presetName = _presetString$split2[0],
                y = _presetString$split2[1],
                str = _presetString$split2[2];

            var presetFn = window.lax.presets[presetName];

            if (!presetFn) {
              console.error("Lax preset cannot be found with name: ", presetName);
            } else {
              var preset = presetFn(y, str);
              Object.keys(preset).forEach(function (key) {
                styleBindings[key] = preset[key];
              });
            }
          });
          delete styleBindings.presets;

          var _loop2 = function _loop2(key) {
            var _styleBindings$key2 = _slicedToArray(styleBindings[key], 3),
                _styleBindings$key2$ = _styleBindings$key2[0],
                arr1 = _styleBindings$key2$ === void 0 ? [-1e9, 1e9] : _styleBindings$key2$,
                _styleBindings$key2$2 = _styleBindings$key2[1],
                arr2 = _styleBindings$key2$2 === void 0 ? [-1e9, 1e9] : _styleBindings$key2$2,
                _styleBindings$key2$3 = _styleBindings$key2[2],
                options = _styleBindings$key2$3 === void 0 ? {} : _styleBindings$key2$3;

            var bounds = _this2.domElement.getBoundingClientRect();

            var parsedArr1 = getArrayValues(arr1, windowWidth).map(function (i) {
              return parseValue(i, bounds, _this2.groupIndex);
            });
            var parsedArr2 = getArrayValues(arr2, windowWidth).map(function (i) {
              return parseValue(i, bounds, _this2.groupIndex);
            });
            parsedStyleBindings[key] = [parsedArr1, parsedArr2, options];
          };

          for (var key in styleBindings) {
            _loop2(key);
          }

          _this2.transforms[driverName] = parsedStyleBindings;
        };

        for (var driverName in _this2.transformsData) {
          _loop(driverName);
        }
      });

      _defineProperty(this, "applyStyles", function (styles) {
        var mergedStyles = flattenStyles(styles);
        Object.keys(mergedStyles).forEach(function (key) {
          _this2.domElement.style.setProperty(key, mergedStyles[key]);
        });
      });

      this.selector = selector;
      this.laxInstance = laxInstance;
      this.domElement = domElement;
      this.transformsData = transformsData;
      this.groupIndex = groupIndex;
      var _options$style = _options.style,
          style = _options$style === void 0 ? {} : _options$style,
          onUpdate = _options.onUpdate;
      Object.keys(style).forEach(function (key) {
        domElement.style.setProperty(key, style[key]);
      });
      if (onUpdate) this.onUpdate = onUpdate;
      this.calculateTransforms();
    };

    var Lax = function Lax() {
      var _this3 = this;

      _classCallCheck(this, Lax);

      _defineProperty(this, "drivers", []);

      _defineProperty(this, "elements", []);

      _defineProperty(this, "frame", 0);

      _defineProperty(this, "debug", false);

      _defineProperty(this, "windowWidth", 0);

      _defineProperty(this, "windowHeight", 0);

      _defineProperty(this, "presets", laxPresets);

      _defineProperty(this, "debugData", {
        frameLengths: []
      });

      _defineProperty(this, "init", function () {
        _this3.findAndAddElements();

        window.requestAnimationFrame(_this3.onAnimationFrame);
        _this3.windowWidth = document.body.clientWidth;
        _this3.windowHeight = document.body.clientHeight;
        window.onresize = _this3.onWindowResize;
      });

      _defineProperty(this, "onWindowResize", function () {
        var changed = document.body.clientWidth !== _this3.windowWidth || document.body.clientHeight !== _this3.windowHeight;

        if (changed) {
          _this3.windowWidth = document.body.clientWidth;
          _this3.windowHeight = document.body.clientHeight;

          _this3.elements.forEach(function (el) {
            return el.calculateTransforms();
          });
        }
      });

      _defineProperty(this, "onAnimationFrame", function (e) {
        if (_this3.debug) {
          _this3.debugData.frameStart = Date.now();
        }

        var driverValues = {};

        _this3.drivers.forEach(function (driver) {
          driverValues[driver.name] = driver.getValue(_this3.frame);
        });

        _this3.elements.forEach(function (element) {
          element.update(driverValues, _this3.frame);
        });

        if (_this3.debug) {
          _this3.debugData.frameLengths.push(Date.now() - _this3.debugData.frameStart);
        }

        if (_this3.frame % 60 === 0 && _this3.debug) {
          var averageFrameTime = Math.ceil(_this3.debugData.frameLengths.reduce(function (a, b) {
            return a + b;
          }, 0) / 60);
          console.log("Average frame calculation time: ".concat(averageFrameTime, "ms"));
          _this3.debugData.frameLengths = [];
        }

        _this3.frame++;
        window.requestAnimationFrame(_this3.onAnimationFrame);
      });

      _defineProperty(this, "addDriver", function (name, getValueFn) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        _this3.drivers.push(new LaxDriver(name, getValueFn, options));
      });

      _defineProperty(this, "removeDriver", function (name) {
        _this3.drivers = _this3.drivers.filter(function (driver) {
          return driver.name !== name;
        });
      });

      _defineProperty(this, "findAndAddElements", function () {
        _this3.elements = [];
        var elements = document.querySelectorAll(".lax");
        elements.forEach(function (domElement) {
          var driverName = "scrollY";
          var presets = [];
          domElement.classList.forEach(function (className) {
            if (className.includes("lax_preset")) {
              var preset = className.replace("lax_preset_", "");
              presets.push(preset);
            }
          });

          var transforms = _defineProperty({}, driverName, {
            presets: presets
          });

          _this3.elements.push(new LaxElement('.lax', _this3, domElement, transforms, 0, {}));
        });
      });

      _defineProperty(this, "addElements", function (selector, transforms, options) {
        var domElements = document.querySelectorAll(selector);
        domElements.forEach(function (domElement, i) {
          _this3.elements.push(new LaxElement(selector, _this3, domElement, transforms, i, options));
        });
      });

      _defineProperty(this, "removeElements", function (selector) {
        _this3.elements = _this3.elements.filter(function (element) {
          return element.selector !== selector;
        });
      });

      _defineProperty(this, "addElement", function (domElement, transforms, options) {
        _this3.elements.push(new LaxElement('', _this3, domElement, transforms, 0, options));
      });

      _defineProperty(this, "removeElement", function (domElement) {
        _this3.elements = _this3.elements.filter(function (element) {
          return element.domElement !== domElement;
        });
      });
    };

    return new Lax();
  }();

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') module.exports = laxInstance;else window.lax = laxInstance;
})();