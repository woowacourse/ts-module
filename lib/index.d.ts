import { DebouncedFunc, DebounceOptions, FetchOptions, RealFunction } from "./utils";
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
     * 서버에 네트워크 요청을 보내고 새로운 데이터를 받아온다.
     *
     * @param url fetch할 url
     * @param options fetch 옵션
     */
    export function fetch(url: string, options?: FetchOptions): Promise<Response>;
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
    type pick = <T extends object, U extends keyof T>(object: T, targetList: Array<U>) => Pick<T, U> | {};
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
    export const pick: pick;
    type omit = <T extends object, K extends keyof T>(object: T, targetList: Array<K>) => Omit<T, K> | {};
    /**
     * 생략할 리스트를 전달한 후 객체에서 생략되지 않은 속성들로 구성된 객체를 반환한다.
     *
     * @param {*} value 체크할 값
     */
    export const omit: omit;
    /**
     * 함수의 결과를 기억하는 함수를 생성한다.
     *
     * @param func 기억해야 할 결과를 가진 함수
     * @param resolver 캐시 키를 resolve할 함수
     * @return 새로운 memoizing 함수를 반환한다
     */
    export function memoize(func: RealFunction, resolver?: RealFunction): RealFunction;
    /**
     * 호출한 함수를 지정한 시간만큼 지연시키는 디바운스 함수를 만든다.
     *
     * @param func 디바운스할 함수
     * @param wait 기다릴 시간 milliseconds
     * @param options 옵션 객체
     * @return 디바운스된 함수를 반환한다.
     */
    export function debounce<T extends RealFunction>(func: T, wait: number, options?: DebounceOptions): DebouncedFunc<T>;
    /**
     * 지정한 매 'wait' millisecond 마다  최대 한 번만 호출되도록 하는 조절된 함수를 만든다.
     *
     * @param func 쓰로틀할 함수
     * @param wait 기다릴 시간 milliseconds
     * @param options 옵션 객체
     * @return 쓰로틀된 함수를 반환한다.
     */
    export function throttle<T extends RealFunction>(func: T, wait: number, options?: Omit<DebounceOptions, "maxWait">): DebouncedFunc<T>;
    /**
     * 클릭된 영역이 내부 요소에 포함되어 있는지 확인한다.
     *
     * @param eventTarget 클릭된 영역
     * @param innerElement 내부 요소
     */
    export function clickOutside(eventTarget: HTMLElement, innerElement: HTMLElement): boolean;
    export {};
}
export default _;
