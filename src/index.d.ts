declare global {
    interface HTMLElement extends CustomElement {
    }
}
interface CustomElement {
    insertHTML: (value: string) => void;
    hide: () => void;
    show: () => void;
    addEvent: <K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any) => void;
}
declare function _(selector: string): HTMLElement | undefined;
declare module _ {
    function fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
    function isNull<T>(value: T): T extends null ? true : false;
    function isNil<T>(value: T): T extends null | undefined ? true : false;
    function isNumber<T>(value: T): T extends number ? true : false;
    function isFunction<T>(value: T): T extends Function ? true : false;
    function shuffle<T>(value: Array<T>): Array<T>;
    function pick<T extends Record<string, unknown>, K extends keyof T>(obj: T, keys?: Array<K>): Pick<T, K> | {};
    function omit<T extends Record<string, unknown>, K extends keyof T>(obj: T, keys?: Array<K>): Omit<T, K>;
    function debounce<Params extends unknown[]>(func: (...args: Params) => unknown, wait: number): (...args: Params) => unknown;
    function throttle<Params extends unknown[]>(func: (...args: Params) => unknown, wait: number): (...args: Params) => unknown;
    function clickOutside(elem: HTMLElement, func: Function): void;
}
export default _;
