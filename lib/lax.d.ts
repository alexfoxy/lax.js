interface DriverOptions {
    inertiaEnabled?: boolean;
    frameStep?: number;
}
interface StyleObject {
}
declare type specialValues = "screenWidth" | "screenHeight" | "pageWidth" | "pageHeight" | "elWidth" | "elHeight" | "elInY" | "elOutY" | "elCenterY" | "elInX" | "elOutX" | "elCenterX" | "index";
declare enum cssValues {
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
interface ElementOptions {
    style?: StyleObject;
    onUpdate?(driverValues: any, domElement: HTMLElement | Element): void;
}
interface ElementTransforms {
    [key: string]: {
        [key in cssValues]?: Array<number | specialValues | string>[] | {
            [key: number]: Array<number | specialValues | string>;
        }[];
    };
}
declare class Lax {
    private drivers;
    private elements;
    private frame;
    private debug;
    private windowWidth;
    private windowHeight;
    private presets;
    private debugData;
    init: () => void;
    onWindowResize: () => void;
    onAnimationFrame: (e: any) => void;
    addDriver: (name: string, getValueFn: () => number, options?: DriverOptions) => void;
    removeDriver: (name: string) => void;
    findAndAddElements: () => void;
    addElements: (selector: string, transforms: ElementTransforms, options?: ElementOptions) => void;
    removeElements: (selector: string) => void;
    addElement: (domElement: HTMLElement | Element, transforms: ElementTransforms, options?: ElementOptions) => void;
    removeElement: (domElement: HTMLElement | Element) => void;
}
export declare const laxInstance: Lax;
declare const lax: {
    addElements: (selector: string, transforms: ElementTransforms, options?: ElementOptions) => void;
    removeElements: (selector: string) => void;
    removeElement: (domElement: HTMLElement | Element) => void;
    addElement: (domElement: HTMLElement | Element, transforms: ElementTransforms, options?: ElementOptions) => void;
    init: () => void;
    addDriver: (name: string, getValueFn: () => number, options?: DriverOptions) => void;
    removeDriver: (name: string) => void;
};
export default lax;
export declare const addDriver: (name: string, getValueFn: () => number, options?: DriverOptions) => void, addElement: (domElement: HTMLElement | Element, transforms: ElementTransforms, options?: ElementOptions) => void, addElements: (selector: string, transforms: ElementTransforms, options?: ElementOptions) => void, removeDriver: (name: string) => void, removeElement: (domElement: HTMLElement | Element) => void, removeElements: (selector: string) => void, init: () => void;
//# sourceMappingURL=lax.d.ts.map