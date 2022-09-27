declare function _(selector: string): Node | null;
declare global {
    interface Node {
        setInnerHTML(value: string): void;
        setShow(): void;
        setHidden(): void;
        addEvent<K extends keyof HTMLElementEventMap, U extends unknown>(type: K, listener: (event: HTMLElementEventMap[K]) => U, options?: boolean | AddEventListenerOptions): void;
    }
}
declare module _ {
    export function fetch(input: string | URL, init?: RequestInit): Promise<Response>;
    export function isNull<T extends unknown>(value: T): boolean;
    export function isNil<T extends unknown>(value: T): boolean;
    export function isNumber<T extends unknown>(value: T): boolean;
    export function isFunction<T extends unknown>(value: T): boolean;
    export function shuffle<T>(array: T[]): T[];
    type PickType<T extends {
        [key: string]: unknown;
    }, U extends readonly (keyof T)[]> = {
        [K in U[number]]: T[K];
    };
    export function pick<T extends {
        [key: string]: unknown;
    }, U extends (keyof T)[]>(object: T, paths: U): PickType<T, U>;
    type OmitType<T extends {
        [key: string]: unknown;
    }, U extends readonly (keyof T)[]> = {
        [K in keyof Omit<T, U[number]>]: T[K];
    };
    export function omit<T extends {
        [key: string]: unknown;
    }, U extends (keyof T)[]>(object: T, paths: U): OmitType<T, U>;
    export function memoize<T extends unknown[], U extends unknown>(func: (...args: T) => U, resolver?: (...args: T) => string): (...args: T) => U;
    type DebounceOptionsType = {
        leading?: boolean;
        maxWait?: number;
        trailing?: boolean;
    };
    export function debounce<T extends unknown[], U extends unknown>(func: (...args: T) => U, wait?: number, options?: DebounceOptionsType): (...args: T) => void;
    type ThrottleOptionsType = Omit<DebounceOptionsType, "maxWait">;
    export function throttle<T extends unknown[], U extends unknown>(func: (...args: T) => U, wait?: number, options?: ThrottleOptionsType): (...args: T) => void;
    export function clickOutside<T extends unknown, U extends unknown>(target: Node, func: (...args: T[]) => U): void;
    export {};
}
export default _;
