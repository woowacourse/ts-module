import type { NewElement, Function } from './type';
declare function _(selector: string): NewElement;
declare namespace _ {
    function fetch(input: string | URL, init?: RequestInit): Promise<Response>;
    function isNull(value?: unknown): Boolean;
    function isNil(value?: unknown): Boolean;
    function isNumber(value?: unknown): Boolean;
    function isFunction(value?: unknown): Boolean;
    function shuffle(array: number[]): number[];
    function pick<T extends Record<string, unknown>>(object: T, paths: (keyof T)[]): {
        [k: string]: unknown;
    };
    function omit<T extends Record<string, unknown>>(object: T, paths: (keyof T)[]): {
        [k: string]: unknown;
    };
    function memoize<T extends Function>(func: T, resolver?: (...args: Parameters<T>) => unknown): {
        (...args: Parameters<T>): ReturnType<T>;
        cache: Map<any, any>;
    };
    function debounce<T extends Function>(callback: T, delay: number): (...args: Parameters<T>) => void;
    function throttle<T extends Function>(callback: T, delay: number): (...args: Parameters<T>) => void;
    function clickOutside(element: Element, callback: Function): void;
}
export default _;
