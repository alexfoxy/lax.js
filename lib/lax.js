"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

//
// lax v1.2.3 (Alex Fox)
// Simple & light weight vanilla javascript plugin to create beautiful animations things when you scrolllll!!
//
// Licensed under the terms of the MIT license.
//
// You may use it in your theme if you credit me. 
// It is also free to use on any individual website.
//
// Exception:
// The only restriction is to not publish any  
// extension for browsers or native application
// without getting a written permission first.
//
(function () {
  var lax = function () {
    var lax = {
      elements: []
    };
    var lastY = 0;
    var currentBreakpoint = 'default';
    var breakpointsSeparator = "_";
    var transformFns = {
      "data-lax-opacity": function dataLaxOpacity(style, v) {
        style.opacity = v;
      },
      "data-lax-translate": function dataLaxTranslate(style, v) {
        style.transform += " translate(".concat(v, "px, ").concat(v, "px)");
      },
      "data-lax-translate-x": function dataLaxTranslateX(style, v) {
        style.transform += " translateX(".concat(v, "px)");
      },
      "data-lax-translate-y": function dataLaxTranslateY(style, v) {
        style.transform += " translateY(".concat(v, "px)");
      },
      "data-lax-scale": function dataLaxScale(style, v) {
        style.transform += " scale(".concat(v, ")");
      },
      "data-lax-scale-x": function dataLaxScaleX(style, v) {
        style.transform += " scaleX(".concat(v, ")");
      },
      "data-lax-scale-y": function dataLaxScaleY(style, v) {
        style.transform += " scaleY(".concat(v, ")");
      },
      "data-lax-skew": function dataLaxSkew(style, v) {
        style.transform += " skew(".concat(v, "deg, ").concat(v, "deg)");
      },
      "data-lax-skew-x": function dataLaxSkewX(style, v) {
        style.transform += " skewX(".concat(v, "deg)");
      },
      "data-lax-skew-y": function dataLaxSkewY(style, v) {
        style.transform += " skewY(".concat(v, "deg)");
      },
      "data-lax-rotate": function dataLaxRotate(style, v) {
        style.transform += " rotate(".concat(v, "deg)");
      },
      "data-lax-rotate-x": function dataLaxRotateX(style, v) {
        style.transform += " rotateX(".concat(v, "deg)");
      },
      "data-lax-rotate-y": function dataLaxRotateY(style, v) {
        style.transform += " rotateY(".concat(v, "deg)");
      },
      "data-lax-brightness": function dataLaxBrightness(style, v) {
        style.filter += " brightness(".concat(v, "%)");
      },
      "data-lax-contrast": function dataLaxContrast(style, v) {
        style.filter += " contrast(".concat(v, "%)");
      },
      "data-lax-hue-rotate": function dataLaxHueRotate(style, v) {
        style.filter += " hue-rotate(".concat(v, "deg)");
      },
      "data-lax-blur": function dataLaxBlur(style, v) {
        style.filter += " blur(".concat(v, "px)");
      },
      "data-lax-invert": function dataLaxInvert(style, v) {
        style.filter += "  invert(".concat(v, "%)");
      },
      "data-lax-saturate": function dataLaxSaturate(style, v) {
        style.filter += "  saturate(".concat(v, "%)");
      },
      "data-lax-grayscale": function dataLaxGrayscale(style, v) {
        style.filter += "  grayscale(".concat(v, "%)");
      },
      "data-lax-bg-pos": function dataLaxBgPos(style, v) {
        style.backgroundPosition = "".concat(v, "px ").concat(v, "px");
      },
      "data-lax-bg-pos-x": function dataLaxBgPosX(style, v) {
        style.backgroundPositionX = "".concat(v, "px");
      },
      "data-lax-bg-pos-y": function dataLaxBgPosY(style, v) {
        style.backgroundPositionY = "".concat(v, "px");
      }
    };
    var _crazy = "";

    for (var i = 0; i < 20; i++) {
      _crazy += " " + i * 5 + " " + i * 47 % 360 + ", ";
    }

    lax.presets = {
      linger: function linger(v) {
        return {
          "data-lax-translate-y": "(vh*0.7) 0, 0 200, -500 0"
        };
      },
      lazy: function lazy() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
        return {
          "data-lax-translate-y": "(vh) 0, (-elh) ".concat(v)
        };
      },
      eager: function eager() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
        return {
          "data-lax-translate-y": "(vh) 0, (-elh) -".concat(v)
        };
      },
      slalom: function slalom() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 50;
        return {
          "data-lax-translate-x": "vh ".concat(v, ", (vh*0.8) ").concat(-v, ", (vh*0.6) ").concat(v, ", (vh*0.4) ").concat(-v, ", (vh*0.2) ").concat(v, ", (vh*0) ").concat(-v, ", (-elh) ").concat(v)
        };
      },
      crazy: function crazy(v) {
        return {
          "data-lax-hue-rotate": "".concat(_crazy, " | loop=20")
        };
      },
      spin: function spin() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 360;
        return {
          "data-lax-rotate": "(vh) 0, (-elh) ".concat(v)
        };
      },
      spinRev: function spinRev() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 360;
        return {
          "data-lax-rotate": "(vh) 0, (-elh) ".concat(-v)
        };
      },
      spinIn: function spinIn() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 360;
        return {
          "data-lax-rotate": "vh ".concat(v, ", (vh*0.5) 0")
        };
      },
      spinOut: function spinOut() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 360;
        return {
          "data-lax-rotate": "(vh*0.5) 0, -elh ".concat(v)
        };
      },
      blurInOut: function blurInOut() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 40;
        return {
          "data-lax-blur": "(vh) ".concat(v, ", (vh*0.8) 0, (vh*0.2) 0, 0 ").concat(v)
        };
      },
      blurIn: function blurIn() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 40;
        return {
          "data-lax-blur": "(vh) ".concat(v, ", (vh*0.7) 0")
        };
      },
      blurOut: function blurOut() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 40;
        return {
          "data-lax-blur": "(vh*0.3) 0, 0 ".concat(v)
        };
      },
      fadeInOut: function fadeInOut() {
        return {
          "data-lax-opacity": "(vh) 0, (vh*0.8) 1, (vh*0.2) 1, 0 0"
        };
      },
      fadeIn: function fadeIn() {
        return {
          "data-lax-opacity": "(vh) 0, (vh*0.7) 1"
        };
      },
      fadeOut: function fadeOut() {
        return {
          "data-lax-opacity": "(vh*0.3) 1, 0 0"
        };
      },
      driftLeft: function driftLeft() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
        return {
          "data-lax-translate-x": "vh ".concat(v, ", -elh ").concat(-v)
        };
      },
      driftRight: function driftRight() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
        return {
          "data-lax-translate-x": "vh ".concat(-v, ", -elh ").concat(v)
        };
      },
      leftToRight: function leftToRight() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        return {
          "data-lax-translate-x": "vh 0, -elh (vw*".concat(v, ")")
        };
      },
      rightToLeft: function rightToLeft() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        return {
          "data-lax-translate-x": "vh 0, -elh (vw*".concat(-v, ")")
        };
      },
      zoomInOut: function zoomInOut() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.2;
        return {
          "data-lax-scale": "(vh) ".concat(v, ", (vh*0.8) 1, (vh*0.2) 1, -elh ").concat(v)
        };
      },
      zoomIn: function zoomIn() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.2;
        return {
          "data-lax-scale": "(vh) ".concat(v, ", (vh*0.7) 1")
        };
      },
      zoomOut: function zoomOut() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.2;
        return {
          "data-lax-scale": "(vh*0.3) 1, -elh ".concat(v)
        };
      },
      speedy: function speedy() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 30;
        return {
          "data-lax-skew-x": "(vh) ".concat(v, ", -elh ").concat(-v)
        };
      },
      swing: function swing() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 30;
        return {
          "data-lax-skew-y": "(vh) ".concat(v, ", -elh ").concat(-v)
        };
      }
    };

    lax.addPreset = function (p, o) {
      lax.presets[p] = o;
    };

    function intrp(t, v) {
      var i = 0;

      while (t[i][0] <= v && t[i + 1] !== undefined) {
        i += 1;
      }

      var x = t[i][0];
      var prevX = t[i - 1] === undefined ? x : t[i - 1][0];
      var y = t[i][1];
      var prevY = t[i - 1] === undefined ? y : t[i - 1][1];
      var xPoint = Math.min(Math.max((v - prevX) / (x - prevX), 0), 1);
      var yPoint = xPoint * (y - prevY) + prevY;
      return yPoint;
    }

    function fnOrVal(s) {
      if (s[0] === "(") return eval(s);else return parseFloat(s);
    }

    lax.setup = function () {
      var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      lax.breakpoints = o.breakpoints || {};
      lax.selector = o.selector || '.lax';
      lax.populateElements();
    };

    lax.removeElement = function (el) {
      var i = lax.elements.findIndex(function (o) {
        return o.el = el;
      });

      if (i > -1) {
        lax.elements.splice(i, 1);
      }
    };

    lax.createLaxObject = function (el) {
      var o = {
        el: el,
        originalStyle: {
          transform: el.style.transform,
          filter: el.style.filter
        },
        transforms: {}
      };
      return o;
    };

    lax.calcTransforms = function (o) {
      var el = o.el; //find presets in data attributes

      var presets = [];

      for (var _i = 0; _i < el.attributes.length; _i++) {
        var a = el.attributes[_i];

        if (a.name.indexOf("data-lax-preset") > -1) {
          presets.push(a);
        }
      } //unwrap presets into transformations


      var _loop = function _loop(_i2) {
        var a = presets[_i2];
        var b = a.name.split(breakpointsSeparator);
        var breakpoint = b[1] ? "".concat(breakpointsSeparator).concat(b[1]) : '';
        a.value.split(" ").forEach(function (p) {
          var bits = p.split("-");
          var fn = lax.presets[bits[0]];

          if (!fn) {
            console.log("lax error: preset ".concat(bits[0], " is not defined"));
          } else {
            var d = fn(bits[1]);

            for (var k in d) {
              el.setAttribute("".concat(k).concat(breakpoint), d[k]);
            }
          }
        });
        var currentAnchor = el.getAttribute("data-lax-anchor");
        if (!currentAnchor || currentAnchor === "") el.setAttribute("data-lax-anchor", "self");
        el.attributes.removeNamedItem(a.name);
      };

      for (var _i2 = 0; _i2 < presets.length; _i2++) {
        _loop(_i2);
      } // use gpu


      var useGpu = !(el.attributes["data-lax-use-gpu"] && el.attributes["data-lax-use-gpu"].value === 'false');

      if (useGpu) {
        el.style["backface-visibility"] = "hidden";
        el.style["-webkit-backface-visibility"] = "hidden";
      }

      if (el.attributes["data-lax-use-gpu"]) el.attributes.removeNamedItem("data-lax-use-gpu"); // optmise off screen

      o.optimise = false;

      if (el.attributes["data-lax-optimize"] && el.attributes["data-lax-optimize"].value === 'true') {
        o.optimise = true;
        var bounds = el.getBoundingClientRect();
        el.setAttribute("data-lax-opacity", "".concat(-bounds.height - 1, " 0, ").concat(-bounds.height, " 1, ").concat(window.innerHeight, " 1, ").concat(window.innerHeight + 1, " 0"));
        el.attributes.removeNamedItem("data-lax-optimize");
      } // build transform list


      for (var _i3 = 0; _i3 < el.attributes.length; _i3++) {
        var _a = el.attributes[_i3];
        if (_a.name.indexOf("data-lax") < 0) continue;

        var b = _a.name.split(breakpointsSeparator);

        var bits = b[0].split("-");
        var breakpoint = b[1] || "default";

        if (bits[1] === "lax") {
          if (_a.name === "data-lax-anchor") {
            o["data-lax-anchor"] = _a.value === "self" ? el : document.querySelector(_a.value);
            var rect = o["data-lax-anchor"].getBoundingClientRect();
            o.anchorTop = Math.floor(rect.top) + window.scrollY;
          } else {
            (function () {
              var tString = _a.value.replace(/vw/g, window.innerWidth).replace(/vh/g, window.innerHeight).replace(/elh/g, el.clientHeight).replace(/elw/g, el.clientWidth).replace(/\s+/g, " ");

              var _tString$split = tString.split("|"),
                  _tString$split2 = _slicedToArray(_tString$split, 2),
                  arrString = _tString$split2[0],
                  optionString = _tString$split2[1];

              var options = {};

              if (optionString) {
                optionString.split(" ").forEach(function (o) {
                  var _o$split = o.split("="),
                      _o$split2 = _slicedToArray(_o$split, 2),
                      key = _o$split2[0],
                      val = _o$split2[1];

                  options[key] = key && fnOrVal(val);
                });
              }

              var name = b[0];
              var valueMap = arrString.split(",").map(function (x) {
                return x.trim().split(" ").map(fnOrVal);
              }).sort(function (a, b) {
                return a[0] - b[0];
              });

              if (!o.transforms[name]) {
                o.transforms[name] = {};
              }

              o.transforms[name][breakpoint] = {
                valueMap: valueMap,
                options: options
              };
            })();
          }
        }
      } // sprite sheet animation


      var spriteData = el.attributes["data-lax-sprite-data"] && el.attributes["data-lax-sprite-data"].value;

      if (spriteData) {
        o.spriteData = spriteData.split(",").map(function (x) {
          return parseInt(x);
        });
        el.style.height = o.spriteData[1] + "px";
        el.style.width = o.spriteData[0] + "px";
        var spriteImage = el.attributes["data-lax-sprite-image"] && el.attributes["data-lax-sprite-image"].value;

        if (spriteImage) {
          el.style.backgroundImage = "url(".concat(spriteImage, ")");
        }
      }

      return o;
    };

    lax.addElement = function (el) {
      var o = lax.calcTransforms(lax.createLaxObject(el));
      lax.elements.push(o);
      lax.updateElement(o);
    };

    lax.populateElements = function () {
      lax.elements = [];
      document.querySelectorAll(lax.selector).forEach(lax.addElement);
      currentBreakpoint = lax.getCurrentBreakPoint();
    };

    lax.updateElements = function () {
      lax.elements.forEach(function (o) {
        lax.calcTransforms(o);
        lax.updateElement(o);
      });
      currentBreakpoint = lax.getCurrentBreakPoint();
    };

    lax.getCurrentBreakPoint = function () {
      var b = 'default';
      var w = window.innerWidth;

      for (var _i4 in lax.breakpoints) {
        var px = parseFloat(lax.breakpoints[_i4]);

        if (px <= w) {
          b = _i4;
        } else {
          break;
        }
      }

      return b;
    };

    lax.updateElement = function (o) {
      var originalStyle = o.originalStyle,
          anchorTop = o.anchorTop,
          transforms = o.transforms,
          spriteData = o.spriteData,
          el = o.el;
      var r = anchorTop ? anchorTop - lastY : lastY;
      var style = {
        transform: originalStyle.transform,
        filter: originalStyle.filter
      };

      for (var _i5 in transforms) {
        var transformData = transforms[_i5][currentBreakpoint] || transforms[_i5]["default"];

        if (!transformData) {
          // console.log(`lax error: there is no setting for key ${i} and screen size ${currentBreakpoint}. Try adding a default value!`)
          continue;
        }

        var _r = r;
        if (transformData.options.offset) _r = _r + transformData.options.offset;
        if (transformData.options.speed) _r = _r * transformData.options.speed;
        if (transformData.options.loop) _r = _r % transformData.options.loop;
        var t = transformFns[_i5];
        var v = intrp(transformData.valueMap, _r);

        if (!t) {
          // console.info(`lax: error ${i} is not supported`)
          continue;
        }

        t(style, v);
      }

      if (spriteData) {
        var _spriteData = _slicedToArray(spriteData, 5),
            frameW = _spriteData[0],
            frameH = _spriteData[1],
            numFrames = _spriteData[2],
            cols = _spriteData[3],
            scrollStep = _spriteData[4];

        var frameNo = Math.floor(lastY / scrollStep) % numFrames;
        var framePosX = frameNo % cols;
        var framePosY = Math.floor(frameNo / cols);
        style.backgroundPosition = "-".concat(framePosX * frameW, "px -").concat(framePosY * frameH, "px");
      }

      if (style.opacity === 0) {
        // if opacity 0 don't update
        el.style.opacity = 0;
      } else {
        for (var k in style) {
          el.style[k] = style[k];
        }
      }
    };

    lax.update = function (y) {
      if (lastY === y) return;
      lastY = y;
      lax.elements.forEach(lax.updateElement);
    };

    return lax;
  }();

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') module.exports = lax;else window.lax = lax;
})();