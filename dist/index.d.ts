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
    /**
     *
     *
     * @param {*} value 체크할 값
     */
    export function fetch(): void;
    /**
     * `value`가 `null`인지 체크한다.
     *
     * @param {*} value 체크할 값
     */
    export function isNull(value: any): value is null;
    /**
     * `value` 가 `null` 혹은 `undefined`인지 체크한다.
     *
     * @param {*} value 체크할 값
     */
    export function isNil(value: any): value is null | undefined;
    /**
     * `value`가 `Number` 원시값 또는 객체로 분류될 수 있는지 체크한다.(Infinity, -Infinity, NaN이 포함된다)
     *
     * @param {*} value 체크할 값
     */
    export function isNumber(value: any): value is number;
    /**
     *  `value`가 `Function` 객체로 분류되는지 체크한다.
     *
     * @param {*} value 체크할 값
     */
    export function isFunction(value: any): value is (...args: any[]) => any;
    /**
     * 무작위로 섞인 값들의 배열을 생성한다.
     *
     * @param {Array} 무작위로 섞을 배열
     * @returns {Array} 무작위로 섞인 배열을 반환한다
     */
    export const shuffle: <T>(array: T[]) => T[];
    /**
     * 객체에서 추출된 속성으로 구성된 객체를 만든다
     *
     * @param {*} object 추출할 대상 객체
     * @param {*} targetList 추출하려는 리스트
     * @returns {*} 새 객체를 반환한다
     *
     * const object = {'a': 1, 'b': 2, 'c': 3}
     *
     * pick(object, ['a','c'])
     * // => {'a':1, 'c':3}
     */
    type pick = <T extends object, U extends keyof T>(object: T, targetList: Array<U>) => Pick<T, U> | {};
    export const pick: pick;
    /**
     * 생략할 리스트를 전달한 후 객체에서 생략되지 않은 속성들로 구성된 객체를 반환한다.
     *
     * @param {*} value 체크할 값
     */
    type omit = <T extends object, K extends keyof T>(object: T, targetList: Array<K>) => Omit<T, K> | {};
    export const omit: omit;
    /**
     *
     *
     * @param {*} value 체크할 값
     */
    export function memoize(): void;
    /**
     *
     *
     * @param {*} value 체크할 값
     */
    export function debounce(): void;
    /**
     *
     *
     * @param {*} value 체크할 값
     */
    export function throttle(): void;
    /**
     *
     *
     * @param {*} value 체크할 값
     */
    export function clickOutside(): void;
    export {};
}
export default _;
