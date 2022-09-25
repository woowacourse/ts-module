function _(selector: string) {
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
  const element = document.querySelector(selector);
  if (!element) throw new Error("요소 없음");

  return element;
}

module _ {
  export function fetch() {
    return {};
  }

  export function isNull(input: unknown): input is null {
    return input === null;
  }

  export function isNil(input: unknown): input is null | undefined {
    return input === null || input === undefined;
  }

  export function isNumber(input: unknown): input is Number {
    return typeof input === "number";
  }

  export function isFunction(input: unknown): input is Function {
    return typeof input === "function";
  }

  export function shuffle() {}

  export function pick() {}

  export function omit() {}

  export function memoize() {}

  export function debounce() {}

  export function throttle() {}

  export function clickOutside() {}
}

export default _;
