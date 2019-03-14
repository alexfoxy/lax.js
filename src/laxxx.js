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

(function() {
var laxxx = {}
window.laxxx = laxxx

var parallaxObjects = []

const transforms = {
  "laxxx-opacity": function(style, v) { style.opacity = v },
  "laxxx-translate": function(style, v) { style.transform += ` translate(${v}px, ${v}px)` },
  "laxxx-translate-x": function(style, v) { style.transform += ` translateX(${v}px)` },
  "laxxx-translate-y": function(style, v) { style.transform += ` translateY(${v}px)` },
  "laxxx-scale": function(style, v) { style.transform += ` scale(${v})` },
  "laxxx-scale-x": function(style, v) { style.transform += ` scaleX(${v})` },
  "laxxx-scale-y": function(style, v) { style.transform += ` scaleY(${v})` },
  "laxxx-skew": function(style, v) { style.transform += ` skew(${v}deg, ${v}deg)` },
  "laxxx-skew-x": function(style, v) { style.transform += ` skewX(${v}deg)` },
  "laxxx-skew-y": function(style, v) { style.transform += ` skewY(${v}deg)` },
  "laxxx-rotate": function(style, v) { style.transform += ` rotate(${v}deg)` },

  "laxxx-brightness": function(style, v) { style.filter += ` brightness(${v}%)` },
  "laxxx-contrast": function(style, v) { style.filter += ` contrast(${v}%)` },
  "laxxx-hue-rotate": function(style, v) { style.filter += ` hue-rotate(${v}deg)` },
  "laxxx-blur": function(style, v) { style.filter += ` blur(${v}px)` },
  "laxxx-invert": function(style, v) { style.filter += `  invert(${v}%)` },
  "laxxx-saturate": function(style, v) { style.filter += `  saturate(${v}%)` },
  "laxxx-grayscale": function(style, v) { style.filter += `  grayscale(${v}%)` },
}

let crazy = ""

for(var i=0;i<100;i++) {
  crazy += " " + (window.innerHeight*(i/100)) + " " + (Math.random() * 360) + ", "
}

laxxx.presets = {
  linger: (v) => {
    return { "laxxx-translate-y": `(vh*0.7) 0, 0 200, -500 0` }
  },
  lazy: (v=100) => {
    return { "laxxx-translate-y": `(vh) 0, (-elh) ${v}` }
  },
  eager: (v=100) => {
    return { "laxxx-translate-y": `(vh) 0, (-elh) -${v}` }
  },
  slalom: (v=50) => {
    return { "laxxx-translate-x": `vh ${v}, (vh*0.8) ${-v}, (vh*0.6) ${v}, (vh*0.4) ${-v}, (vh*0.2) ${v}, (vh*0) ${-v}, (-elh) ${v}` }
  },
  crazy: (v) => {
    return { "laxxx-hue-rotate": crazy }
  },
  spin: (v=360) => {
    return { "laxxx-rotate": `(vh) 0, (-elh) ${v}` }
  },
  spinRev: (v=360) => {
    return { "laxxx-rotate": `(vh) 0, (-elh) ${-v}` }
  },
  spinIn: (v=360) => {
    return { "laxxx-rotate": `vh ${v}, (vh*0.5) 0` }
  },
  spinOut: (v=360) => {
    return { "laxxx-rotate": `(vh*0.5) 0, -elh ${v}` }
  },
  blurInOut: (v=40) => {
    return { "laxxx-blur": `(vh) ${v}, (vh*0.8) 0, (vh*0.2) 0, 0 ${v}` }
  },
  blurIn: (v=40) => {
    return { "laxxx-blur": `(vh) ${v}, (vh*0.7) 0` }
  },
  blurOut: (v=40) => {
    return { "laxxx-blur": `(vh*0.3) 0, 0 ${v}` }
  },
  fadeInOut: () => {
    return { "laxxx-opacity": "(vh) 0, (vh*0.8) 1, (vh*0.2) 1, 0 0" }
  },
  fadeIn: () => {
    return { "laxxx-opacity": "(vh) 0, (vh*0.7) 1" }
  },
  fadeOut: () => {
    return { "laxxx-opacity": "(vh*0.3) 1, 0 0" }
  },
  driftLeft: (v=100) => {
    return { "laxxx-translate-x": `vh ${v}, -elh ${-v}` }
  },
  driftRight: (v=100) => {
    return { "laxxx-translate-x": `vh ${-v}, -elh ${v}` }
  },
  leftToRight: (v=1) => {
    return { "laxxx-translate-x": `vh 0, -elh (vw*${v})` }
  },
  rightToLeft: (v=1) => {
    return { "laxxx-translate-x": `vh 0, -elh (vw*${-v})` }
  },
  zoomInOut: (v=0.2) => {
    return { "laxxx-scale": `(vh) ${v}, (vh*0.8) 1, (vh*0.2) 1, -elh ${v}` }
  },
  zoomIn: (v=0.2) => {
    return { "laxxx-scale": `(vh) ${v}, (vh*0.7) 1` }
  },
  zoomOut: (v=0.2) => {
    return { "laxxx-scale": `(vh*0.3) 1, -elh ${v}` }
  },
}

laxxx.addPreset = (name, o) => {
  laxxx.presets[name] = o
}

function intrp(table, v) {
  var i = 0

  while(table[i][0] <= v && table[i+1] !== undefined) {
    i+=1
  }

  var x = table[i][0]
  var prevX = table[i-1] === undefined ? x : table[i-1][0]

  var y = table[i][1]
  var prevY = table[i-1] === undefined ? y : table[i-1][1]

  var xPoint = Math.min(Math.max((v-prevX)/(x-prevX),0),1)
  var yPoint = (xPoint*(y-prevY)) + prevY

  return yPoint
}

laxxx.setup = function(o) {
  laxxx.populateParallaxObjects()
}

laxxx.populateParallaxObjects = function() {
  var selector = Object.keys(transforms).map(t => `[${t}]`).join(",")
  selector += ",[laxxx-preset]"

  document.querySelectorAll(selector).forEach(function(el) {
    var o = {
      el: el,
      transforms: []
    }

    var presetNames = el.attributes["laxxx-preset"] && el.attributes["laxxx-preset"].value
    if(presetNames) {
      presetNames.split(" ").forEach((p) => {
        const bits = p.split("-")
        const fn = laxxx.presets[bits[0]]
        if(!fn) {
          console.error(`preset #{bits[0]} is not defined`)
        } else {
          const d = fn(bits[1])
          for(var k in d) {
            el.setAttribute(k, d[k])
          }
        }
      })

      el.setAttribute("laxxx-anchor", "self")
      el.attributes.removeNamedItem("laxxx-preset")
    }

    const optimise = !(el.attributes["laxxx-optimize"] && el.attributes["laxxx-optimize"].value == 'false')
    if(optimise) el.style["-webkit-backface-visibility"] = "hidden"
    if(el.attributes["laxxx-optimize"]) el.attributes.removeNamedItem("laxxx-optimize")

    for(var i=0; i<el.attributes.length; i++) {
      var a = el.attributes[i]
      var bits = a.name.split("-")
      if(bits[0] === "laxxx") {
        if(a.name === "laxxx-anchor") {
          o["laxxx-anchor"] = a.value === "self" ? el : document.querySelector(a.value)
          const rect = o["laxxx-anchor"].getBoundingClientRect()
          o["laxxx-anchor-top"] = Math.floor(rect.top) + window.scrollY
        } else {
          o.transforms[a.name] = a.value
            .replace(new RegExp('vw', 'g'), window.innerWidth)
            .replace(new RegExp('vh', 'g'), window.innerHeight)
            .replace(new RegExp('elh', 'g'), el.clientHeight)
            .replace(new RegExp('elw', 'g'), el.clientWidth)
            .replace(new RegExp('-vw', 'g'), -window.innerWidth)
            .replace(new RegExp('-vh', 'g'), -window.innerHeight)
            .replace(new RegExp('-elh', 'g'), -el.clientHeight)
            .replace(new RegExp('-elw', 'g'), -el.clientWidth).replace(/\s+/g," ")
            .split(",").map((x) => { 
              return x.trim().split(" ").map(y => {
                if(y[0] === "(") return eval(y)
                else return parseFloat(y)
              })
            }).sort((a,b) => {
              return a[0] - b[0]  
            })
        }
      }
    }

    parallaxObjects.push(o)
  })
}

var lastScroll = 0

laxxx.update = function(y) {
  var momentum = lastScroll-y
  lastScroll = y

  // console.log(momentum)

  parallaxObjects.forEach(function(o) {
    var transformString = ""
    var r = o["laxxx-anchor-top"] ? o["laxxx-anchor-top"]-y : y

    var style = {
      transform: "",
      filter: ""
    }

    for(var i in o.transforms) {
      var arr = o.transforms[i]
      var t = transforms[i]
      var v = intrp(arr, r)

      if(!t) {
        console.error("laxxx: " + i + " is not supported")
        return
      }

      t(style, v)
    }

    for(let k in style) {
      if(style.opacity === 0) { // if opacity 0 don't update
        o.el.style.opacity = 0 
      } else {
        o.el.style[k] = style[k]
      }
    }
  })
}

})()
