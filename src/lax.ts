import { DriverOptions, LaxPresetFn, ElementOptions, DriverTransforms, LaxPresetName, LaxStyleProps, LaxStyleMap, LaxPresetStyleProps } from './types'

const isPresetName = (presetName: string): presetName is LaxPresetName => [
  "fadeIn",
  "fadeOut",
  "fadeInOut",
  "scaleIn",
  "scaleOut",
  "scaleInOut",
  "slideX",
  "slideY",
  "jiggle",
  "seesaw",
  "zigzag",
  "hueRotate",
  "spin",
  "flipX",
  "flipY",
  "blurIn",
  "blurOut",
  "blurInOut"
].indexOf(presetName) !== -1 ? true : false

const inOutMap = (y: number | string = 30) => {
  return ["elInY+elHeight", `elCenterY-${y}`, "elCenterY", `elCenterY+${y}`, "elOutY-elHeight"]
}

const laxPresets: { [key in LaxPresetName]: LaxPresetFn } = {
  fadeInOut: (y = 30, str = 0) => ({
    "opacity": [
      inOutMap(y),
      [str, 1, 1, 1, str]
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
  spin: (y: number = 1000, str: number = 360) => ({
    "rotate": [
      [0, y],
      [0, str],
      {
        modValue: y,
      }
    ],
  }),
  flipX: (y: number = 1000, str: number = 360) => ({
    "rotateX": [
      [0, y],
      [0, str],
      {
        modValue: y
      }
    ],
  }),
  flipY: (y: number = 1000, str: number = 360) => ({
    "rotateY": [
      [0, y],
      [0, str],
      {
        modValue: y
      }
    ],
  }),
  jiggle: (y: number = 50, str: number = 40) => ({
    "skewX": [
      [0, y * 1, y * 2, y * 3, y * 4],
      [0, str, 0, -str, 0],
      {
        modValue: y * 4,
      }
    ],
  }),
  seesaw: (y: number = 50, str: number = 40) => ({
    "skewY": [
      [0, y * 1, y * 2, y * 3, y * 4],
      [0, str, 0, -str, 0],
      {
        modValue: y * 4,
      }
    ],
  }),
  zigzag: (y: number = 100, str: number = 100) => ({
    "translateX": [
      [0, y * 1, y * 2, y * 3, y * 4],
      [0, str, 0, -str, 0],
      {
        modValue: y * 4,
      }
    ],
  }),
  hueRotate: (y: number = 600, str: number = 360) => ({
    "hue-rotate": [
      [0, y],
      [0, str],
      {
        modValue: y,
      }
    ],
  }),
}
const transformKeys = ["perspective", "scaleX", "scaleY", "scale", "skewX", "skewY", "skew", "rotateX", "rotateY", "rotate"]
const filterKeys = ["blur", "hue-rotate", "brightness"]
const translate3dKeys = ["translateX", "translateY", "translateZ"]
const pxUnits = ["perspective", "border-radius", "blur", "translateX", "translateY", "translateZ"]
const degUnits = ["hue-rotate", "rotate", "rotateX", "rotateY", "skew", "skewX", "skewY"]

function getArrayValues(arr: Array<number>, windowWidth: number) {
  if (Array.isArray(arr)) return arr

  const keys = Object.keys(arr).map(x => parseInt(x)).sort((a, b) => a > b ? 1 : -1)

  let retKey = keys[keys.length - 1]
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (windowWidth < key) {
      retKey = key
      break
    }
  }

  return arr[retKey]
}

function lerp(start: number, end: number, t: number) {
  return start * (1 - t) + end * t
}

function invlerp(a: number, b: number, v: number) {
  return (v - a) / (b - a)
}

function interpolate(arrA: number[], arrB: number[], v: number, easingFn: (vector: any) => any) {
  let k = 0

  arrA.forEach((a: number) => {
    if (a < v) k++
  })

  if (k <= 0) {
    return arrB[0]
  }

  if (k >= arrA.length) {
    return arrB[arrA.length - 1]
  }

  const j = k - 1

  let vector = invlerp(arrA[j], arrA[k], v)
  if (easingFn) vector = easingFn(vector)
  const lerpVal = lerp(arrB[j], arrB[k], vector)
  return lerpVal
}

const easings = {
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => (--t) * t * t + 1,
  easeInOutCubic: (t: number) => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeInQuart: (t: number) => t * t * t * t,
  easeOutQuart: (t: number) => 1 - (--t) * t * t * t,
  easeInOutQuart: (t: number) => t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
  easeInQuint: (t: number) => t * t * t * t * t,
  easeOutQuint: (t: number) => 1 + (--t) * t * t * t * t,
  easeInOutQuint: (t: number) => t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t,
  easeOutBounce: (t: number) => {
    const n1 = 7.5625
    const d1 = 2.75

    if (t < 1 / d1) {
      return n1 * t * t
    } else if (t < 2 / d1) {
      return n1 * (t -= 1.5 / d1) * t + 0.75
    } else if (t < 2.5 / d1) {
      return n1 * (t -= 2.25 / d1) * t + 0.9375
    } else {
      return n1 * (t -= 2.625 / d1) * t + 0.984375
    }
  },
  easeInBounce: (t: number) => {
    return 1 - easings.easeOutBounce(1 - t)
  },
  easeOutBack: (t: number) => {
    const c1 = 1.70158
    const c3 = c1 + 1

    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
  },
  easeInBack: (t: number) => {
    const c1 = 1.70158
    const c3 = c1 + 1

    return c3 * t * t * t - c1 * t * t
  },
}

function flattenStyles(styles: Partial<{ [key in (keyof LaxStyleProps) | "transform" | "filter"]: number | string }>) {
  const flattenedStyles = {
    transform: '',
    filter: ''
  }

  const translate3dValues = {
    translateX: 0.00001,
    translateY: 0.00001,
    translateZ: 0.00001
  }

  Object.keys(styles).forEach((key: Partial<keyof LaxStyleProps>) => {
    const val = styles[key]
    const unit = pxUnits.includes(key) ? 'px' : (degUnits.includes(key) ? 'deg' : '')

    if (translate3dKeys.includes(key)) {
      translate3dValues[<keyof typeof translate3dValues>key] = <number>val // this was very annoying to get right but I think this should work properly
    } else if (transformKeys.includes(key)) {
      flattenedStyles.transform += `${key}(${val}${unit}) `
    } else if (filterKeys.includes(key)) {
      flattenedStyles.filter += `${key}(${val}${unit}) `
    } else {
      flattenedStyles[<keyof typeof flattenedStyles>key] = `${val}${unit} `
    }
  })

  flattenedStyles.transform = `translate3d(${translate3dValues.translateX}px, ${translate3dValues.translateY}px, ${translate3dValues.translateZ}px) ${flattenedStyles.transform}`

  return flattenedStyles
}

// https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY#Notes
function getScrollPosition() {
  const supportPageOffset = window.pageXOffset !== undefined
  const isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat')

  const x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft
  const y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop

  return [y, x]
}
type boxData = { width: number, height: number, x: number, y: number }
function parseValue(val: number | string, { width, height, x, y }: boxData, index: number) {
  if (typeof val === 'number') {
    return val
  }
  if (typeof val === 'string') {
    const pageHeight = document.body.scrollHeight
    const pageWidth = document.body.scrollWidth
    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight
    const [scrollTop, scrollLeft] = getScrollPosition()

    const left = x + scrollLeft
    const right = left + width
    const top = y + scrollTop
    const bottom = top + height

    return Function(`return ${val
      .replace(/screenWidth/g, String(screenWidth))
      .replace(/screenHeight/g, String(screenHeight))
      .replace(/pageHeight/g, String(pageHeight))
      .replace(/pageWidth/g, String(pageWidth))
      .replace(/elWidth/g, String(width))
      .replace(/elHeight/g, String(height))
      .replace(/elInY/g, String(top - screenHeight))
      .replace(/elOutY/g, String(bottom))
      .replace(/elCenterY/g, String(top + (height / 2) - (screenHeight / 2)))
      .replace(/elInX/g, String(left - screenWidth))
      .replace(/elOutX/g, String(right))
      .replace(/elCenterX/g, String(left + (width / 2) - (screenWidth / 2)))
      .replace(/index/g, String(index))
      }`)()
  }
}
class LaxDriver {
  getValueFn
  name = ''
  lastValue = 0
  frameStep = 1
  m1 = 0

  m2 = 0
  inertia = 0
  inertiaEnabled = false


  constructor(name: string, getValueFn: (frame?: number) => number, options: DriverOptions = {}) {
    this.name = name
    this.getValueFn = getValueFn

    this.inertiaEnabled = options.inertiaEnabled
    this.frameStep = options.frameStep

    this.lastValue = this.getValueFn(0)
  }

  getValue = (frame: number) => {
    let value = this.lastValue

    if (frame % this.frameStep === 0) {
      value = this.getValueFn(frame)
    }

    if (this.inertiaEnabled) {
      const delta = value - this.lastValue
      const damping = 0.8

      this.m1 = this.m1 * damping + delta * (1 - damping)
      this.m2 = this.m2 * damping + this.m1 * (1 - damping)
      this.inertia = Math.round(this.m2 * 5000) / 15000
    }

    this.lastValue = value
    return [this.lastValue, this.inertia]
  }
}

class LaxElement {
  domElement
  transformsData
  styles = {}
  selector = ''

  groupIndex = 0
  laxInstance

  onUpdate
  transforms: DriverTransforms

  constructor(selector: string, laxInstance: Lax, domElement: HTMLElement, transformsData: DriverTransforms, groupIndex = 0, options: ElementOptions = {}) {
    this.selector = selector
    this.laxInstance = laxInstance
    this.domElement = domElement
    this.transformsData = transformsData
    this.groupIndex = groupIndex

    const { style = {}, onUpdate } = options

    Object.keys(style).forEach(key => {
      domElement.style.setProperty(key, style[key])
    })

    if (onUpdate) this.onUpdate = onUpdate

    this.calculateTransforms()
  }

  update = (driverValues: { [key: string]: Array<number> }, frame: number) => {
    const { transforms } = this

    const styles: { [key in keyof LaxStyleProps]: string | number } = {}

    for (let driverName in transforms) {
      const styleBindings = transforms[driverName]

      if (!driverValues[driverName]) {
        console.error("No lax driver with name: ", driverName)
      }
      const [value, inertiaValue] = driverValues[driverName]
      let key: keyof LaxStyleProps
      for (key in styleBindings) {
        if (key !== "presets") {
          const [arr1, arr2, options = {}] = styleBindings[key]
          const { modValue, frameStep = 1, easing, inertia, inertiaMode, cssFn, cssUnit = '' } = options

          const easingFn = easings[easing]

          if (frame % frameStep === 0) {
            const v = modValue ? value % modValue : value

            let interpolatedValue = interpolate(<number[]>arr1, <number[]>arr2, v, easingFn) // because this function is only used internally, this casting is valid

            if (inertia) {
              let inertiaExtra = inertiaValue * inertia
              if (inertiaMode === 'absolute') inertiaExtra = Math.abs((inertiaExtra))
              interpolatedValue += inertiaExtra
            }

            const unit = cssUnit || pxUnits.includes(key) ? 'px' : (degUnits.includes(key) ? 'deg' : '')
            const dp = unit === 'px' ? 0 : 3
            const val = unit === 'px' ? Number.parseFloat(interpolatedValue.toFixed(dp)) : interpolatedValue
            styles[key] = cssFn ? cssFn(val, this.domElement) : val + cssUnit
          }
        }

      }
    }

    this.applyStyles(styles)
    if (this.onUpdate) this.onUpdate(driverValues, this.domElement)
  }

  calculateTransforms = () => {
    this.transforms = {}
    const windowWidth = this.laxInstance.windowWidth
    let driverName: keyof DriverTransforms
    for (driverName in this.transformsData) {
      let styleBindings: LaxStyleProps = this.transformsData[driverName]

      const parsedStyleBindings: { [key in keyof LaxStyleProps]: LaxStyleMap } = {}

      const { presets = <Array<string>>[] } = styleBindings

      presets.forEach((presetString) => {

        const [presetName, y, str] = presetString.split(":")

        const presetFn: LaxPresetFn = window["lax"].presets[<keyof LaxPresetFn>presetName]

        if (!presetFn) {
          console.error("Lax preset cannot be found with name: ", presetName)
        } else {
          const preset = presetFn(y, str)

          Object.keys(preset).forEach((key: keyof LaxPresetStyleProps) => {
            styleBindings[key] = preset[key]
          })
        }
      })

      delete styleBindings.presets
      let key: keyof LaxStyleProps
      for (key in styleBindings) {
        if (key !== "presets") { // should always be true in here, but typescript wants to be 100% sure
          let [arr1 = [-1e9, 1e9], arr2 = [-1e9, 1e9], options = {}] = styleBindings[key]

          const saveTransform = this.domElement.style.transform
          this.domElement.style.removeProperty("transform")
          const bounds = this.domElement.getBoundingClientRect()
          this.domElement.style.transform = saveTransform

          const parsedArr1 = getArrayValues(<Array<number>>arr1, windowWidth).map(i => parseValue(i, bounds, this.groupIndex)) // should always work here
          const parsedArr2 = getArrayValues(<Array<number>>arr2, windowWidth).map(i => parseValue(i, bounds, this.groupIndex)) // should always work here

          parsedStyleBindings[key] = [parsedArr1, parsedArr2, options]
        }
      }
      this.transforms[driverName] = parsedStyleBindings
    }
  }

  applyStyles = (styles: { [key in keyof LaxStyleProps]: number | string }) => {
    const mergedStyles = flattenStyles(styles)

    Object.keys(mergedStyles).forEach((key: "transform" | "filter") => {
      this.domElement.style.setProperty(key, mergedStyles[key])
    })
  }
}
class Lax {
  private drivers = <LaxDriver[]>[]
  private elements: Array<LaxElement> = []
  private frame = 0

  private debug = false

  windowWidth = 0
  windowHeight = 0
  presets = laxPresets

  private debugData = {
    frameLengths: <Array<number>>[],
    frameStart: 0
  }

  init = () => {
    this.findAndAddElements()

    window.requestAnimationFrame(this.onAnimationFrame)
    this.windowWidth = document.body.clientWidth
    this.windowHeight = document.body.clientHeight

    window.onresize = this.onWindowResize
  }

  onWindowResize = () => {
    const changed = document.body.clientWidth !== this.windowWidth ||
      document.body.clientHeight !== this.windowHeight

    if (changed) {
      this.windowWidth = document.body.clientWidth
      this.windowHeight = document.body.clientHeight
      this.elements.forEach(el => el.calculateTransforms())
    }
  }

  onAnimationFrame = (e: DOMHighResTimeStamp) => {
    if (this.debug) {
      this.debugData["frameStart"] = Date.now()
    }

    const driverValues: { [key: string]: Array<number> } = {}

    this.drivers.forEach((driver) => {
      driverValues[driver.name] = driver.getValue(this.frame)
    })

    this.elements.forEach((element) => {
      element.update(driverValues, this.frame)
    })

    if (this.debug) {
      this.debugData.frameLengths.push(Date.now() - this.debugData["frameStart"])
    }

    if (this.frame % 60 === 0 && this.debug) {
      const averageFrameTime = Math.ceil((this.debugData.frameLengths.reduce((a, b) => a + b, 0) / 60))
      console.log(`Average frame calculation time: ${averageFrameTime}ms`)
      this.debugData.frameLengths = []
    }

    this.frame++

    window.requestAnimationFrame(this.onAnimationFrame)
  }

  addDriver = (name: string, getValueFn: () => number, options: DriverOptions = {}) => {
    this.drivers.push(
      new LaxDriver(name, getValueFn, options)
    )
  }

  removeDriver = (name: string) => {
    this.drivers = this.drivers.filter(driver => driver.name !== name)
  }

  findAndAddElements = () => {
    this.elements = []
    const elements = document.querySelectorAll(".lax")

    elements.forEach((domElement: HTMLElement | Element) => {
      const driverName = "scrollY"
      const presets: Array<LaxPresetName> = []

      domElement.classList.forEach((className) => {
        if (className.includes("lax_preset")) {
          const preset = className.replace("lax_preset_", "")
          if (isPresetName(preset))
            presets.push(preset)
        }
      })

      const transforms = {
        [driverName]: {
          presets
        }
      }

      this.elements.push(new LaxElement('.lax', this, <HTMLElement>domElement, transforms, 0))
    })
  }

  addElements = (selector: string, transforms: DriverTransforms, options?: ElementOptions) => {
    const domElements = options.domElements || document.querySelectorAll(selector)

    domElements.forEach((domElement, i) => {
      this.elements.push(new LaxElement(selector, this, <HTMLElement>domElement, transforms, i, options))
    })
  }

  removeElements = (selector: string) => {
    this.elements = this.elements.filter(element => element.selector !== selector)
  }

  addElement = (domElement: HTMLElement | Element, transforms: DriverTransforms, options?: ElementOptions) => {
    this.elements.push(new LaxElement('', this, <HTMLElement>domElement, transforms, 0, options))
  }

  removeElement = (domElement: HTMLElement | Element) => {
    this.elements = this.elements.filter(element => element.domElement !== domElement)
  }
}

export const laxInstance = new Lax()
const lax = {
  addElements: laxInstance.addElements,
  removeElements: laxInstance.removeElements,
  removeElement: laxInstance.removeElement,
  addElement: laxInstance.addElement,
  init: laxInstance.init,
  addDriver: laxInstance.addDriver,
  removeDriver: laxInstance.removeDriver,
  presets: laxInstance.presets,
}
// needed because window, and global don't have lax on them initially

declare global {
  namespace NodeJS {
    interface Global {
      lax: typeof lax
    }
  }
  interface Window {
    lax: typeof lax
  }
};

(() => {
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = lax
  else if (window)
    window.lax = lax
  else if (global)
    global["lax"] = lax
})()

export default lax
export const { addDriver, addElement, addElements, removeDriver, removeElement, removeElements, init, presets } = lax