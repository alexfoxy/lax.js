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