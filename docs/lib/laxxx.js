"use strict";

//
// laxxx v0.0.1 (Alex Fox)
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
var laxxx = {};
window.laxxx = laxxx;
var parallaxObjects = [];
var transforms = {
  "laxxx-opacity": function laxxxOpacity(style, v) {
    style.opacity = v;
  },
  "laxxx-translate": function laxxxTranslate(style, v) {
    style.transform += " translate(".concat(v, "px, ").concat(v, "px)");
  },
  "laxxx-translate-x": function laxxxTranslateX(style, v) {
    style.transform += " translateX(".concat(v, "px)");
  },
  "laxxx-translate-y": function laxxxTranslateY(style, v) {
    style.transform += " translateY(".concat(v, "px)");
  },
  "laxxx-scale": function laxxxScale(style, v) {
    style.transform += " scale(".concat(v, ")");
  },
  "laxxx-scale-x": function laxxxScaleX(style, v) {
    style.transform += " scaleX(".concat(v, ")");
  },
  "laxxx-scale-y": function laxxxScaleY(style, v) {
    style.transform += " scaleY(".concat(v, ")");
  },
  "laxxx-skew": function laxxxSkew(style, v) {
    style.transform += " skew(".concat(v, "deg, ").concat(v, "deg)");
  },
  "laxxx-skew-x": function laxxxSkewX(style, v) {
    style.transform += " skewX(".concat(v, "deg)");
  },
  "laxxx-skew-y": function laxxxSkewY(style, v) {
    style.transform += " skewY(".concat(v, "deg)");
  },
  "laxxx-rotate": function laxxxRotate(style, v) {
    style.transform += " rotate(".concat(v, "deg)");
  },
  "laxxx-brightness": function laxxxBrightness(style, v) {
    style.filter += " brightness(".concat(v, "%)");
  },
  "laxxx-contrast": function laxxxContrast(style, v) {
    style.filter += " contrast(".concat(v, "%)");
  },
  "laxxx-hue-rotate": function laxxxHueRotate(style, v) {
    style.filter += " hue-rotate(".concat(v, "deg)");
  },
  "laxxx-blur": function laxxxBlur(style, v) {
    style.filter += " blur(".concat(v, "px)");
  },
  "laxxx-invert": function laxxxInvert(style, v) {
    style.filter += "  invert(".concat(v, "%)");
  },
  "laxxx-saturate": function laxxxSaturate(style, v) {
    style.filter += "  saturate(".concat(v, "%)");
  },
  "laxxx-grayscale": function laxxxGrayscale(style, v) {
    style.filter += "  grayscale(".concat(v, "%)");
  }
};
var _crazy = "";

for (var i = 0; i < 100; i++) {
  _crazy += " " + window.innerHeight * (i / 100) + " " + Math.random() * 360 + ", ";
}

laxxx.presets = {
  linger: function linger(v) {
    return {
      "laxxx-translate-y": "(vh*0.7) 0, 0 200, -500 0"
    };
  },
  lazy: function lazy() {
    var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
    return {
      "laxxx-translate-y": "(vh) 0, (-elh) ".concat(v)
    };
  },
  eager: function eager() {
    var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
    return {
      "laxxx-translate-y": "(vh) 0, (-elh) -".concat(v)
    };
  },
  slalom: function slalom() {
    var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 50;
    return {
      "laxxx-translate-x": "vh ".concat(v, ", (vh*0.8) ").concat(-v, ", (vh*0.6) ").concat(v, ", (vh*0.4) ").concat(-v, ", (vh*0.2) ").concat(v, ", (vh*0) ").concat(-v, ", (-elh) ").concat(v)
    };
  },
  crazy: function crazy(v) {
    return {
      "laxxx-hue-rotate": _crazy
    };
  },
  spin: function spin() {
    var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 360;
    return {
      "laxxx-rotate": "(vh) 0, (-elh) ".concat(v)
    };
  },
  spinRev: function spinRev() {
    var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 360;
    return {
      "laxxx-rotate": "(vh) 0, (-elh) ".concat(-v)
    };
  },
  spinIn: function spinIn() {
    var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 360;
    return {
      "laxxx-rotate": "vh ".concat(v, ", (vh*0.5) 0")
    };
  },
  spinOut: function spinOut() {
    var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 360;
    return {
      "laxxx-rotate": "(vh*0.5) 0, -elh ".concat(v)
    };
  },
  blurInOut: function blurInOut() {
    var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 40;
    return {
      "laxxx-blur": "(vh) ".concat(v, ", (vh*0.8) 0, (vh*0.2) 0, 0 ").concat(v)
    };
  },
  blurIn: function blurIn() {
    var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 40;
    return {
      "laxxx-blur": "(vh) ".concat(v, ", (vh*0.7) 0")
    };
  },
  blurOut: function blurOut() {
    var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 40;
    return {
      "laxxx-blur": "(vh*0.3) 0, 0 ".concat(v)
    };
  },
  fadeInOut: function fadeInOut() {
    return {
      "laxxx-opacity": "(vh) 0, (vh*0.8) 1, (vh*0.2) 1, 0 0"
    };
  },
  fadeIn: function fadeIn() {
    return {
      "laxxx-opacity": "(vh) 0, (vh*0.7) 1"
    };
  },
  fadeOut: function fadeOut() {
    return {
      "laxxx-opacity": "(vh*0.3) 1, 0 0"
    };
  },
  driftLeft: function driftLeft() {
    var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
    return {
      "laxxx-translate-x": "vh ".concat(v, ", -elh ").concat(-v)
    };
  },
  driftRight: function driftRight() {
    var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
    return {
      "laxxx-translate-x": "vh ".concat(-v, ", -elh ").concat(v)
    };
  },
  leftToRight: function leftToRight() {
    var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    return {
      "laxxx-translate-x": "vh 0, -elh (vw*".concat(v, ")")
    };
  },
  rightToLeft: function rightToLeft() {
    var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    return {
      "laxxx-translate-x": "vh 0, -elh (vw*".concat(-v, ")")
    };
  },
  zoomInOut: function zoomInOut() {
    var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.2;
    return {
      "laxxx-scale": "(vh) ".concat(v, ", (vh*0.8) 1, (vh*0.2) 1, -elh ").concat(v)
    };
  },
  zoomIn: function zoomIn() {
    var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.2;
    return {
      "laxxx-scale": "(vh) ".concat(v, ", (vh*0.7) 1")
    };
  },
  zoomOut: function zoomOut() {
    var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.2;
    return {
      "laxxx-scale": "(vh*0.3) 1, -elh ".concat(v)
    };
  }
};

laxxx.addPreset = function (name, o) {
  laxxx.presets[name] = o;
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

laxxx.setup = function (o) {
  laxxx.populateParallaxObjects();
};

laxxx.populateParallaxObjects = function () {
  var selector = Object.keys(transforms).map(function (t) {
    return "[".concat(t, "]");
  }).join(",");
  selector += ",[laxxx-preset]";
  document.querySelectorAll(selector).forEach(function (el) {
    var o = {
      el: el,
      transforms: []
    };
    var presetNames = el.attributes["laxxx-preset"] && el.attributes["laxxx-preset"].value;

    if (presetNames) {
      presetNames.split(" ").forEach(function (p) {
        var bits = p.split("-");
        var fn = laxxx.presets[bits[0]];

        if (!fn) {
          console.error("preset #{bits[0]} is not defined");
        } else {
          var d = fn(bits[1]);

          for (var k in d) {
            el.setAttribute(k, d[k]);
          }
        }
      });
      el.setAttribute("laxxx-anchor", "self");
      el.attributes.removeNamedItem("laxxx-preset");
    }

    var optimise = !(el.attributes["laxxx-optimize"] && el.attributes["laxxx-optimize"].value == 'false');
    if (optimise) el.style["-webkit-backface-visibility"] = "hidden";
    if (el.attributes["laxxx-optimize"]) el.attributes.removeNamedItem("laxxx-optimize");

    for (var i = 0; i < el.attributes.length; i++) {
      var a = el.attributes[i];
      var bits = a.name.split("-");

      if (bits[0] === "laxxx") {
        if (a.name === "laxxx-anchor") {
          o["laxxx-anchor"] = a.value === "self" ? el : document.querySelector(a.value);
          var rect = o["laxxx-anchor"].getBoundingClientRect();
          o["laxxx-anchor-top"] = Math.floor(rect.top) + window.scrollY;
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

    parallaxObjects.push(o);
  });
};

var lastScroll = 0;

laxxx.update = function (y) {
  var momentum = lastScroll - y;
  lastScroll = y; // console.log(momentum)

  parallaxObjects.forEach(function (o) {
    var transformString = "";
    var r = o["laxxx-anchor-top"] ? o["laxxx-anchor-top"] - y : y;
    var style = {
      transform: "",
      filter: ""
    };

    for (var i in o.transforms) {
      var arr = o.transforms[i];
      var t = transforms[i];
      var v = intrp(arr, r);

      if (!t) {
        console.error("laxxx: " + i + " is not supported");
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
