declare function _(selector: string): {
    innerHTML: (value: string) => void;
    show: () => void;
    hidden: () => void;
    addEvent: (eventType: keyof HTMLElementEventMap, func: (this: Element, event: Event) => void) => void;
};
declare module _ {
    function fetch<T>(url: string, options: FetchOption): Promise<FetchResponse<T>>;
    function isNull<T>(arg: T): true | false;
    function isNil<T>(arg: T): true | false;
    function isNumber<T>(arg: T): true | false;
    function isFunction<T>(arg: T): true | false;
    function shuffle<T>(collection: T[]): T[] | [];
    function pick<T>(object: PickObject<T>, paths: PickPaths): PickObject<T> | null;
    function omit<T>(object: Record<string, T>, paths: PickPaths): Record<string, T> | null;
    function memoize<T1>(func: () => T1, resolver: (args: Record<string, T1>) => string[]): () => T1 | null;
    function debounce<T>(func: (args: T) => void, wait: number, options?: DebounceThrottleOption): () => void | null;
    function throttle<T>(func: (args: T) => void, wait: number, options?: DebounceThrottleOption): () => void | null;
    function clickOutside(target: HTMLElement, func: (e: HTMLElement) => void): void;
}
interface FetchOption {
    method: "GET" | "POST" | "DELETE" | "PUT";
    mode?: "no-cors" | "cors" | "same-origin" | "cors";
    cache?: "no-cache" | "reload" | "force-cache" | "only-if-cached";
    credentials?: "same-origin" | "omit";
    headers?: {
        "Content-Type": "application/json";
    };
    redirect?: "follow" | "error" | "manual";
    referrerPolicy?: "no-referrer" | "no-referrer-when-downgrade" | "origin";
    body?: "application/json";
}
interface FetchResponse<T> {
    status: 200 | 201 | 202 | 204 | 400 | 401 | 403 | 404 | 500;
    ok: boolean;
    statusText: string;
    headers: Record<string, string>;
    json: () => Promise<T>;
}
declare type PickObject<T> = {
    [key: string]: T;
};
declare type PickPaths = string | string[];
interface DebounceThrottleOption {
    leading?: boolean;
    maxWait?: number;
    trailing?: boolean;
}
export default _;
