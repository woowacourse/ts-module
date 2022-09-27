import _fetch from "./fetch";
import { isNull as _isNull, isNil as _isNil, isNumber as _isNumber, isFunction as _isFunction } from "./checkType";
import _shuffle from "./shuffle";
import _pick from "./pick";
import _omit from "./omit";
import _memoize from "./memoize";
import _clickOutside from "./clickOutside";
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
    const fetch: typeof _fetch;
    const isNull: typeof _isNull;
    const isNil: typeof _isNil;
    const isNumber: typeof _isNumber;
    const isFunction: typeof _isFunction;
    const shuffle: typeof _shuffle;
    const pick: typeof _pick;
    const omit: typeof _omit;
    const memoize: typeof _memoize;
    const debounce: <T extends unknown[], U>(func: (...args: T) => U, wait?: number) => (...args: T) => U;
    const throttle: <T extends unknown[], U>(func: (...args: T) => U, wait?: number) => (...args: T) => U;
    const clickOutside: typeof _clickOutside;
}
export default _;
