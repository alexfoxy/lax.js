(() => {
  const inOutMap = (y = 30) => {
    return ["elInY+elHeight", `elCenterY-${y}`, "elCenterY", `elCenterY+${y}`, "elOutY-elHeight"]
  }

  const laxPresets = {
    fadeInOut: (y = 30, str = 0) => ({
      "opacity": [
        inOutMap(y),
        [str, 1, 1, 1, str],
      ],
    }),
    fadeIn: (y = 'elCenterY', str = 0) => ({
      "opacity": [
        ["elInY+elHeight", y],
        [str, 1],
      ],
    }),
    fadeOut: (y = 'elCenterY', str = 0) => ({
      "opacity": [
        [y, "elOutY-elHeight"],
        [1, str],
      ],
    }),
    blurInOut: (y = 100, str = 20) => ({
      "blur": [
        inOutMap(y),
        [str, 0, 0, 0, str],
      ],
    }),
    blurIn: (y = 'elCenterY', str = 20) => ({
      "blur": [
        ["elInY+elHeight", y],
        [str, 0],
      ],
    }),
    blurOut: (y = 'elCenterY', str = 20) => ({
      "opacity": [
        [y, "elOutY-elHeight"],
        [0, str],
      ],
    }),
    scaleInOut: (y = 100, str = 0.6) => ({
      "scale": [
        inOutMap(y),
        [str, 1, 1, 1, str],
      ],
    }),
    scaleIn: (y = 'elCenterY', str = 0.6) => ({
      "scale": [
        ["elInY+elHeight", y],
        [str, 1],
      ],
    }),
    scaleOut: (y = 'elCenterY', str = 0.6) => ({
      "scale": [
        [y, "elOutY-elHeight"],
        [1, str],
      ],
    }),
    slideX: (y = 0, str = 500) => ({
      "translateX": [
        ['elInY', y],
        [0, str],
      ],
    }),
    slideY: (y = 0, str = 500) => ({
      "translateY": [
        ['elInY', y],
        [0, str],
      ],
    }),
    spin: (y = 1000, str = 360) => ({
      "rotate": [
        [0, y],
        [0, str],
        {
          modValue: y,
        }
      ],
    }),
    flipX: (y = 1000, str = 360) => ({
      "rotateX": [
        [0, y],
        [0, str],
        {
          modValue: y
        }
      ],
    }),
    flipY: (y = 1000, str = 360) => ({
      "rotateY": [
        [0, y],
        [0, str],
        {
          modValue: y
        }
      ],
    }),
    jiggle: (y = 50, str = 40) => ({
      "skewX": [
        [0, y * 1, y * 2, y * 3, y * 4],
        [0, str, 0, -str, 0],
        {
          modValue: y * 4
        }
      ],
    }),
    seesaw: (y = 50, str = 40) => ({
      "skewY": [
        [0, y * 1, y * 2, y * 3, y * 4],
        [0, str, 0, -str, 0],
        {
          modValue: y * 4,
        }
      ],
    }),
    zigzag: (y = 100, str = 100) => ({
      "translateX": [
        [0, y * 1, y * 2, y * 3, y * 4],
        [0, str, 0, -str, 0],
        {
          modValue: y * 4,
        }
      ],
    }),
    hueRotate: (y = 600, str = 360) => ({
      "hue-rotate": [
        [0, y],
        [0, str],
        {
          modValue: y,
        }
      ],
    }),
  }

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = laxPresets;
  else
    window.laxPresets = laxPresets;
})()