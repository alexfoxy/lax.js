"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function () {
  var laxInstance = function () {
    var transforms = ["perspective", "translateX", "translateY", "translate", "scaleX", "scaleY", "scale", "skewX", "skewY", "skew", "rotateX", "rotateY", "rotate"];
    var filters = ["blur", "hue-rotate", "brightness"];
    var pxUnits = ["perspective", "translateX", "translateY", "translate", "border-radius", "blur"];
    var degUnits = ["hue-rotate", "rotate", "rotateX", "rotateY", "skew", "skewX", "skewY"];

    function floatOrNull() {
      var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      return v === "" ? undefined : v;
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
      Object.keys(styles).forEach(function (key) {
        var val = styles[key];
        var unit = pxUnits.includes(key) ? 'px' : degUnits.includes(key) ? 'deg' : '';

        if (transforms.includes(key)) {
          flattenedStyles.transform += "".concat(key, "(").concat(val).concat(unit, ") ");
        } else if (filters.includes(key)) {
          flattenedStyles.filter += "".concat(key, "(").concat(val).concat(unit, ") ");
        } else {
          flattenedStyles[key] = "".concat(val).concat(unit, " ");
        }
      });
      return flattenedStyles;
    }

    function parseValue(val, _ref, index) {
      var width = _ref.width,
          height = _ref.height,
          x = _ref.x,
          y = _ref.y;

      if (typeof val === 'number') {
        return val;
      }

      var screenWidth = document.body.clientWidth;
      var screenHeight = document.body.clientHeight;
      var scrollTop = document.body.scrollTop;
      var scrollLeft = document.body.scrollLeft;
      var left = x + scrollLeft;
      var right = left + width;
      var top = y + scrollTop;
      var bottom = top + height;
      return Function("return ".concat(val.replace(/screenWidth/g, screenWidth).replace(/screenHeight/g, screenHeight).replace(/elWidth/g, width).replace(/elHeight/g, height).replace(/elInBottom/g, top - screenHeight).replace(/elOutTop/g, bottom).replace(/elCenterVert/g, top + height / 2 - screenHeight / 2).replace(/elInRight/g, left - screenWidth).replace(/elOutLeft/g, right).replace(/elCenterHoriz/g, left + width / 2 - screenWidth / 2).replace(/index/g, index)))();
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

      _defineProperty(this, "momentum", 0);

      _defineProperty(this, "momentumEnabled", "off");

      _defineProperty(this, "getValue", function (frame) {
        var value = _this.lastValue;

        if (frame % _this.frameStep === 0) {
          value = _this.getValueFn();
        }

        if (_this.momentumEnabled !== "off") {
          var delta = value - _this.lastValue;
          var damping = 0.8;
          _this.m1 = _this.m1 * damping + delta * (1 - damping);
          _this.m2 = _this.m2 * damping + _this.m1 * (1 - damping);
          _this.momentum = Math.round(_this.m2 * 5000) / 10000;

          if (_this.momentumEnabled === "absolute") {
            _this.momentum = Math.abs(_this.momentum);
          }
        }

        _this.lastValue = value;
        return [_this.lastValue, _this.momentum];
      });

      this.name = name;
      this.getValueFn = getValueFn;
      Object.keys(options).forEach(function (key) {
        _this[key] = options[key];
      });
      this.lastValue = this.getValueFn();
    };

    var LaxElement = function LaxElement(selector, laxInstance, domElement, animationData) {
      var _this2 = this;

      var groupIndex = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

      var _options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};

      _classCallCheck(this, LaxElement);

      _defineProperty(this, "domElement", void 0);

      _defineProperty(this, "animationsData", void 0);

      _defineProperty(this, "styles", {});

      _defineProperty(this, "selector", '');

      _defineProperty(this, "groupIndex", 0);

      _defineProperty(this, "laxInstance", void 0);

      _defineProperty(this, "update", function (driverValues, frame) {
        var animations = _this2.animations;
        var styles = {};

        for (var driverName in animations) {
          var styleBindings = animations[driverName];

          if (!driverValues[driverName]) {
            console.error("No lax driver with name: ", driverName);
          }

          var _driverValues$driverN = _slicedToArray(driverValues[driverName], 2),
              value = _driverValues$driverN[0],
              momentumValue = _driverValues$driverN[1];

          for (var key in styleBindings) {
            var _styleBindings$key = _slicedToArray(styleBindings[key], 3),
                arr1 = _styleBindings$key[0],
                arr2 = _styleBindings$key[1],
                _styleBindings$key$ = _styleBindings$key[2],
                options = _styleBindings$key$ === void 0 ? {} : _styleBindings$key$;

            var loopFrame = options.loopFrame,
                _options$frameStep = options.frameStep,
                frameStep = _options$frameStep === void 0 ? 1 : _options$frameStep,
                easing = options.easing,
                momentum = options.momentum,
                cssFn = options.cssFn;
            var easingFn = easings[easing];

            if (frame % frameStep === 0) {
              var v = loopFrame ? value % loopFrame : value;
              var interpolatedValue = interpolate(arr1, arr2, v, easingFn);
              if (momentum) interpolatedValue += momentumValue * momentum;
              styles[key] = cssFn ? cssFn(interpolatedValue) : interpolatedValue;
            }
          }
        }

        _this2.applyStyles(styles);
      });

      _defineProperty(this, "calculateAnimations", function () {
        _this2.animations = {};

        var _loop = function _loop(driverName) {
          var styleBindings = _this2.animationsData[driverName];
          var parsedStyleBindings = {};
          var _styleBindings$preset = styleBindings.presets,
              presets = _styleBindings$preset === void 0 ? [] : _styleBindings$preset;
          presets.forEach(function (presetString) {
            var _presetString$split = presetString.split(" "),
                _presetString$split2 = _slicedToArray(_presetString$split, 2),
                presetName = _presetString$split2[0],
                _presetString$split2$ = _presetString$split2[1],
                opts = _presetString$split2$ === void 0 ? '' : _presetString$split2$;

            var presetFn = _this2.laxInstance.presets[presetName];

            if (!presetFn) {
              console.error("Lax preset cannot be found with name: ", presetName);
            } else {
              var _opts$split = opts.split(','),
                  _opts$split2 = _slicedToArray(_opts$split, 3),
                  v = _opts$split2[0],
                  speed = _opts$split2[1],
                  axis = _opts$split2[2];

              var preset = presetFn(floatOrNull(v), floatOrNull(speed), axis);
              Object.keys(preset).forEach(function (key) {
                styleBindings[key] = preset[key];
              });
            }
          });
          delete styleBindings.presets;

          var _loop2 = function _loop2(key) {
            var _styleBindings$key2 = _slicedToArray(styleBindings[key], 3),
                arr1 = _styleBindings$key2[0],
                arr2 = _styleBindings$key2[1],
                _styleBindings$key2$ = _styleBindings$key2[2],
                options = _styleBindings$key2$ === void 0 ? {} : _styleBindings$key2$;

            var bounds = _this2.domElement.getBoundingClientRect();

            var parsedArr1 = arr1.map(function (i) {
              return parseValue(i, bounds, _this2.groupIndex);
            });
            var parsedArr2 = arr2.map(function (i) {
              return parseValue(i, bounds, _this2.groupIndex);
            });
            parsedStyleBindings[key] = [parsedArr1, parsedArr2, options];
          };

          for (var key in styleBindings) {
            _loop2(key);
          }

          _this2.animations[driverName] = parsedStyleBindings;
        };

        for (var driverName in _this2.animationsData) {
          _loop(driverName);
        }
      });

      _defineProperty(this, "applyStyles", function (styles) {
        var mergedStyles = flattenStyles(styles);
        Object.keys(mergedStyles).forEach(function (key) {
          _this2.domElement.style[key] = mergedStyles[key];
        });
      });

      this.selector = selector;
      this.laxInstance = laxInstance;
      this.domElement = domElement;
      this.animationsData = animationData;
      this.groupIndex = groupIndex;
      var transition = _options.transition,
          willChange = _options.willChange;

      if (transition) {
        domElement.style.transition = transition;
      }

      if (willChange) {
        domElement.style.willChange = willChange;
      }

      this.calculateAnimations();
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

      _defineProperty(this, "presets", {});

      _defineProperty(this, "debugData", {
        frameLengths: []
      });

      _defineProperty(this, "init", function () {
        var presets = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _this3.addDriver('frame', function () {
          return _this3.frame;
        });

        _this3.presets = presets;

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
            return el.calculateAnimations();
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
        var elements = document.querySelectorAll("[data-lax]");
        elements.forEach(function (domElement) {
          var animations = Function("return ".concat(domElement.getAttribute('data-lax')))();

          _this3.elements.push(new LaxElement('[data-lax]', _this3, domElement, animations, 0, {}));
        });
      });

      _defineProperty(this, "addElements", function (selector, animations, options) {
        var domElements = document.querySelectorAll(selector);
        domElements.forEach(function (domElement, i) {
          _this3.elements.push(new LaxElement(selector, _this3, domElement, animations, i, options));
        });
      });

      _defineProperty(this, "removeElements", function (selector) {
        _this3.elements.filter(function (element) {
          return element.selector !== selector;
        });
      });
    };

    return new Lax();
  }();

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') module.exports = laxInstance;else window.lax = laxInstance;
})();