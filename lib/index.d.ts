import { DebounceThrottleOptions, SoundFunction, SoundObject, FetchOptions, Nill, OmitResult, PickResult, FetchResponse, DebouncedFunction } from "./util";
declare class CustomElement {
    element: HTMLElement | null;
    constructor(selector: string);
    innerHTML(HTMLString: string): void;
    show(): void;
    hide(): void;
    addEvent<T extends keyof HTMLElementEventMap>(type: T, listener: (event: HTMLElementEventMap[T]) => void): void;
}
declare function _(selector: string): CustomElement;
declare module _ {
    /**
     * `url` 과 `options` 을 통해서 API 요청을 보낸다.
     */
    function fetch<T = any>(url: string, options?: FetchOptions): Promise<FetchResponse<T>>;
    /**
     * `value` 가 `null` 인지 체크한다.
     */
    function isNull(value: any): value is null;
    /**
     * `value` 가 `null` 혹은 `undefined`인지 체크한다.
     */
    function isNil(value: any): value is Nill;
    /**
     * `value`가 `Number` 원시값 또는 객체로 분류될 수 있는지 체크한다.(Infinity, -Infinity, NaN이 포함된다)
     */
    function isNumber(value: any): value is number;
    /**
     *  `value`가 `Function` 객체로 분류되는지 체크한다.
     */
    function isFunction(value: any): value is SoundFunction;
    /**
     * 무작위로 섞인 값들의 배열을 생성한다.
     */
    const shuffle: <T>(array: T[]) => T[];
    /**
     * 선택한 'object' 속성만으로 구성된 객체를 만든다.
     */
    function pick<T extends SoundObject, K extends (keyof T)[]>(object: T, path: K): PickResult<T, K>;
    /**
     * 선택한 'object' 속성이 제외되어 구성된 객체를 만든다.
     */
    function omit<T extends SoundObject, K extends (keyof T)[]>(object: T, path: K): OmitResult<T, K>;
    /**
     * 'func'의 결과를 메모하는 함수를 만든다.
     */
    function memoize(func: SoundFunction, resolver: SoundFunction): SoundFunction;
    /**
     * 'func' 호출을 'wait' 이후까지 지연시키는 디바운스 함수를 만든다.
     */
    function debounce<T extends SoundFunction>(func: T, wait: number, options?: DebounceThrottleOptions): DebouncedFunction<T>;
    /**
     * "wait" 밀리초마다 최대 한 번(또는 브라우저 프레임당 한 번) 'func'를 호출하는 쓰로틀 함수를 만든다.
     */
    function throttle<T extends SoundFunction>(func: T, wait: number, options?: DebounceThrottleOptions): DebouncedFunction<T>;
    /**
     * 클릭된 영역(eventTarget)이 innerElement 에 포함 되어있는지 확인한다.
     */
    function clickOutside(eventTarget: HTMLElement, innerElement: HTMLElement): boolean;
}
export default _;
