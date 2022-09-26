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
  addEvent: <T extends keyof HTMLElementEventMap>(
    type: T,
    listener: (event: HTMLElementEventMap[T]) => void,
  ) => void;
}

type IsNil = (value: unknown) => boolean;

type IsNumber = (value: unknown) => boolean;

type IsFunction = (value: unknown) => boolean;

/**
 * 전달한 selector에 해당되는 요소를 찾고, 해당 요소에서 사용할 수 있는 커스텀 메서드를 반환한다.
 *
 * @param selector - Selector은 document의 자식 요소들 중 selector와 일치하는 요소를 찾을 때 사용된다.
 * @returns HTMLElement를 확장한 CustomElement 객체 또는 null을 반환한다..
 */
function _(selector: string): CustomElement | null {
  const target = document.querySelector<CustomElement>(selector);

  if (target !== null) {
    target.addEvent = (type, listener) => {
      target.addEventListener(type, listener);
    };
  }

  return target;
  /**
   * innerHTML() {
   * }
   *
   * show() {
   * }
   *
   * hidden() {
   * }
   *
   * addEvent() {
   * }
   */
}

namespace _ {
  export function fetch() {
    return {};
  }

  export function isNull() {}

  /**
   * 전달한 value가 null 또는 undefined 타입인지 확인하는 함수
   *
   * @param value - Value는 null 또는 undefined 타입인지 확인하려는 값이다.
   * @returns Value가 null 또는 undefined 타입이면 true를 반환한다. 그렇지 않으면 false를 반환한다.
   */
  export const isNil: IsNil = (value) => typeof value === 'undefined' || value === null;

  /**
   * 전달한 value가 number 타입인지 확인하는 함수
   *
   * @param value - Value는 number 타입인지 확인하려는 값이다.
   * @returns Value가 number 타입이면 true를 반환한다. 그렇지 않으면 false를 반환한다.
   */
  export const isNumber: IsNumber = (value) => typeof value === 'number';

  /**
   * 전달한 value가 함수인지 확인하는 함수
   *
   * @param value - Value는 함수인지 확인하려는 값이다.
   * @returns Value가 함수이면 true를 반환한다. 그렇지 않으면 false를 반환한다.
   */
  export const isFunction: IsFunction = (value) => value instanceof Function;

  export function shuffle() {}

  export function pick() {}

  export function omit() {}

  export function memoize() {}

  export function debounce() {}

  export function throttle() {}

  export function clickOutside() {}
}

export default _;
