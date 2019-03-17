"use strict";

//
// lax v0.0.1 (Alex Fox)
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
    var transforms = {
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
      }
    };
    var _crazy = "";

    for (var i = 0; i < 100; i++) {
      _crazy += " " + window.innerHeight * (i / 100) + " " + Math.random() * 360 + ", ";
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
          "data-lax-hue-rotate": _crazy
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
      }
    };

    lax.addPreset = function (name, o) {
      lax.presets[name] = o;
    };

    function intrp(table, v) {
      var i = 0;

      while (table[i][0] <= v && table[i + 1] !== undefined) {
        i += 1;
      }

      var x = table[i][0];
      var prevX = table[i - 1] === undefined ? x : table[i - 1][0];
      var y = table[i][1];
      var prevY = table[i - 1] === undefined ? y : table[i - 1][1];
      var xPoint = Math.min(Math.max((v - prevX) / (x - prevX), 0), 1);
      var yPoint = xPoint * (y - prevY) + prevY;
      return yPoint;
    }

    lax.setup = function (o) {
      lax.populateElements();
    };

    lax.populateElements = function () {
      lax.elements = [];
      var selector = Object.keys(transforms).map(function (t) {
        return "[".concat(t, "]");
      }).join(",");
      selector += ",[data-lax-preset]";
      document.querySelectorAll(selector).forEach(function (el) {
        var o = {
          el: el,
          transforms: []
        };
        var presetNames = el.attributes["data-lax-preset"] && el.attributes["data-lax-preset"].value;

        if (presetNames) {
          presetNames.split(" ").forEach(function (p) {
            var bits = p.split("-");
            var fn = lax.presets[bits[0]];

            if (!fn) {
              console.error("preset #{bits[0]} is not defined");
            } else {
              var d = fn(bits[1]);

              for (var k in d) {
                el.setAttribute(k, d[k]);
              }
            }
          });
          el.setAttribute("data-lax-anchor", "self");
          el.attributes.removeNamedItem("data-lax-preset");
        }

        var optimise = !(el.attributes["data-lax-optimize"] && el.attributes["data-lax-optimize"].value == 'false');
        if (optimise) el.style["-webkit-backface-visibility"] = "hidden";
        if (el.attributes["data-lax-optimize"]) el.attributes.removeNamedItem("data-lax-optimize");

        for (var i = 0; i < el.attributes.length; i++) {
          var a = el.attributes[i];
          var bits = a.name.split("-");

          if (bits[1] === "lax") {
            if (a.name === "data-lax-anchor") {
              o["data-lax-anchor"] = a.value === "self" ? el : document.querySelector(a.value);
              var rect = o["data-lax-anchor"].getBoundingClientRect();
              o["data-lax-anchor-top"] = Math.floor(rect.top) + window.scrollY;
            } else {
              o.transforms[a.name] = a.value.replace(new RegExp('vw', 'g'), window.innerWidth).replace(new RegExp('vh', 'g'), window.innerHeight).replace(new RegExp('elh', 'g'), el.clientHeight).replace(new RegExp('elw', 'g'), el.clientWidth).replace(new RegExp('-vw', 'g'), -window.innerWidth).replace(new RegExp('-vh', 'g'), -window.innerHeight).replace(new RegExp('-elh', 'g'), -el.clientHeight).replace(new RegExp('-elw', 'g'), -el.clientWidth).replace(/\s+/g, " ").split(",").map(function (x) {
                return x.trim().split(" ").map(function (y) {
                  if (y[0] === "(") return eval(y);else return parseFloat(y);
                });
              }).sort(function (a, b) {
                return a[0] - b[0];
              });
            }
          }
        }

        lax.elements.push(o);
      });
    };

    var lastScroll = 0;

    lax.update = function (y) {
      var momentum = lastScroll - y;
      lastScroll = y;
      lax.elements.forEach(function (o) {
        var transformString = "";
        var r = o["data-lax-anchor-top"] ? o["data-lax-anchor-top"] - y : y;
        var style = {
          transform: "",
          filter: ""
        };

        for (var i in o.transforms) {
          var arr = o.transforms[i];
          var t = transforms[i];
          var v = intrp(arr, r);

          if (!t) {
            console.error("lax: " + i + " is not supported");
            return;
          }

          t(style, v);
        }

        for (var k in style) {
          if (style.opacity === 0) {
            // if opacity 0 don't update
            o.el.style.opacity = 0;
          } else {
            o.el.style[k] = style[k];
          }
        }
      });
    };

    return lax;
  }();

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') module.exports = lax;else window.lax = lax;
})();