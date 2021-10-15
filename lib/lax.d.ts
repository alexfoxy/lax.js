import { DriverOptions, LaxPresetFn, ElementOptions, DriverTransforms } from './types';
declare class Lax {
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
export declare const laxInstance: Lax;
declare const lax: {
    addElements: (selector: string, transforms: DriverTransforms, options?: ElementOptions) => void;
    removeElements: (selector: string) => void;
    removeElement: (domElement: HTMLElement | Element) => void;
    addElement: (domElement: HTMLElement | Element, transforms: DriverTransforms, options?: ElementOptions) => void;
    init: () => void;
    addDriver: (name: string, getValueFn: () => number, options?: DriverOptions) => void;
    removeDriver: (name: string) => void;
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
};
declare global {
    namespace NodeJS {
        interface Global {
            lax: typeof lax;
        }
    }
    interface Window {
        lax: typeof lax;
    }
}
export default lax;
export declare const addDriver: (name: string, getValueFn: () => number, options?: DriverOptions) => void, addElement: (domElement: HTMLElement | Element, transforms: DriverTransforms, options?: ElementOptions) => void, addElements: (selector: string, transforms: DriverTransforms, options?: ElementOptions) => void, removeDriver: (name: string) => void, removeElement: (domElement: HTMLElement | Element) => void, removeElements: (selector: string) => void, init: () => void, presets: {
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
//# sourceMappingURL=lax.d.ts.map