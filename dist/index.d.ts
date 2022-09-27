/**
 * CustomElement는 HTMLElement를 확장한 타입이다.
 * CustomElement는 다음과 같은 메서드를 추가로 갖는다.
 *
 * - insertHTML
 * - addEvent
 * - show
 * - hide
 */
interface CustomElement extends HTMLElement {
    /**
     * Target 요소에 html로 전달한 문자열을 innerHTML로 추가한 후 결과륿 반환한다.
     *
     * @param html - HTML은 target 요소에 삽입할 html 문서이다.
     * @return 변경된 내부 html를 반환한다.
     */
    insertHTML: (html: string) => string;
    /**
     * Target element에 listener로 전달한 함수를 type 이벤트로 추가한다.
     *
     * @param type - Type은 target 요소에 등록할 이벤트 타입이다.
     * @param listener - Listener는 target 요소의 type 이벤트가 발생했을 때 호출되는 함수이다.
     */
    addEvent: <T extends keyof HTMLElementEventMap>(type: T, listener: (event: HTMLElementEventMap[T]) => void) => void;
    /**
     * Target 요소의 style.display 속성을 block으로 변경한다.
     */
    show: () => void;
    /**
     * Target 요소의 style.display 속성을 none으로 변경한다.
     */
    hide: () => void;
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
 * @returns HTMLElement를 확장한 CustomElement 객체 또는 null을 반환한다.
 */
declare function _(selector: string): CustomElement | null;
declare namespace _ {
    const fetch: (url: string, options: RequestInit) => Promise<Response>;
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
    /**
     * 전달한 collection을 값 또는 요소를 무작위로 섞은 후 결과를 반환한다.
     *
     * @param collection - Collection은 요소를 섞을 배열 또는 값을 섞을 객체이다.
     * @returns Collection은 요소 또는 값을 섞은 결과를 배열로 반환한다..
     */
    const shuffle: Shuffle;
    /**
     * 전달한 object의 키 중 paths에 속한 키들만을 찾아서 반환한다.
     *
     * @param object - 대상이 되는 object이다.
     * @param paths - Object의 키들 중 반환할 키들의 배열이다.
     * @returns Object의 키 중 paths에 속한 키들을 찾고, 새로운 객체를 만들어서 반환한다.
     */
    const pick: Pick;
    /**
     * 전달한 object의 키 중 paths에 속한 키들만을 제외하고 반환한다.
     *
     * @param object - 대상이 되는 object이다.
     * @param paths - Object의 키들 중 제외할 키들의 배열이다.
     * @returns Object의 키 중 paths에 속한 키들을 제외하고, 새로운 객체를 만들어서 반환한다.
     */
    const omit: Omit;
    /**
     * Func로 전달한 함수의 실행 결과를 캐싱하고, 캐싱 된 결괏값을 반환하는 함수이다.
     *
     * @param func - Func는 실행 결괏값을 캐싱 할 함수이다.
     * @returns Func의 실행 결과를 반환한다. 단, 이미 캐싱 된 결괏값이 존재한다면 func 함수를 실행하지 않고 캐싱 된 값을 반환한다.
     */
    const memoize: <T extends Function, U>(func: T) => (...args: unknown[]) => U;
    /**
     * Func로 전달한 함수의 실행을 debouncing을 적용해서 제어하는 함수이다.
     *
     * @param func - Func는 debouncing을 적용할 함수이다.
     * @param wait - Wait은 debouncing을 처리할 시간이다.(ms)
     * @return 익명 함수를 반환한다. 해당 함수를 실행하면 func로 전달한 함수가 debouncing이 적용돼서 실행된다.
     */
    const debounce: <T extends Function>(func: T, wait?: number) => (...args: unknown[]) => void;
    /**
     * Func로 전달한 함수의 실행을 throttling을 적용해서 제어하는 함수이다.
     *
     * @param func - Func는 throttling을 적용할 함수이다.
     * @param wait - Wait은 throttling 처리할 시간이다.(ms)
     * @return 익명 함수를 반환한다. 해당 함수를 실행하면 func로 전달한 함수가 throttling이 적용돼서 실행된다.
     */
    const throttle: <T extends Function>(func: T, wait?: number) => (...args: unknown[]) => void;
    /**
     * Element로 전달한 요소의 부묘 요소에 click 이벤트를 등록하는 메서드이다.
     *
     * @param element - Element는 대상이 되는 요소이다. 해당 요소의 부모 요소에 click 이벤트를 등록한다.
     * @param callback - Callback은 Element의 부모 요소 click 이벤트에 등록할 메서드이다.
     */
    const clickOutside: <T extends HTMLElement, U extends Function>(element: T, callback: U) => void;
}
export default _;
