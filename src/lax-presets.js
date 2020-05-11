(() => {
  const elInOutY = (x) => {
    return ["elInBottom", `elCenterVert-${x}`, "elCenterVert", `elCenterVert+${x}`, "elOutTop"]
  }

  const elInOutX = (x) => {
    return ["elInRight", `elCenterHoriz-${x}`, "elCenterHoriz", `elCenterHoriz+${x}`, "elOutLeft"]
  }

  const axisToInOutMap = (axis) => {
    return axis === 'y' ? ["elInBottom", "elOutTop"] : ["elInRight", "elOutLeft"]
  }

  const speedToOffset = (speed, axis) => {
    const screenAxis = axis === "y" ? "screenHeight" : "screenWidth"
    let s = Math.max(Math.min(speed, 1), 0) / 2
    return `((${s}*${screenAxis}))`
  }

  const inOut = (key, s, e, speed, axis) => {
    const offset = speedToOffset(speed, axis)
    const arr1 = axis === 'y' ? elInOutY(offset) : elInOutX(offset)
    const arr2 = [s, e, e, e, s]

    return {
      [key]: [
        arr1,
        arr2,
        {
          easing: 'easeInOutQuad',
        }
      ],
    }
  }

  const presets = {
    fadeInOut: (v = 0.2, speed = 0.2, axis = 'y') => {
      return inOut('opacity', v, 1, speed, axis)
    },
    scaleInOut: (v = 0.2, speed = 0.2, axis = 'y') => {
      return inOut('scale', v, 1, speed, axis)
    },
    blurInOut: (v = 50, speed = 0.2, axis = 'y') => {
      return inOut('blur', v, 0, speed, axis)
    },
    panHorizontal: (v = 500, speed = 0.2, axis = 'y') => {
      return {
        translateX: [
          axisToInOutMap(axis),
          [0, v],
        ],
      }
    }

    // },
    // rightToLeft: {
    //   translateX: [
    //     ["elInBottom", "elOutTop"],
    //     [0, 'screenWidth+elWidth'],
    //   ],
    // },
    // LeftToRight: {
    //   translateX: [
    //     ["elInBottom", "elOutTop"],
    //     [0, '-screenWidth'],
    //   ],
    // }
  }

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = presets
  else
    window.laxPresets = presets
})()
