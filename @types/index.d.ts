declare function _(selector: string): any;
declare module _ {
    function fetch(path: RequestInfo | URL, config?: RequestInit): Promise<Response>;
    /**
     * parameter가 null인지 판별한다.
     * @param {*} value
     * @return {boolean} false or true
     */
    function isNull(value: unknown): value is boolean;
    /**
     * parameter가 null혹은 undefined인지 판별한다.
     * @param {*} value
     * @return {boolean} false or true
     */
    function isNil(value: unknown): value is boolean;
    /**
     * parameter의 타입이 number인지 판별한다.
     * @param {*} value
     * @return {boolean} false or true
     */
    function isNumber(value: unknown): value is boolean;
    /**
     * parameter가 Function인지 판별한다.
     * @param {*} value
     * @return {boolean} false or true
     */
    function isFunction(value: unknown): value is boolean;
    /**
     * parameter 배열을 무작위로 섞어 반환한다.
     * @param {Array} Array
     * @return {Array} Array
     */
    function shuffle<T>([...array]: T[]): T[];
    /**
     * object에서 keys의 요소만 골라 새로운 객체로 반환한다.
     * @param {Object} object
     * @param {...(string| string[])} keys rest parameter는 object의 key값이다.
     * @return {Object} keys로만 포함된 새로운 객체를 반환한다.
     */
    function pick<T extends Record<string | number, unknown>, K extends keyof T>(object: T, ...keys: K[]): Pick<T, K>;
    /**
     *
     * @param {Object} object
     * @param {...(string| string[])} keys rest parameter는 object의 key값이다.
     * * @return {Object} keys 제거된 새로운 객체를 반환한다.
     */
    function omit<T extends Record<string | number, unknown>, K extends keyof T>(object: T, ...keys: K[]): Omit<T, K>;
    /**
     * cache에 함수의 결과값이 저장되어 있으면 cache에 저장된 값을 반환한다.
     * @param func 실행시킬 함수
     * @returns 캐시에 저장된 함수의 결과값
     */
    function memoize(callback: (arg: number) => number): (n: number) => number | string;
    /**
     * 디바운스 함수
     * @param func 함수 실행 체크
     * @param wait 타이머 시간
     */
    function debounce(func: () => void, wait: number): () => void;
    /**
     * 쓰로틀링 함수
     * @param func 함수 실행 체크
     * @param wait 타이머 시간
     */
    function throttle(func: Function, wait: number): () => void;
    /**
     * 두 Element 비교
     * @param outerElement
     * @param innerElement
     */
    function clickOutside(outerElement: HTMLElement, innerElement: HTMLElement): boolean;
}
export default _;
