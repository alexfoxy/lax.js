interface DriverOptions {
    inertiaEnabled?: boolean;
    frameStep?: number;
}
interface StyleObject {
}
declare type easingOptions = "easeInQuad" | "easeOutQuad" | "easeInOutQuad" | "easeInCubic" | "easeOutCubic" | "easeInOutCubic" | "easeInQuart" | "easeOutQuart" | "easeInOutQuart" | "easeInQuint" | "easeOutQuint" | "easeInOutQuint" | "easeOutBounce" | "easeInBounce" | "easeOutBack" | "easeInBack";
declare type specialValues = "screenWidth" | "screenHeight" | "pageWidth" | "pageHeight" | "elWidth" | "elHeight" | "elInY" | "elOutY" | "elCenterY" | "elInX" | "elOutX" | "elCenterX" | "index";
declare enum cssValues {
    "opacity" = 0,
    "scaleX" = 1,
    "scaleY" = 2,
    "scale" = 3,
    "skewX" = 4,
    "skewY" = 5,
    "skew" = 6,
    "rotateX" = 7,
    "rotateY" = 8,
    "rotate" = 9,
    "translateX" = 10,
    "translateY" = 11,
    "translateZ" = 12,
    "blur" = 13,
    "hue-rotate" = 14,
    "brightness" = 15
}
declare type cssMap = [
    Array<specialValues>,
    Array<number | specialValues> | {
        [key: number]: Array<number | specialValues>;
    }
];
interface AnimationOptions {
    modValue?: number;
    frameStep?: number;
    inertia?: number;
    inertiaMode?: "normal" | "absolute";
    cssUnit?: string;
    cssFn?(value: number, domElement: HTMLElement | Element): number | string;
    easing?: easingOptions;
}
interface ElementOptions {
    style?: StyleObject;
    onUpdate?(driverValues: any, domElement: HTMLElement | Element): void;
}
interface ElementTransforms {
    [key: string]: {
        [key in cssValues]: cssMap;
    };
}
//# sourceMappingURL=lax.d.ts.map