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

(() => {
  const lax = (() => {
    const lax = {
      elements: []
    }

    let lastY = 0;
    let currentBreakpoint = 'default'
    const breakpointsSeparator = "_"

    const transformFns = {
      "data-lax-opacity": (style, v) => { style.opacity = v },
      "data-lax-translate": (style, v) => { style.transform += ` translate(${v}px, ${v}px)` },
      "data-lax-translate-x": (style, v) => { style.transform += ` translateX(${v}px)` },
      "data-lax-translate-y": (style, v) => { style.transform += ` translateY(${v}px)` },
      "data-lax-scale": (style, v) => { style.transform += ` scale(${v})` },
      "data-lax-scale-x": (style, v) => { style.transform += ` scaleX(${v})` },
      "data-lax-scale-y": (style, v) => { style.transform += ` scaleY(${v})` },
      "data-lax-skew": (style, v) => { style.transform += ` skew(${v}deg, ${v}deg)` },
      "data-lax-skew-x": (style, v) => { style.transform += ` skewX(${v}deg)` },
      "data-lax-skew-y": (style, v) => { style.transform += ` skewY(${v}deg)` },
      "data-lax-rotate": (style, v) => { style.transform += ` rotate(${v}deg)` },
      "data-lax-rotate-x": (style, v) => { style.transform += ` rotateX(${v}deg)` },
      "data-lax-rotate-y": (style, v) => { style.transform += ` rotateY(${v}deg)` },
      "data-lax-brightness": (style, v) => { style.filter += ` brightness(${v}%)` },
      "data-lax-contrast": (style, v) => { style.filter += ` contrast(${v}%)` },
      "data-lax-hue-rotate": (style, v) => { style.filter += ` hue-rotate(${v}deg)` },
      "data-lax-blur": (style, v) => { style.filter += ` blur(${v}px)` },
      "data-lax-invert": (style, v) => { style.filter += `  invert(${v}%)` },
      "data-lax-saturate": (style, v) => { style.filter += `  saturate(${v}%)` },
      "data-lax-grayscale": (style, v) => { style.filter += `  grayscale(${v}%)` },
      "data-lax-bg-pos": (style, v) => { style.backgroundPosition = `${v}px ${v}px` },
      "data-lax-bg-pos-x": (style, v) => { style.backgroundPositionX = `${v}px` },
      "data-lax-bg-pos-y": (style, v) => { style.backgroundPositionY = `${v}px` }
    }

    let crazy = ""

    for(let i=0;i<20;i++) {
      crazy += " " + i*5 + " " + (i*47)%360 + ", "
    }

    lax.presets = {
      linger: (v) => {
        return { "data-lax-translate-y": `(vh*0.7) 0, 0 200, -500 0` }
      },
      lazy: (v=100) => {
        return { "data-lax-translate-y": `(vh) 0, (-elh) ${v}` }
      },
      eager: (v=100) => {
        return { "data-lax-translate-y": `(vh) 0, (-elh) -${v}` }
      },
      slalom: (v=50) => {
        return { "data-lax-translate-x": `vh ${v}, (vh*0.8) ${-v}, (vh*0.6) ${v}, (vh*0.4) ${-v}, (vh*0.2) ${v}, (vh*0) ${-v}, (-elh) ${v}` }
      },
      crazy: (v) => {
        return { "data-lax-hue-rotate": `${crazy} | loop=20` }
      },
      spin: (v=360) => {
        return { "data-lax-rotate": `(vh) 0, (-elh) ${v}` }
      },
      spinRev: (v=360) => {
        return { "data-lax-rotate": `(vh) 0, (-elh) ${-v}` }
      },
      spinIn: (v=360) => {
        return { "data-lax-rotate": `vh ${v}, (vh*0.5) 0` }
      },
      spinOut: (v=360) => {
        return { "data-lax-rotate": `(vh*0.5) 0, -elh ${v}` }
      },
      blurInOut: (v=40) => {
        return { "data-lax-blur": `(vh) ${v}, (vh*0.8) 0, (vh*0.2) 0, 0 ${v}` }
      },
      blurIn: (v=40) => {
        return { "data-lax-blur": `(vh) ${v}, (vh*0.7) 0` }
      },
      blurOut: (v=40) => {
        return { "data-lax-blur": `(vh*0.3) 0, 0 ${v}` }
      },
      fadeInOut: () => {
        return { "data-lax-opacity": "(vh) 0, (vh*0.8) 1, (vh*0.2) 1, 0 0" }
      },
      fadeIn: () => {
        return { "data-lax-opacity": "(vh) 0, (vh*0.7) 1" }
      },
      fadeOut: () => {
        return { "data-lax-opacity": "(vh*0.3) 1, 0 0" }
      },
      driftLeft: (v=100) => {
        return { "data-lax-translate-x": `vh ${v}, -elh ${-v}` }
      },
      driftRight: (v=100) => {
        return { "data-lax-translate-x": `vh ${-v}, -elh ${v}` }
      },
      leftToRight: (v=1) => {
        return { "data-lax-translate-x": `vh 0, -elh (vw*${v})` }
      },
      rightToLeft: (v=1) => {
        return { "data-lax-translate-x": `vh 0, -elh (vw*${-v})` }
      },
      zoomInOut: (v=0.2) => {
        return { "data-lax-scale": `(vh) ${v}, (vh*0.8) 1, (vh*0.2) 1, -elh ${v}` }
      },
      zoomIn: (v=0.2) => {
        return { "data-lax-scale": `(vh) ${v}, (vh*0.7) 1` }
      },
      zoomOut: (v=0.2) => {
        return { "data-lax-scale": `(vh*0.3) 1, -elh ${v}` }
      },
      speedy: (v=30) => {
        return { "data-lax-skew-x": `(vh) ${v}, -elh ${-v}` }
      },
      swing: (v=30) => {
        return { "data-lax-skew-y": `(vh) ${v}, -elh ${-v}` }
      }
    }

    lax.addPreset = (p, o) => {
      lax.presets[p] = o
    }

    function intrp(t, v) {
      let i = 0

      while(t[i][0] <= v && t[i+1] !== undefined) {
        i+=1
      }

      const x = t[i][0]
      const prevX = t[i-1] === undefined ? x : t[i-1][0]

      const y = t[i][1]
      const prevY = t[i-1] === undefined ? y : t[i-1][1]

      const xPoint = Math.min(Math.max((v-prevX)/(x-prevX),0),1)
      const yPoint = (xPoint*(y-prevY)) + prevY

      return yPoint
    }

    function fnOrVal(s) {
      if(s[0] === "(") return eval(s)
      else return parseFloat(s)
    }

    lax.setup = (o={}) => {
      lax.breakpoints = o.breakpoints || {}
      
      lax.selector = o.selector || '.lax'
      lax.populateElements()
    }

    lax.removeElement = (el) => {
      const i = lax.elements.findIndex(o => o.el = el)
      if(i > -1) {
        lax.elements.splice(i, 1)
      }
    }

    lax.createLaxObject = (el) => {
      const o = {
        el: el,
        originalStyle: {
          transform: el.style.transform,
          filter: el.style.filter
        },
        transforms: {}
      }

      return o
    }

    lax.calcTransforms = (o) => {
      const { el } = o

      //find presets in data attributes
      const presets = []
      for(let i=0; i<el.attributes.length; i++) {
          const a = el.attributes[i]
          if(a.name.indexOf("data-lax-preset") > -1)  {
            presets.push(a);
          }
      }

      //unwrap presets into transformations
      for(let i=0; i<presets.length; i++) {
          const a = presets[i]
          const b = a.name.split(breakpointsSeparator)
          const breakpoint = b[1] ? `${breakpointsSeparator}${b[1]}` : ''
          a.value.split(" ").forEach((p) => {
              const bits = p.split("-")
              const fn = lax.presets[bits[0]]
              if(!fn) {
                  console.log(`lax error: preset ${bits[0]} is not defined`)
              } else {
                  const d = fn(bits[1])
                  for(let k in d) {
                      el.setAttribute(`${k}${breakpoint}`, d[k])
                  }
              }
          })
	  
          const currentAnchor = el.getAttribute("data-lax-anchor")
          if(!currentAnchor || currentAnchor === "") el.setAttribute("data-lax-anchor", "self")
          el.attributes.removeNamedItem(a.name)

      }

      // use gpu
      const useGpu = !(el.attributes["data-lax-use-gpu"] && el.attributes["data-lax-use-gpu"].value === 'false')
      if(useGpu) {
        el.style["backface-visibility"] = "hidden"
        el.style["-webkit-backface-visibility"] = "hidden"
      }
      if(el.attributes["data-lax-use-gpu"]) el.attributes.removeNamedItem("data-lax-use-gpu")

      // optmise off screen
      o.optimise = false 
      if(el.attributes["data-lax-optimize"] && el.attributes["data-lax-optimize"].value === 'true') {
        o.optimise = true
        const bounds = el.getBoundingClientRect()
        el.setAttribute("data-lax-opacity", `${-bounds.height-1} 0, ${-bounds.height} 1, ${window.innerHeight} 1, ${window.innerHeight+1} 0`)
        el.attributes.removeNamedItem("data-lax-optimize")
      }

      // build transform list
      for(let i=0; i<el.attributes.length; i++) {
        const a = el.attributes[i]
        if(a.name.indexOf("data-lax") < 0) continue

        const b = a.name.split(breakpointsSeparator)
        const bits = b[0].split("-")
        const breakpoint = b[1] || "default"
        if(bits[1] === "lax") {
          if(a.name === "data-lax-anchor") {
            o["data-lax-anchor"] = a.value === "self" ? el : document.querySelector(a.value)
            const rect = o["data-lax-anchor"].getBoundingClientRect()
            o.anchorTop = Math.floor(rect.top) + window.scrollY
          } else {
            const tString = a.value
              .replace(/vw/g, window.innerWidth)
              .replace(/vh/g, window.innerHeight)
              .replace(/elh/g, el.clientHeight)
              .replace(/elw/g, el.clientWidth)
              .replace(/\s+/g," ")

            const [arrString, optionString] = tString.split("|")
            const options = {}

            if(optionString) {
              optionString.split(" ").forEach((o) => {
                const [key, val] = o.split("=")
                options[key] = key && fnOrVal(val)
              }) 
            }

            const name = b[0]
            const valueMap = arrString.split(",").map((x) => { 
                return x.trim().split(" ").map(fnOrVal)
              }).sort((a,b) => {
                return a[0] - b[0]  
              })

            if(!o.transforms[name]) {
              o.transforms[name] = {}
            }
            
            o.transforms[name][breakpoint] = { valueMap, options } 
          }
        }
      }

      // sprite sheet animation
      const spriteData = el.attributes["data-lax-sprite-data"] && el.attributes["data-lax-sprite-data"].value
      if(spriteData) {
        o.spriteData = spriteData.split(",").map(x => parseInt(x))
        el.style.height = o.spriteData[1] + "px"
        el.style.width = o.spriteData[0] + "px"

        const spriteImage = el.attributes["data-lax-sprite-image"] && el.attributes["data-lax-sprite-image"].value
        if(spriteImage) {
          el.style.backgroundImage = `url(${spriteImage})`
        }
      }

      return o
    }

    lax.addElement = (el) => {
      const o = lax.calcTransforms(lax.createLaxObject(el))
      lax.elements.push(o)
      lax.updateElement(o)
    }

    lax.populateElements = () => {
      lax.elements = []
      document.querySelectorAll(lax.selector).forEach(lax.addElement)
      currentBreakpoint = lax.getCurrentBreakPoint()
    }

    lax.updateElements = () => {
      lax.elements.forEach((o) => {
        lax.calcTransforms(o)
        lax.updateElement(o)
      }) 

      currentBreakpoint = lax.getCurrentBreakPoint()
    }


    lax.getCurrentBreakPoint = () => {
      let b = 'default'
      const w = window.innerWidth

      for(let i in lax.breakpoints) {
        const px = parseFloat(lax.breakpoints[i])
        if(px <= w) {
          b = i
        } else {
          break
        }
      }

      return b
    }

    lax.updateElement = (o) => {
      const { originalStyle, anchorTop, transforms, spriteData, el } = o

      let r = anchorTop ? anchorTop-lastY : lastY

      const style = {
        transform: originalStyle.transform,
        filter: originalStyle.filter
      }

      for(let i in transforms) {
        const transformData = transforms[i][currentBreakpoint] || transforms[i]["default"]

        if(!transformData) {
          // console.log(`lax error: there is no setting for key ${i} and screen size ${currentBreakpoint}. Try adding a default value!`)
          continue
        }

        let _r = r
        if(transformData.options.offset) _r = _r+transformData.options.offset
        if(transformData.options.speed) _r = _r*transformData.options.speed
        if(transformData.options.loop) _r = _r%transformData.options.loop

        const t = transformFns[i]
        const v = intrp(transformData.valueMap, _r)

        if(!t) {
          // console.info(`lax: error ${i} is not supported`)
          continue
        }

        t(style, v)
      }

      if(spriteData) {
        const [frameW,frameH,numFrames,cols,scrollStep] = spriteData
        const frameNo = Math.floor(lastY/scrollStep) % numFrames
        const framePosX = frameNo%cols
        const framePosY = Math.floor(frameNo/cols)
        style.backgroundPosition = `-${framePosX*frameW}px -${framePosY*frameH}px`
      }

      if(style.opacity === 0) { // if opacity 0 don't update
        el.style.opacity = 0 
      } else {
        for(let k in style) {
          el.style[k] = style[k]
        }
      }
    }

    lax.update = (y) => {
      if(lastY === y) return
      lastY = y
      lax.elements.forEach(lax.updateElement)
    }

    return lax;
  })();

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = lax;
  else
    window.lax = lax;
})();
