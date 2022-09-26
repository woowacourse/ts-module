interface CustomElementMethod {
    addEvent<T extends keyof GlobalEventHandlersEventMap>(eventType: T, handler: (event: GlobalEventHandlersEventMap[T]) => void): void;
    html(): string;
    html(content: string): void;
    html(content?: string): string | void;
    show(): void;
    show(duration: number, complete: Function): void;
    hide(): void;
    hide(duration: number, complete: Function): void;
}
declare global {
    interface HTMLElement extends CustomElementMethod {
    }
}
declare function _(selector: string): HTMLElement;
declare module _ {
    function fetch(url: string, method: string, payload?: unknown): Promise<any>;
    function isNull<T>(input: T): T extends null ? true : false;
    function isNil<T>(input: T): T extends null | undefined ? true : false;
    function isNumber<T>(input: T): T extends number ? true : false;
    function isFunction<T>(input: T): T extends Function ? true : false;
    function shuffle<T>(collection: T[]): T[];
    function shuffle<T>(collection: Record<string, T>): T[];
    function pick<T extends Record<string, unknown>, U extends Partial<keyof T>>(object: T, props: U[]): Pick<T, U>;
    function omit<T extends Record<string, unknown>, U extends Partial<keyof T>>(object: T, props?: U[]): Omit<T, U>;
    function memoize<T extends unknown[], U>(func: (...args: T) => U, resolver?: (...args: T) => string): (...args: T) => U;
    const debounce: <T extends unknown[], U>(func: (...args: T) => U, wait?: number) => (...args: T) => U;
    const throttle: <T extends unknown[], U>(func: (...args: T) => U, wait?: number) => (...args: T) => U;
    function clickOutside(targetElement: Element, handler: (event: MouseEvent) => void): void;
}
export default _;
