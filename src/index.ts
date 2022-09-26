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

module _ {
  export function fetch() {
    return {};
  }

  export function isNull() {}

  /**
   * 전달한 value가 null 또는 undefined 타입인지 확인하는 함수
   *
   * @param value - Value은 null 또는 undefined 타입인지 확인하려는 값이다.
   * @returns value가 null 또는 undefined이면 true를 반환한다. 그렇지 않으면 false를 반환한다.
   */
  export const isNil: IsNil = (value) => typeof value === 'undefined' || value === null;

  export function isNumber() {}

  export function isFunction() {}

  export function shuffle() {}

  export function pick() {}

  export function omit() {}

  export function memoize() {}

  export function debounce() {}

  export function throttle() {}

  export function clickOutside() {}
}

export default _;
