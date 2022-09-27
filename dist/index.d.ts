/**
 * CustomElement는 HTMLElement를 확장한 타입이다.
 * CustomElement는 다음과 같은 메서드를 추가로 갖는다.
 *
 * - addEvent
 */
interface CustomElement extends HTMLElement {
    /**
     * Target element에 listener로 전달한 함수를 type 이벤트로 추가한다.
     *
     * @param type - Type은 target 요소에 등록할 이벤트 타입이다.
     * @param listener - Listener는 target 요소의 type 이벤트가 발생했을 때 호출되는 함수이다.
     */
    addEvent: <T extends keyof HTMLElementEventMap>(type: T, listener: (event: HTMLElementEventMap[T]) => void) => void;
}
declare type TypeValidator = (value: unknown) => boolean;
declare type Shuffle = <T extends Array<unknown> | Object>(collection: T) => Array<ShuffleReturn<T>>;
declare type ShuffleReturn<T> = T extends {
    [key: string | number | symbol]: infer R1;
} ? R1 : T extends Array<infer R2> ? R2 : never;
declare type Pick = <T extends Object, U extends Array<keyof T>>(object: T, paths: U) => {
    [key in U[number]]: T[key];
};
declare type Omit = <T extends Object, U extends Array<keyof T>>(object: T, paths: U) => {
    [key in Exclude<keyof T, U[number]>]: T[key];
};
/**
 * 전달한 selector에 해당되는 요소를 찾고, 해당 요소에서 사용할 수 있는 커스텀 메서드를 반환한다.
 *
 * @param selector - Selector은 document의 자식 요소들 중 selector와 일치하는 요소를 찾을 때 사용된다.
 * @returns HTMLElement를 확장한 CustomElement 객체 또는 null을 반환한다..
 */
declare function _(selector: string): CustomElement | null;
declare namespace _ {
    function fetch(): {};
    /**
     * 전달한 value가 null인지 확인하는 함수
     *
     * @param value - Value는 null인지 확인하려는 값이다.
     * @returns Value가 null이면 true를 반환한다. 그렇지 않으면 false를 반환한다.
     */
    const isNull: TypeValidator;
    /**
     * 전달한 value가 null 또는 undefined 타입인지 확인하는 함수
     *
     * @param value - Value는 null 또는 undefined 타입인지 확인하려는 값이다.
     * @returns Value가 null 또는 undefined 타입이면 true를 반환한다. 그렇지 않으면 false를 반환한다.
     */
    const isNil: TypeValidator;
    /**
     * 전달한 value가 number 타입인지 확인하는 함수
     *
     * @param value - Value는 number 타입인지 확인하려는 값이다.
     * @returns Value가 number 타입이면 true를 반환한다. 그렇지 않으면 false를 반환한다.
     */
    const isNumber: TypeValidator;
    /**
     * 전달한 value가 함수인지 확인하는 함수
     *
     * @param value - Value는 함수인지 확인하려는 값이다.
     * @returns Value가 함수이면 true를 반환한다. 그렇지 않으면 false를 반환한다.
     */
    const isFunction: TypeValidator;
    const shuffle: Shuffle;
    const pick: Pick;
    const omit: Omit;
    function memoize(): void;
    function debounce(): void;
    function throttle(): void;
    function clickOutside(): void;
}
export default _;
