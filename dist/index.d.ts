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
    function fetch(): void;
    /**
     * `value`가 `null`인지 체크한다.
     *
     * @param {*} value 체크할 값
     */
    function isNull(value: any): value is null;
    /**
     * `value` 가 `null` 혹은 `undefined`인지 체크한다.
     *
     * @param {*} value 체크할 값
     */
    function isNil(value: any): value is null | undefined;
    /**
     * `value`가 `Number` 원시값 또는 객체로 분류될 수 있는지 체크한다.(Infinity, -Infinity, NaN이 포함된다)
     *
     * @param {*} value 체크할 값
     */
    function isNumber(value: any): value is number;
    /**
     *  `value`가 `Function` 객체로 분류되는지 체크한다.
     *
     * @param {*} value 체크할 값
     */
    function isFunction(value: any): value is (...args: any[]) => any;
    /**
     * 무작위로 섞인 값들의 배열을 생성한다.
     *
     * @param {Array} 무작위로 섞을 배열
     * @returns {Array} 무작위로 섞인 배열을 반환한다
     */
    const shuffle: <T>(array: T[]) => T[];
    /**
     *
     *
     * @param {*} value 체크할 값
     */
    function pick(): void;
    /**
     *
     *
     * @param {*} value 체크할 값
     */
    function omit(): void;
    /**
     *
     *
     * @param {*} value 체크할 값
     */
    function memoize(): void;
    /**
     *
     *
     * @param {*} value 체크할 값
     */
    function debounce(): void;
    /**
     *
     *
     * @param {*} value 체크할 값
     */
    function throttle(): void;
    /**
     *
     *
     * @param {*} value 체크할 값
     */
    function clickOutside(): void;
}
export default _;
