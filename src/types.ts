export interface DriverOptions{
  inertiaEnabled?: boolean
  frameStep?: number
}
export interface StyleObject {
  [key: string]: any
}
export type LaxPresetName = 
  "fadeIn" |
  "fadeOut" |
  "fadeInOut" |
  "scaleIn" |
  "scaleOut" |
  "scaleInOut" |
  "slideX" |
  "slideY" |
  "jiggle" |
  "seesaw" |
  "zigzag" |
  "hueRotate" |
  "spin" |
  "flipX" |
  "flipY" |
  "blurIn" |
  "blurOur" |
  "blurInOut"
;
const LaxPresetNames  = [
  "fadeIn" ,
  "fadeOut" ,
  "fadeInOut" ,
  "scaleIn" ,
  "scaleOut" ,
  "scaleInOut" ,
  "slideX" ,
  "slideY" ,
  "jiggle" ,
  "seesaw" ,
  "zigzag" ,
  "hueRotate" ,
  "spin" ,
  "flipX" ,
  "flipY" ,
  "blurIn" ,
  "blurOur" ,
  "blurInOut"
]
export const isPresetName = (presetName: string): presetName is LaxPresetName => LaxPresetNames.indexOf(presetName) !== -1 ? true : false;


export type easingOptions = 
  "easeInQuad" | 
  "easeOutQuad" | 
  "easeInOutQuad" | 
  "easeInCubic" |
  "easeOutCubic" | 
  "easeInOutCubic" | 
  "easeInQuart" | 
  "easeOutQuart" |
  "easeInOutQuart" | 
  "easeInQuint" | 
  "easeOutQuint" | 
  "easeInOutQuint" |
  "easeOutBounce" | 
  "easeInBounce" | 
  "easeOutBack" | 
  "easeInBack"
;
export type specialValues = 
  "screenWidth" | 
  "screenHeight" | 
  "pageWidth" | 
  "pageHeight" |
  "elWidth" | 
  "elHeight" | 
  "elInY" | 
  "elOutY" |
  "elCenterY" | 
  "elInX" | 
  "elOutX" | 
  "elCenterX" |
  "index"
;
export enum cssValues {
  "opacity"=`opacity`,
  "scaleX"="scaleX",
  "scaleY"="scaleY",
  "scale"="scale",
  "skewX"="skewX",
  "skewY"="skewY",
  "skew"="skew",
  "rotateX"="rotateX",
  "rotateY"="rotateY",
  "rotate"="rotate",
  "translateX"=`translateX`,
  "translateY"="translateY",
  "translateZ"="translateZ",
  "blur"="blur",
  "hue-rotate"="hue-rotate",
  "brightness"="brightness"
}
export interface LaxStyleMapOptions {
  modValue?: number
  frameStep?: number
  inertia?: number
  inertiaMode?: "normal" | "absolute"
  cssUnit?: string
  cssFn?(value: number, domElement: HTMLElement | Element): number | string
  easing?: easingOptions
}
export type LaxStyleMap = [
  Array<number | specialValues | string>,
  Array<number | specialValues | string>,
  LaxStyleMapOptions?
]
export interface LaxStyleProps {
  "opacity"?: LaxStyleMap;
  "scaleX"?: LaxStyleMap;
  "scaleY"?: LaxStyleMap;
  "scale"?: LaxStyleMap;
  "skewX"?: LaxStyleMap;
  "skewY"?: LaxStyleMap;
  "skew"?: LaxStyleMap;
  "rotateX"?: LaxStyleMap;
  "rotateY"?: LaxStyleMap;
  "rotate"?: LaxStyleMap;
  "translateX"?: LaxStyleMap;
  "translateY"?: LaxStyleMap;
  "translateZ"?: LaxStyleMap;
  "blur"?: LaxStyleMap;
  "hue-rotate"?: LaxStyleMap;
  "brightness"?: LaxStyleMap;

  "presets"?: Array<LaxPresetName>;
}


export interface AnimationOptions{
  modValue?: number
  frameStep?: number
  inertia?: number
  inertiaMode?: "normal" | "absolute"
  cssUnit?: string
  cssFn?(value: number, domElement: HTMLElement | Element): number | string
  easing?: easingOptions
}
export interface ElementOptions{
  style?: StyleObject
  onUpdate?(driverValues: any, domElement: HTMLElement | Element): void
}

export interface ElementTransforms {
  [key: string]: LaxStyleProps
}


