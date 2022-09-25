function _(selector: string): any {
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

  export function isNull<T>(
    arg: T
  ): boolean {
    return arg === null;
  }

  export function isNil<T>(
    arg: T
  ): boolean {
    return arg === null ||
      arg === undefined
      ? true
      : false;
  }

  export function isNumber<T>(
    arg: T
  ): boolean {
    return typeof arg === "number";
  }

  export function isFunction<T>(
    arg: T
  ): boolean {
    return typeof arg === "function";
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
