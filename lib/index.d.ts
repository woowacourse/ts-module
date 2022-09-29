import { DebouncedFunc, DebounceOptions } from "./utils";
interface CustomElement {
    element: HTMLElement | null;
    innerHTML: (template: string) => void;
    show: () => void;
    hide: () => void;
    addEvent: <T extends keyof HTMLElementEventMap>(eventType: T, callback: (...args: any) => void) => void;
}
declare function _(selector: string): CustomElement;
declare module _ {
    function isNull(value: unknown): value is null;
    function isNil(value: unknown): value is null | undefined;
    function isNumber(value: unknown): value is number;
    function isFunction(value: unknown): value is Function;
    function shuffle<T extends unknown>(array: T[]): T[];
    function pick<T>(object: T, target: string[]): T[] | {};
    function omit<T extends object, K extends keyof T>(object: T, target: K[]): Omit<T, K> | {};
    function memoize(func: Function, resolver?: Function): Function;
    function debounce<T extends (...args: any) => any>(func: T, wait: number, options?: DebounceOptions): DebouncedFunc<T>;
    function throttle<T extends (...args: any) => any>(func: T, wait: number, options?: Omit<DebounceOptions, "maxWait">): DebouncedFunc<T>;
    function clickOutside(eventTarget: HTMLElement, innerElement: HTMLElement): boolean;
}
export default _;
