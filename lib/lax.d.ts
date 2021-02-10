declare module "types" {
    export interface DriverOptions {
        inertiaEnabled?: boolean;
        frameStep?: number;
    }
    export interface StyleObject {
        [key: string]: any;
    }
    export type LaxPresetName = "fadeIn" | "fadeOut" | "fadeInOut" | "scaleIn" | "scaleOut" | "scaleInOut" | "slideX" | "slideY" | "jiggle" | "seesaw" | "zigzag" | "hueRotate" | "spin" | "flipX" | "flipY" | "blurIn" | "blurOut" | "blurInOut";
    export type LaxPresetFn = (x: number | string, y: number | string) => LaxPresetStyleProps;
    export type easingOptions = "easeInQuad" | "easeOutQuad" | "easeInOutQuad" | "easeInCubic" | "easeOutCubic" | "easeInOutCubic" | "easeInQuart" | "easeOutQuart" | "easeInOutQuart" | "easeInQuint" | "easeOutQuint" | "easeInOutQuint" | "easeOutBounce" | "easeInBounce" | "easeOutBack" | "easeInBack";
    export type specialValues = "screenWidth" | "screenHeight" | "pageWidth" | "pageHeight" | "elWidth" | "elHeight" | "elInY" | "elOutY" | "elCenterY" | "elInX" | "elOutX" | "elCenterX" | "index";
    export enum cssValues {
        "opacity" = "opacity",
        "scaleX" = "scaleX",
        "scaleY" = "scaleY",
        "scale" = "scale",
        "skewX" = "skewX",
        "skewY" = "skewY",
        "skew" = "skew",
        "rotateX" = "rotateX",
        "rotateY" = "rotateY",
        "rotate" = "rotate",
        "translateX" = "translateX",
        "translateY" = "translateY",
        "translateZ" = "translateZ",
        "blur" = "blur",
        "hue-rotate" = "hue-rotate",
        "brightness" = "brightness"
    }
    export interface LaxStyleMapOptions {
        modValue?: number | undefined;
        frameStep?: number;
        inertia?: number;
        inertiaMode?: "normal" | "absolute";
        cssUnit?: string;
        cssFn?(value: number, domElement: HTMLElement | Element): number | string;
        easing?: easingOptions;
    }
    export type LaxStyleMap = [
        Array<number | specialValues | string>,
        Array<number | specialValues | string>,
        LaxStyleMapOptions?
    ];
    export interface LaxStyleProps extends LaxPresetStyleProps {
        "presets"?: Array<LaxPresetName>;
    }
    export interface LaxPresetStyleProps {
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
    }
    export interface ElementOptions {
        style?: StyleObject;
        onUpdate?(driverValues: any, domElement: HTMLElement | Element): void;
    }
    export interface DriverTransforms {
        [key: string]: LaxStyleProps | LaxPresetStyleProps;
    }
}
declare module "lax" {
    import { DriverOptions, LaxPresetFn, ElementOptions, DriverTransforms } from "types";
    class Lax {
        private drivers;
        private elements;
        private frame;
        private debug;
        windowWidth: number;
        windowHeight: number;
        presets: {
            fadeIn: LaxPresetFn;
            fadeOut: LaxPresetFn;
            fadeInOut: LaxPresetFn;
            scaleIn: LaxPresetFn;
            scaleOut: LaxPresetFn;
            scaleInOut: LaxPresetFn;
            slideX: LaxPresetFn;
            slideY: LaxPresetFn;
            jiggle: LaxPresetFn;
            seesaw: LaxPresetFn;
            zigzag: LaxPresetFn;
            hueRotate: LaxPresetFn;
            spin: LaxPresetFn;
            flipX: LaxPresetFn;
            flipY: LaxPresetFn;
            blurIn: LaxPresetFn;
            blurOut: LaxPresetFn;
            blurInOut: LaxPresetFn;
        };
        private debugData;
        init: () => void;
        onWindowResize: () => void;
        onAnimationFrame: (e: DOMHighResTimeStamp) => void;
        addDriver: (name: string, getValueFn: () => number, options?: DriverOptions) => void;
        removeDriver: (name: string) => void;
        findAndAddElements: () => void;
        addElements: (selector: string, transforms: DriverTransforms, options?: ElementOptions) => void;
        removeElements: (selector: string) => void;
        addElement: (domElement: HTMLElement | Element, transforms: DriverTransforms, options?: ElementOptions) => void;
        removeElement: (domElement: HTMLElement | Element) => void;
    }
    export const laxInstance: Lax;
    const lax: {
        addElements: (selector: string, transforms: DriverTransforms, options?: ElementOptions) => void;
        removeElements: (selector: string) => void;
        removeElement: (domElement: HTMLElement | Element) => void;
        addElement: (domElement: HTMLElement | Element, transforms: DriverTransforms, options?: ElementOptions) => void;
        init: () => void;
        addDriver: (name: string, getValueFn: () => number, options?: DriverOptions) => void;
        removeDriver: (name: string) => void;
    };
    global {
        namespace NodeJS {
            interface Global {
                lax: Partial<Lax>;
            }
        }
        interface Window {
            lax: Partial<Lax>;
        }
    }
    export default lax;
    export const addDriver: (name: string, getValueFn: () => number, options?: DriverOptions) => void, addElement: (domElement: HTMLElement | Element, transforms: DriverTransforms, options?: ElementOptions) => void, addElements: (selector: string, transforms: DriverTransforms, options?: ElementOptions) => void, removeDriver: (name: string) => void, removeElement: (domElement: HTMLElement | Element) => void, removeElements: (selector: string) => void, init: () => void;
}
//# sourceMappingURL=lax.d.ts.map