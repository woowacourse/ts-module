declare function _(selector: string): Node;
declare global {
    interface Node {
        setInnerHTML(value: string): void;
        setShow(): void;
        setHidden(): void;
        addEvent<K extends keyof HTMLElementEventMap, U extends unknown>(type: K, listener: (event: HTMLElementEventMap[K]) => U, options?: boolean | AddEventListenerOptions): void;
    }
}
declare module _ {
    function fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
    function isNull<T extends unknown>(value: T): T extends null ? true : false;
    function isNil<T extends unknown>(value: T): T extends undefined | null ? true : false;
    function isNumber<T extends unknown>(value: T): T extends number ? true : false;
    function isFunction<T extends unknown>(value: T): T extends Function ? true : false;
    function shuffle<T>(array: T[]): T[];
    type PickType<T, U extends readonly (keyof T)[]> = {
        [K in U[number]]: T[K];
    };
    function pick<T extends Record<string, unknown>, U extends (keyof T)[]>(object: T, paths: U): PickType<T, U>;
    type OmitType<T, U extends readonly (keyof T)[]> = {
        [K in keyof Omit<T, U[number]>]: T[K];
    };
    function omit<T extends Record<string, unknown>, U extends (keyof T)[]>(object: T, paths: U): OmitType<T, U>;
    function memoize<T extends unknown[], U extends unknown>(func: (...args: T) => U, resolver?: (...args: T) => string): (...args: T) => U;
    type DebounceOptionsType = {
        leading?: boolean;
        maxWait?: number;
        trailing?: boolean;
    };
    function debounce<T extends unknown[], U extends unknown>(func: (...args: T) => U, wait?: number, options?: DebounceOptionsType): (...args: T) => void;
    type ThrottleOptionsType = Omit<DebounceOptionsType, "maxWait">;
    function throttle<T extends unknown[], U extends unknown>(func: (...args: T) => U, wait?: number, options?: ThrottleOptionsType): (...args: T) => void;
    function clickOutside<T extends unknown[], U extends unknown>(target: Node, func: (...args: T) => U): void;
}
export default _;
