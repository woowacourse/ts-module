declare function _(selector: string): any;
declare module _ {
    function fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
    function isNull<T>(value: T): T extends null ? true : false;
    function isNil<T>(value: T): T extends null | undefined ? true : false;
    function isNumber<T>(value: T): T extends number ? true : false;
    function isFunction<T>(value: T): T extends Function ? true : false;
    function shuffle<T>(value: Array<T> | object): Array<T>;
    function pick<T, K extends keyof T>(obj: T, keys?: Array<K>): Pick<T, K>;
    function omit<T, K extends keyof T>(obj: T, keys?: Array<K>): Omit<T, K>;
    function memoize(func: Function, resolver?: Function): Function;
    interface DebounceOptionsType {
        leading?: boolean;
        maxWait?: number;
        trailing?: boolean;
    }
    function debounce(func: Function, wait?: number, options?: DebounceOptionsType): Function;
    interface ThrottleOptionsType {
        leading?: boolean;
        trailing?: boolean;
    }
    function throttle(func: Function, wait?: number, options?: ThrottleOptionsType): Function;
    function clickOutside(elem: HTMLElement, func: Function): void;
}
export default _;
