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

  /**
   * @param value
   * @returns return true if value is null
   */
  export function isNull(value: unknown): value is null {
    return value === null;
  }

  /**
   *
   * @param value
   * @returns return true if value is null or false
   */
  export function isNil(value: unknown): value is null | undefined {
    return value == null;
  }

  /**
   *
   * @param value
   * @returns return true if type of value is primitive number
   */
  export function isNumber(value: unknown): value is number {
    return typeof value === "number";
  }

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
