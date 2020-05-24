(() => {
  const elInOutY = (x) => {
    return ["elInY", `elCenterY-${x}`, "elCenterY", `elCenterY+${x}`, "elOutY"]
  }

  const elInOutX = (x) => {
    return ["elInX", `elCenterX-${x}`, "elCenterX", `elCenterX+${x}`, "elOutX"]
  }

  const axisToInOutMap = (axis) => {
    return axis === 'y' ? ["elInY", "elOutY"] : ["elInX", "elOutX"]
  }

  const speedToOffset = (speed, axis) => {
    const screenAxis = axis === "y" ? "screenHeight" : "screenWidth"
    let s = Math.max(Math.min(speed, 1), 0) / 2
    return `((${s}*${screenAxis}))`
  }

  const inOutHelper = (key, s, e, speed, axis, [sliceStart, sliceEnd]) => {
    const offset = speedToOffset(speed, axis)
    const arr1 = axis === 'y' ? elInOutY(offset) : elInOutX(offset)
    const arr2 = [s, e, e, e, s]

    return {
      [key]: [
        arr1.slice(sliceStart, sliceEnd),
        arr2.slice(sliceStart, sliceEnd),
        {
          easing: 'easeInOutQuad',
        }
      ],
    }
  }

  const presets = {
    // Fade
    fadeIn: (v = 0, speed = 0.2, axis = 'y') => {
      return inOutHelper('opacity', v, 1, speed, axis, [0, 3])
    },
    fadeOut: (v = 0, speed = 0.2, axis = 'y') => {
      return inOutHelper('opacity', v, 1, speed, axis, [3, 5])
    },
    fadeInOut: (v = 0, speed = 0.2, axis = 'y') => {
      return inOutHelper('opacity', v, 1, speed, axis, [0, 5])
    },

    // Scale
    scaleIn: (v = 0.2, speed = 0.2, axis = 'y') => {
      return inOutHelper('scale', v, 1, speed, axis, [0, 3])
    },
    scaleOut: (v = 0.2, speed = 0.2, axis = 'y') => {
      return inOutHelper('scale', v, 1, speed, axis, [3, 5])
    },
    scaleInOut: (v = 0.2, speed = 0.2, axis = 'y') => {
      return inOutHelper('scale', v, 1, speed, axis, [0, 5])
    },

    // Blur
    blurIn: (v = 50, speed = 0.2, axis = 'y') => {
      return inOutHelper('blur', v, 0, speed, axis, [0, 3])
    },
    blurOut: (v = 50, speed = 0.2, axis = 'y') => {
      return inOutHelper('blur', v, 0, speed, axis, [3, 5])
    },
    blurInOut: (v = 50, speed = 0.2, axis = 'y') => {
      return inOutHelper('blur', v, 0, speed, axis, [0, 5])
    },

    // Rotate 
    spin: (v = 500) => {
      return {
        rotate: [
          [0, v],
          [0, 360],
          {
            modValue: v
          }
        ],
      }
    },

    // Skew
    lightspeed: (v = 20, speed = 0.5, axis = 'y') => {
      const offset = speedToOffset(speed, axis)
      const arr1 = axis === 'y' ? elInOutY(offset) : elInOutX(offset)

      return {
        skewX: [
          arr1,
          [-v, -v, 0, v, v],
          {
            easing: 'easeInOutQuad',
          }
        ],
      }
    },

    panHorizontal: (v = 500, speed = 0.2, axis = 'y') => {
      return {
        translateX: [
          axisToInOutMap(axis),
          [0, v],
        ],
      }
    },
    panVertical: (v = 500, speed = 0.2, axis = 'y') => {
      return {
        translateY: [
          axisToInOutMap(axis),
          [0, v],
        ],
      }
    }
  }

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = presets
  else
    window.laxPresets = presets
})()
