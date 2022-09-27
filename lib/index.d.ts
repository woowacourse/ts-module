import { Options } from "./constants";
declare function _(selector: string): {
    getElement: () => HTMLElement;
    innerHtml: (content?: string) => string;
    show: () => void;
    hide: () => void;
    addEvent: <T extends keyof GlobalEventHandlersEventMap>(type: T, listener: (e: GlobalEventHandlersEventMap[T]) => void) => void;
};
declare module _ {
    function fetch(url: string, options?: Options): Promise<unknown>;
    function isNull<T>(value: T): T extends null ? true : false;
    function isNil<T>(value: T): T extends null | undefined ? true : false;
    function isNumber<T>(value: T): T extends number ? true : false;
    function isFunction<T>(value: T): T extends Function ? true : false;
    function shuffle<T>(array: T[]): T[];
    function pick<T extends Record<string, unknown>, U extends keyof T>(object: T, selectedItems: U[]): Pick<T, U>;
    function omit<T extends Record<string, unknown>, U extends keyof T>(object: T, selectedItems: U[]): Omit<T, U>;
    function memoize<T extends unknown[], U extends unknown>(callback: (...args: T) => U, generateKeyFunction: (...args: T) => string): (...args: T) => U;
    function debounce<T extends unknown[]>(callback: (...args: T) => void, delay?: number): (...args: T) => void;
    function throttle<T extends unknown[]>(callback: (...args: T) => void, delay?: number): (...args: T) => void;
    function clickOutside(targetElement: HTMLElement, callback: (e: MouseEvent) => void): void;
}
export default _;
