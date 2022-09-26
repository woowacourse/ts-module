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
/**
 * Document에서 주어진 선택자에 따라 요소를 찾아 유틸리티 매서드와 함께 반환합니다.
 *
 * @param selector 선택할 요소의 css 선택자
 * @returns 선택된 HTML 요소
 */
declare function _(selector: string): HTMLElement;
declare module _ {
    /**
     * XMLHttpRequest를 활용해 비동기적으로 서버와 통신합니다.
     *
     * @param url 요청을 받을 서버의 주소
     * @param method 요청 매서드
     * @param payload 요청 body에 추가할 정보
     * @returns 서버로부터 받은 응답
     */
    function fetch(url: string, method: string, payload?: unknown): Promise<any>;
    /**
     * null인지 여부를 반환합니다.
     *
     * @param input 검증 대상 값
     * @returns input이 null인지 여부
     */
    function isNull<T>(input: T): T extends null ? true : false;
    /**
     *  null 혹은 undefined인지 여부를 반환합니다.
     *
     * @param input 검증 대상 값
     * @returns input이 null 혹은 undefined인지 여부
     */
    function isNil<T>(input: T): T extends null | undefined ? true : false;
    /**
     * number인지 여부를 반환합니다.
     *
     * @param input 검증 대상 값
     * @returns input이 number인지 여부
     */
    function isNumber<T>(input: T): T extends number ? true : false;
    /**
     * function인지 여부를 반환합니다.
     *
     * @param input 검증 대상 값
     * @returns input이 function인지 여부
     */
    function isFunction<T>(input: T): T extends Function ? true : false;
    /**
     * 배열 혹은 객체의 값의 배열의 순서를 무작위로 섞어 반환합니다.
     *
     * @param collection 섞을 배열 혹은 객체
     * @returns 배열인 경우 섞인 배열, 객체인 경우 객체의 값으로 이루어진 섞인 배열
     */
    function shuffle<T>(collection: T[]): T[];
    function shuffle<T>(collection: Record<string, T>): T[];
    /**
     * 객체에서 일부 속성 값만 추출해서 만든 새로운 객체를 반환합니다.
     *
     * @param object 대상 객체
     * @param props 선택할 속성의 배열
     * @returns 대상 객체 중 선택한 속성만으로 구성된 새로운 객체
     */
    function pick<T extends Record<string, unknown>, U extends Partial<keyof T>>(object: T, props: U[]): Pick<T, U>;
    /**
     * 객체에서 일부 속성 값만 제거해서 만든 새로운 객체를 반환합니다.
     *
     * @param object 대상 객체
     * @param props 제거할 속성의 배열
     * @returns 대상 객체에서 선택한 속성을 제거한 새로운 객체
     */
    function omit<T extends Record<string, unknown>, U extends Partial<keyof T>>(object: T, props?: U[]): Omit<T, U>;
    /**
     * 함수의 연산에 메모이제이션을 적용해, 동일한 인자가 주어졌을 때 반복적인 연산을 생략하고 저장된 값을 반환하는 함수를 반환합니다.
     * resolver 함수를 전달하지 않으면 자동으로 첫 번째 인자를 캐시 키로 활용합니다.
     *
     * @param func 메모이제이션을 적용할 함수
     * @param resolver 캐시 키를 생성하는 함수
     * @returns 메모이제이션이 적용된 함수
     */
    function memoize<T extends unknown[], U>(func: (...args: T) => U, resolver?: (...args: T) => string): (...args: T) => U;
    /**
     * 실행하기 전 정해진 시간을 대기하는 디바운스가 적용된 함수를 반환합니다.
     * 지연 시간을 전달하지 않으면 지연되지 않고 바로 함수가 실행됩니다.
     *
     * @param func 디바운스를 적용할 함수
     * @param wait 함수 실행 지연시간
     * @returns 디바운스가 적용된 함수
     */
    const debounce: <T extends unknown[], U>(func: (...args: T) => U, wait?: number) => (...args: T) => U;
    /**
     * 일정 시간 동안 함수를 한 번만 실행하는 쓰로틀이 적용된 함수를 반환합니다.
     * 주기를 전달하지 않으면 함수가 호출 될 때마다 실행됩니다.
     *
     * @param func 쓰로틀을 적용할 함수
     * @param wait 함수를 1회 실행할 주기
     * @returns 쓰로틀이 적용된 함수
     */
    const throttle: <T extends unknown[], U>(func: (...args: T) => U, wait?: number) => (...args: T) => U | undefined;
    /**
     * 전달된 대상 요소가 아닌 다른 요소가 클릭되었을 때 콜백함수를 호출하는 이벤트 리스너를 추가합니다.
     *
     * @param targetElement 대상 요소
     * @param handler 대상 요소가 아닌 곳이 클릭됐을 때 호출할 콜백 함수
     */
    function clickOutside(targetElement: Element, handler: (event: MouseEvent) => void): void;
}
export default _;
