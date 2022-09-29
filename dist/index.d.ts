declare global {
    export interface HTMLElement extends ElementProperty {
    }
}
interface ElementProperty {
    html: any;
    show: () => void;
    hide: any;
    addEvent: <T extends keyof HTMLElementEventMap>(type: T, listener: (event: HTMLElementEventMap[T]) => void) => void;
}
declare function _(selector: string): HTMLElement;
declare module _ {
    /**
     *
     * @param url
     * @param options
     * @returns
     */
    function fetch<Data>(url: string, options?: FetchOptions): Promise<Response<Data>>;
    /**
     * @param value
     * @returns return true if value is null
     */
    function isNull(value: unknown): value is null;
    /**
     *
     * @param value
     * @returns return true if value is null or false
     */
    function isNil(value: unknown): value is null | undefined;
    /**
     *
     * @param value
     * @returns return true if type of value is primitive number
     */
    function isNumber(value: unknown): value is number;
    /**
     * @param value
     * @returns return true if type of value is function
     */
    function isFunction(value: unknown): value is (...args: unknown[]) => unknown;
    /**
     * @param array
     * @returns shuffled array which has same type of param array
     * @example shuffle([1, 2, 3, 4]) => [2, 4, 3, 1]
     * 여러 타입이 담긴 array는 우선 생각 안함. array 내의 type이 모두 동일하다고 하고 구현
     * 매개변수로 depth가 1인 flat한 배열만 들어온다고 가정
     */
    function shuffle<T>(array: T[]): T[];
    /**
     * @param object
     * @param keys
     * @returns partial array of object which has `param keys`
     * @example pick( {a: 1, b: "c"}, ['b'] ) => {b: 'c'}
     * 매개변수로 depth가 1인 flat한 객체만 들어온다고 가정
     */
    function pick<T extends Record<string, unknown>, R extends keyof T>(object: T, keys: R[]): PickResult<T, R>;
    /**
     * @param object
     * @param keys
     * @returns partial array of object without `param keys`
     * @example omit( {a: 1, b: "c"}, ['b'] ) => {a: 1}
     * 매개변수로 depth가 1인 flat한 객체만 들어온다고 가정
     */
    function omit<T extends Record<string, unknown>, R extends keyof T>(object: T, keys: R[]): OmitResult<T, R>;
    /**
     *
     * @param func
     * @param resolver
     * @returns
     */
    function memoize<T extends unknown[], R>(func: (...args: T) => R): (...args: T) => R;
    function debounce<T extends unknown[]>(func: (...args: T) => void, wait: number): (...args: T) => void;
    function throttle<T extends unknown[]>(func: (...args: T) => void, wait: number): (...args: T) => void;
    function clickOutside(target: Node, func: (...args: unknown[]) => void): void;
}
declare type FetchOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    headers?: Record<string, string>;
    body?: Record<string, string>;
};
declare type Response<Data> = {
    status: number;
    ok: boolean;
    redirected: boolean;
    url: string;
    headers: Record<string, string>;
    json: () => Promise<Data>;
};
declare type PickResult<T, K extends keyof T> = {
    [k in K]: T[k];
};
declare type OmitResult<T, K extends keyof T> = PickResult<T, Exclude<keyof T, K>>;
export default _;
