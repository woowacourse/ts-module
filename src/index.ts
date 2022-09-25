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
  // export function fetch() {
  //   return {};
  // }

  export function isNull<T>(value: T): T extends null ? true : false;

  export function isNil<T>(value: T): T extends null | undefined ? true : false;

  export function isNumber<T>(value: T): T extends number ? true : false;

  export function isFunction<T>(value: T): T extends Function? true : false;

  // export function shuffle() {}

  // export function pick() {}

  // export function omit() {}

  // export function memoize() {}

  // export function debounce() {}

  // export function throttle() {}

  // export function clickOutside() {}
}

export default _;
