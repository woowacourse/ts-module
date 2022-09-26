declare global {
    interface HTMLElement extends CustomElementProperty {
    }
}
interface CustomElementProperty {
    innerHTML: string;
    hide: () => void;
    show: () => void;
    addEvent: <K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, event: HTMLElementEventMap[K]) => any) => void;
}
declare type PickResult<T extends Record<string, unknown>, K extends (keyof T)[]> = {
    [P in K[number]]: T[P];
};
declare type OmitResult<T extends Record<string, unknown>, K extends (keyof T)[]> = {
    [P in Exclude<keyof T, K>]: T[P];
};
declare type Function<T = unknown, R = unknown> = (...args: T[]) => R;
declare type FetchResource = string | URL | Request;
declare type FetchOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    headers?: Headers;
    body?: string | Blob | ArrayBuffer | DataView | FormData | URLSearchParams | ReadableStream;
};
declare function _(selector: string): HTMLElement;
declare module _ {
    function fetch(resource: FetchResource, options?: FetchOptions): Promise<Response>;
    function isNull(value: unknown): boolean;
    function isNil(value: unknown): boolean;
    function isNumber(value: unknown): boolean;
    function isFunction(value: unknown): boolean;
    function shuffle<T>(array: T[]): T[];
    function pick<T extends Record<string, unknown>, K extends (keyof T)[]>(object: T, paths: K): PickResult<T, K>;
    function omit<T extends Record<string, unknown>, K extends (keyof T)[]>(object: T, paths: K): OmitResult<T, K>;
    function memoize<T, R>(func: Function<T, R>, resolver?: Function<T, string>): Function<T, R>;
    function debounce<T, R>(func: Function<T, R>, wait: number): Function<T, void>;
    function throttle<T, R>(func: Function<T, R>, wait: number): Function<T, void>;
    function clickOutside(target: Element, handler: (event: MouseEvent) => any): void;
}
export default _;
