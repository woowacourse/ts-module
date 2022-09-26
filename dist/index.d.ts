declare class CustomElement {
    element: HTMLElement | null;
    constructor(selector: string);
    insertHTML(HTMLString: string): void;
    show(): void;
    hide(): void;
    addEvent<T extends keyof HTMLElementEventMap>(type: T, listener: (event: HTMLElementEventMap[T]) => void): void;
}
declare function _(selector: string): CustomElement;
declare module _ {
    export function fetch(): void;
    /**
     * `value` 가 `null` 인지 체크한다.
     */
    export function isNull(value: any): value is null;
    /**
     * `value` 가 `null` 혹은 `undefined`인지 체크한다.
     */
    export function isNil(value: any): value is null | undefined;
    /**
     * `value`가 `Number` 원시값 또는 객체로 분류될 수 있는지 체크한다.(Infinity, -Infinity, NaN이 포함된다)
     */
    export function isNumber(value: any): value is number;
    /**
     *  `value`가 `Function` 객체로 분류되는지 체크한다.
     */
    export function isFunction(value: any): value is (...args: any[]) => any;
    /**
     * 무작위로 섞인 값들의 배열을 생성한다.
     */
    export const shuffle: <T>(array: T[]) => T[];
    /**
     * 선택한 'object' 속성만으로 구성된 객체를 만든다.
     */
    export function pick<T extends Record<string, unknown>, K extends (keyof T)[]>(object: T, path: K): PickResult<T, K>;
    type PickResult<T extends Record<string, unknown>, K extends (keyof T)[]> = {
        [P in K[number]]: T[P];
    };
    /**
     * 선택한 'object' 속성이 제외되어 구성된 객체를 만든다.
     */
    export function omit<T extends Record<string, unknown>, K extends (keyof T)[]>(object: T, path: K): OmitResult<T, K>;
    type OmitResult<T extends Record<string, unknown>, K extends (keyof T)[]> = {
        [P in keyof Omit<T, K[number]>]: T[P];
    };
    /**
     * 'func'의 결과를 메모하는 함수를 만든다.
     */
    export function memoize(func: Function, resolver: Function): Function;
    /**
     * 'func' 호출을 'wait' 이후까지 지연시키는 디바운스 함수를 만든다.
     */
    export function debounce<T extends Function>(func: T, wait: number, options: Record<"leading" | "trailing", number>): T;
    /**
     * "wait" 밀리초마다 최대 한 번(또는 브라우저 프레임당 한 번) 'func'를 호출하는 쓰로틀 함수를 만든다.
     */
    export function throttle(func: Function, wait: number, options: Record<"leading" | "trailing", number>): Function;
    export function clickOutside(): void;
    export {};
}
export default _;
