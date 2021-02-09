export interface DriverOptions{
  inertiaEnabled?: boolean
  frameStep?: number
}
export interface StyleObject {

}
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
"easeInBack";
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
"index";
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
  [key: string]: {
    [key in cssValues]?: Array<number | specialValues | string>[] | { [key: number]: Array<number | specialValues | string>}[]
  }
}
export namespace LaxElement {

}
export namespace LaxDriver {

}
