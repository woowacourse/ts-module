declare global {
    interface HTMLElement extends CustomElement {
    }
}
interface CustomElement {
    innerHtml: (html: string) => string;
    hide: () => void;
    show: () => void;
    addEvent: <T extends keyof HTMLElementEventMap>(type: T, handler: (event: HTMLElementEventMap[T]) => void) => void;
}
declare function _(selector: string): HTMLElement;
declare module _ {
    function fetch<T>(url: string, config: RequestInit): Promise<T>;
    function isNull<T>(value: T): boolean;
    function isNil<T>(value: T): boolean;
    function isNumber<T>(value: T): boolean;
    function isFunction<T>(value: T): boolean;
    function shuffle<T>(collection: T[]): T[];
    function pick<T extends Record<string, unknown>, K extends Partial<keyof T>>(obj: T, paths: K[]): Pick<T, K>;
    function omit<T extends Record<string, unknown>, K extends Partial<keyof T>>(obj: T, paths: K[]): Omit<T, K>;
    function memoize<T, K>(func: (...args: T[]) => K, resolver: (...args: T[]) => string): (...args: T[]) => K;
    function debounce<T, K>(func: (...args: T[]) => K, wait?: number): (...args: T[]) => any;
    function throttle<T, K>(func: (...args: T[]) => K, wait?: number): (...args: T[]) => any;
    function clickOutside(target: HTMLElement, element: HTMLElement): boolean;
}
export default _;
