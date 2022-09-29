declare function _(selector: string): {
    innerHTML: (value: string) => void;
    show: () => void;
    hidden: () => void;
    addEvent: (eventType: keyof HTMLElementEventMap, func: (this: Element, event: Event) => void) => void;
};
declare module _ {
    function fetch<T>(url: string, options: FetchOption): Promise<FetchResponse<T>>;
    function isNull(arg: unknown): arg is null;
    function isNil(arg: unknown): arg is null | undefined;
    function isNumber(arg: unknown): arg is number;
    function isFunction(arg: unknown): arg is Function;
    function shuffle(collection: string[]): string[] | [];
    function pick(object: PickObject<string>, paths: PickPaths): PickObject<string> | null;
    function omit(object: Record<string, string>, paths: PickPaths): Record<string, string> | null;
    function memoize(func: () => string, resolver: (args: Record<string, string>) => string[]): () => string | null;
    function debounce(func: (args: string) => void, wait: number, options?: DebounceThrottleOption): () => void | null;
    function throttle(func: (args: string) => void, wait: number, options?: DebounceThrottleOption): () => void | null;
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
export interface DebounceThrottleOption {
    leading?: boolean;
    maxWait?: number;
    trailing?: boolean;
}
export default _;
