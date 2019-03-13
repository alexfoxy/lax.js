// scrollform 

var laxx = {}
window.laxx = laxx

var parallaxObjects = []
// var prefix = "laxx"

const transforms = {
  "laxx-opacity": function(style, v) { style.opacity = v },
  "laxx-translate": function(style, v) { style.transform += ` translate(${v}px, ${v}px)` },
  "laxx-translate-x": function(style, v) { style.transform += ` translateX(${v}px)` },
  "laxx-translate-y": function(style, v) { style.transform += ` translateY(${v}px)` },
  "laxx-scale": function(style, v) { style.transform += ` scale(${v}` },
  "laxx-scale-x": function(style, v) { style.transform += ` scaleX(${v})` },
  "laxx-scale-y": function(style, v) { style.transform += ` scaleY(${v})` },
  "laxx-skew": function(style, v) { style.transform += ` skew(${v}deg, ${v}deg` },
  "laxx-skew-x": function(style, v) { style.transform += ` skewX(${v}deg)` },
  "laxx-skew-y": function(style, v) { style.transform += ` skewY(${v}deg)` },
  "laxx-rotate": function(style, v) { style.transform += ` rotate(${v}deg)` },

  "laxx-brightness": function(style, v) { style.filter += ` brightness(${v}%)` },
  "laxx-contrast": function(style, v) { style.filter += ` contrast(${v}%)` },
  "laxx-hue-rotate": function(style, v) { style.filter += ` hue-rotate(${v}deg)` },
  "laxx-blur": function(style, v) { style.filter += ` blur(${v}px)` },
  "laxx-invert": function(style, v) { style.filter += `  invert(${v}%)` },
  "laxx-saturate": function(style, v) { style.filter += `  saturate(${v}%)` },
  "laxx-grayscale": function(style, v) { style.filter += `  grayscale(${v}%)` },
}

let crazy = ""

for(var i=0;i<100;i++) {
  crazy += " " + -(window.innerHeight*((100-i)/100)) + " " + (Math.random() * 360)
}

laxx.presets = {
  linger: {
    "laxx-translate-y": `(-vh) -400, (-vh*0.8) -300, -300 -400`,
  },
  lazy: {
    "laxx-translate-y": `(-vh) 100, 0 -100`,
  },
  eager: {
    "laxx-translate-y": `(-vh) -100, 0 100`,
  },
  slalom: {
    "laxx-translate-x": "-vh 50, (-vh*0.8) -50, (-vh*0.6) 50, (-vh*0.4) -50, (-vh*0.2) 50, (-vh*0) -50, (vh*0.2) 50"
  },
  crazy: {
    "laxx-hue-rotate": crazy
  },
  spin: {
    "laxx-rotate": "(-vh) 0, (vh*0.1) 360"
  },
  spinIn: {
    "laxx-rotate": "(-vh*2) 1000, (-vh*0.5) 0"
  },
  spinOut: {
    "laxx-rotate": "(-vh*0.4) 0, (vh) 1000"
  },
  blurInOut: {
    "laxx-blur": "(-vh*0.8) 40, (-vh*0.6) 0, (-vh*0.15) 0, (vh*0.1) 40"
  },
  blurIn: {
    "laxx-blur": "(-vh*0.8) 40, (-vh*0.6) 0"
  },
  blurOut: {
    "laxx-blur": "(-vh*0.3) 0, 0 40"
  },
  fadeInOut: {
    "laxx-opacity": "(-vh*0.8) 0, (-vh*0.6) 1, (-vh*0.15) 1, (vh*0.1) 0"
  },
  fadeIn: {
    "laxx-opacity": "(-vh*0.8) 0, (-vh*0.6) 1"
  },
  fadeOut: {
    "laxx-opacity": "(-vh*0.3) 1, 0 0"
  },
  driftLeft: {
    "laxx-translate-x": "(-vh*0.8) 100, (vh*0.1) -100"
  },
  driftRight: {
    "laxx-translate-x": "(-vh*0.8) -100, (vh*0.1) 100"
  },
  slideLeft: {
    "laxx-translate-x": "(-vh*0.8) 1000, (vh*0.1) -1000"
  },
  slideRight: {
    "laxx-translate-x": "(-vh*0.8) -1000, (vh*0.1) 1000"
  },
  zoomInOut: {
    "laxx-scale": "(-vh*0.8) 0.5, (-vh*0.6) 1, (-vh*0.15) 1, (vh*0.1) 0.5"
  },
  zoomIn: {
    "laxx-scale": "(-vh*0.8) 0.5, (-vh*0.6) 1"
  },
  zoomOut: {
    "laxx-scale": "(-vh*0.4) 1, 100 0.5"
  }
}

laxx.addPreset = (name, o) => {
  laxx.presets[name] = o
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

laxx.setup = function(o) {
  laxx.populateParallaxObjects()
}

laxx.populateParallaxObjects = function() {
  var selector = Object.keys(transforms).map(t => `[${t}]`).join(",")
  selector += ",[laxx-preset]"

  document.querySelectorAll(selector).forEach(function(el) {
    var o = {
      el: el,
      transforms: []
    }

    var presetNames = el.attributes["laxx-preset"] && el.attributes["laxx-preset"].value
    if(presetNames) {
      presetNames.split(" ").forEach((p) => {
        const preset = laxx.presets[p]
        for(var k in preset) {
          el.setAttribute(k, preset[k])
        }
      })

      el.setAttribute("laxx-anchor", "self")
      el.attributes.removeNamedItem("laxx-preset")
    }

    for(var i=0; i<el.attributes.length; i++) {
      var a = el.attributes[i]
      var bits = a.name.split("-")
      if(bits[0] === "laxx") {
        if(a.name === "laxx-anchor") {
          o["laxx-anchor"] = a.value === "self" ? el : document.querySelector(a.value)
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

laxx.update = function(y) {
  var momentum = lastScroll-y
  lastScroll = y

  // console.log(momentum)

  parallaxObjects.forEach(function(o) {
    var transformString = ""
    var offsetTop = o["laxx-anchor"] ? o["laxx-anchor"].offsetTop : 0
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
        console.error("laxx: " + i + " is not supported")
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

