// scrollform 

var laxxx = {}
window.laxxx = laxxx

var parallaxObjects = []
// var prefix = "laxxx"

const transforms = {
  "laxxx-opacity": function(style, v) { style.opacity = v },
  "laxxx-translate": function(style, v) { style.transform += ` translate(${v}px, ${v}px)` },
  "laxxx-translate-x": function(style, v) { style.transform += ` translateX(${v}px)` },
  "laxxx-translate-y": function(style, v) { style.transform += ` translateY(${v}px)` },
  "laxxx-scale": function(style, v) { style.transform += ` scale(${v}` },
  "laxxx-scale-x": function(style, v) { style.transform += ` scaleX(${v})` },
  "laxxx-scale-y": function(style, v) { style.transform += ` scaleY(${v})` },
  "laxxx-skew": function(style, v) { style.transform += ` skew(${v}deg, ${v}deg` },
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
  crazy += " " + -(window.innerHeight*((100-i)/100)) + " " + (Math.random() * 360)
}

laxxx.presets = {
  linger: {
    "laxxx-translate-y": `(-vh) -400, (-vh*0.8) -300, -300 -400`,
  },
  lazy: {
    "laxxx-translate-y": `(-vh) 100, 0 -100`,
  },
  eager: {
    "laxxx-translate-y": `(-vh) -100, 0 100`,
  },
  slalom: {
    "laxxx-translate-x": "-vh 50, (-vh*0.8) -50, (-vh*0.6) 50, (-vh*0.4) -50, (-vh*0.2) 50, (-vh*0) -50, (vh*0.2) 50"
  },
  crazy: {
    "laxxx-hue-rotate": crazy
  },
  spin: {
    "laxxx-rotate": "(-vh) 0, (vh*0.1) 360"
  },
  spinIn: {
    "laxxx-rotate": "(-vh*2) 1000, (-vh*0.5) 0"
  },
  spinOut: {
    "laxxx-rotate": "(-vh*0.4) 0, (vh) 1000"
  },
  blurInOut: {
    "laxxx-blur": "(-vh*0.8) 40, (-vh*0.6) 0, (-vh*0.15) 0, (vh*0.1) 40"
  },
  blurIn: {
    "laxxx-blur": "(-vh*0.8) 40, (-vh*0.6) 0"
  },
  blurOut: {
    "laxxx-blur": "(-vh*0.3) 0, 0 40"
  },
  fadeInOut: {
    "laxxx-opacity": "(-vh*0.8) 0, (-vh*0.6) 1, (-vh*0.15) 1, (vh*0.1) 0"
  },
  fadeIn: {
    "laxxx-opacity": "(-vh*0.8) 0, (-vh*0.6) 1"
  },
  fadeOut: {
    "laxxx-opacity": "(-vh*0.3) 1, 0 0"
  },
  driftLeft: {
    "laxxx-translate-x": "(-vh*0.8) 100, (vh*0.1) -100"
  },
  driftRight: {
    "laxxx-translate-x": "(-vh*0.8) -100, (vh*0.1) 100"
  },
  slideLeft: {
    "laxxx-translate-x": "(-vh*0.8) 1000, (vh*0.1) -1000"
  },
  slideRight: {
    "laxxx-translate-x": "(-vh*0.8) -1000, (vh*0.1) 1000"
  },
  zoomInOut: {
    "laxxx-scale": "(-vh*0.8) 0.5, (-vh*0.6) 1, (-vh*0.15) 1, (vh*0.1) 0.5"
  },
  zoomIn: {
    "laxxx-scale": "(-vh*0.8) 0.5, (-vh*0.6) 1"
  },
  zoomOut: {
    "laxxx-scale": "(-vh*0.4) 1, 100 0.5"
  }
}

laxxx.addPreset = (name, o) => {
  laxxx.presets[name] = o
}

function intrp(table, v) {
  var i = 0

  while(table[i] !== undefined && table[i] <= v && table[i+2] !== undefined) {
    i+=2
  }

  var x2 = table[i]
  var x1 = table[i-2] === undefined ? x2 : table[i-2]
  
  var y2 = table[i+1] 
  var y1 = table[i-1] === undefined ? y2 : table[i-1]

  var xPoint = Math.min(Math.max((v-x1)/(x2-x1),0),1)
  var yPoint = (xPoint*(y2-y1)) + y1

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
        const preset = laxxx.presets[p]
        for(var k in preset) {
          el.setAttribute(k, preset[k])
        }
      })

      el.setAttribute("laxxx-anchor", "self")
      el.attributes.removeNamedItem("laxxx-preset")
    }

    for(var i=0; i<el.attributes.length; i++) {
      var a = el.attributes[i]
      var bits = a.name.split("-")
      if(bits[0] === "laxxx") {
        if(a.name === "laxxx-anchor") {
          o["laxxx-anchor"] = a.value === "self" ? el : document.querySelector(a.value)
        } else {
          o.transforms[a.name] = a.value
            .replace(","," ")
            .replace(/\s+/g," ")
            .trim()
            .replace(new RegExp('vw', 'g'), window.innerWidth)
            .replace(new RegExp('vh', 'g'), window.innerHeight)
            .replace(new RegExp('elh', 'g'), el.clientHeight)
            .replace(new RegExp('elw', 'g'), el.clientWidth)
            .replace(new RegExp('-vw', 'g'), -window.innerWidth)
            .replace(new RegExp('-vh', 'g'), -window.innerHeight)
            .replace(new RegExp('-elh', 'g'), -el.clientHeight)
            .replace(new RegExp('-elw', 'g'), -el.clientWidth)
            .split(" ").map((x) => {
            if(x[0] === "(") return eval(x)
            else return parseFloat(x)
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
    var offsetTop = o["laxxx-anchor"] ? o["laxxx-anchor"].offsetTop : 0
    var r = y-offsetTop

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

    for(k in style) {
      if(style.opacity === 0) { // if opacity 0 don't update
        o.el.style.opacity = 0 
      } else {
        o.el.style[k] = style[k]
      }
    }
  })
}

