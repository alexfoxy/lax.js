export = laxInstance;
declare const laxInstance: {
    drivers: any[];
    elements: any[];
    frame: number;
    debug: boolean;
    windowWidth: number;
    windowHeight: number;
    presets: {
        fadeInOut: (y?: number, str?: number) => {
            opacity: (string[] | number[])[];
        };
        fadeIn: (y?: string, str?: number) => {
            opacity: (string[] | number[])[];
        };
        fadeOut: (y?: string, str?: number) => {
            opacity: (string[] | number[])[];
        };
        blurInOut: (y?: number, str?: number) => {
            blur: (string[] | number[])[];
        };
        blurIn: (y?: string, str?: number) => {
            blur: (string[] | number[])[];
        };
        blurOut: (y?: string, str?: number) => {
            opacity: (string[] | number[])[];
        };
        scaleInOut: (y?: number, str?: number) => {
            scale: (string[] | number[])[];
        };
        scaleIn: (y?: string, str?: number) => {
            scale: (string[] | number[])[];
        };
        scaleOut: (y?: string, str?: number) => {
            scale: (string[] | number[])[];
        };
        slideX: (y?: number, str?: number) => {
            translateX: (string | number)[][];
        };
        slideY: (y?: number, str?: number) => {
            translateY: (string | number)[][];
        };
        spin: (y?: number, str?: number) => {
            rotate: (number[] | {
                modValue: number;
            })[];
        };
        flipX: (y?: number, str?: number) => {
            rotateX: (number[] | {
                modValue: number;
            })[];
        };
        flipY: (y?: number, str?: number) => {
            rotateY: (number[] | {
                modValue: number;
            })[];
        };
        jiggle: (y?: number, str?: number) => {
            skewX: (number[] | {
                modValue: number;
            })[];
        };
        seesaw: (y?: number, str?: number) => {
            skewY: (number[] | {
                modValue: number;
            })[];
        };
        zigzag: (y?: number, str?: number) => {
            translateX: (number[] | {
                modValue: number;
            })[];
        };
        hueRotate: (y?: number, str?: number) => {
            "hue-rotate": (number[] | {
                modValue: number;
            })[];
        };
    };
    debugData: {
        frameLengths: any[];
    };
    init: () => void;
    onWindowResize: () => void;
    onAnimationFrame: (e: any) => void;
    addDriver: (name: any, getValueFn: any, options?: {}) => void;
    removeDriver: (name: any) => void;
    findAndAddElements: () => void;
    addElements: (selector: any, transforms: any, options?: {}) => void;
    removeElements: (selector: any) => void;
    addElement: (domElement: any, transforms: any, options: any) => void;
    removeElement: (domElement: any) => void;
};
