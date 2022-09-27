import _fetch from "./fetch";
import {
  isNull as _isNull,
  isNil as _isNil,
  isNumber as _isNumber,
  isFunction as _isFunction,
} from "./checkType";
import _shuffle from "./shuffle";
import _pick from "./pick";
import _omit from "./omit";
import _memoize from "./memoize";
import _debounce from "./debounce";
import _throttle from "./throttle";
import _clickOutside from "./clickOutside";
interface CustomElementMethod {
  addEvent<T extends keyof GlobalEventHandlersEventMap>(
    eventType: T,
    handler: (event: GlobalEventHandlersEventMap[T]) => void
  ): void;

  html(): string;
  html(content: string): void;
  html(content?: string): string | void;

  show(): void;
  show(duration: number, complete: Function): void;

  hide(): void;
  hide(duration: number, complete: Function): void;
}

declare global {
  interface HTMLElement extends CustomElementMethod {}
}
/**
 * Document에서 주어진 선택자에 따라 요소를 찾아 유틸리티 매서드와 함께 반환합니다.
 *
 * @param selector 선택할 요소의 css 선택자
 * @returns 선택된 HTML 요소
 */
function _(selector: string) {
  const element = document.querySelector<HTMLElement>(selector);
  if (element === null) throw new Error("요소 없음");

  /**
   * 선택된 요소의 innerHTML 값을 반환하거나 설정합니다.
   * 인자로 전달되는 값이 없으면 innerHTML 값을 반환하고 문자열이 전달되면 요소에 삽입됩니다.
   *
   * @param content 삽입할 html 문자열
   */
  function html(): string;
  function html(content: string): void;
  function html(content?: string): string | void {
    if (element === null) throw new Error("요소 없음");
    if (content) {
      element.innerHTML = content;
      return;
    }

    return element.innerHTML;
  }

  /**
   * 선택된 요소를 화면에 표시합니다. display 스타일을 활용합니다.
   */
  const show = () => {
    if (element === null) throw new Error("요소 없음");
    element.style.display = "block";
  };

  /**
   * 선택된 요소를 화면에서 숨깁니다. display 스타일을 활용합니다.
   */
  const hide = () => {
    if (element === null) throw new Error("요소 없음");
    element.style.display = "hidden";
  };

  /**
   * 선택된 요소에 이벤트 리스너를 추가합니다.
   *
   * @param eventType 이벤트의 종류
   * @param handler 이벤트가 발생한 경우 실행할 콜백 함수
   */
  const addEvent = <T extends keyof GlobalEventHandlersEventMap>(
    eventType: T,
    handler: (event: GlobalEventHandlersEventMap[T]) => void
  ): void => {
    if (element === null) throw new Error("요소 없음");
    element.addEventListener(eventType, handler);
  };

  element.html = html;
  element.show = show;
  element.hide = hide;
  element.addEvent = addEvent;

  return element;
}

module _ {
  export const fetch = _fetch;
  export const isNull = _isNull;
  export const isNil = _isNil;
  export const isNumber = _isNumber;
  export const isFunction = _isFunction;
  export const shuffle = _shuffle;
  export const pick = _pick;
  export const omit = _omit;
  export const memoize = _memoize;
  export const debounce = _debounce;
  export const throttle = _throttle;
  export const clickOutside = _clickOutside;
}

export default _;
