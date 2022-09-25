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

  /**
   * @param value
   * @returns return true if type of value is function
   */
  export function isFunction(
    value: unknown
  ): value is (...args: unknown[]) => unknown {
    return typeof value === "function";
  }

  /**
   * @param array
   * @returns shuffled array which has same type of param array
   * @example shuffle([1, 2, 3, 4]) => [2, 4, 3, 1]
   */
  export function shuffle<T>(array: T[]): T[] {
    return array;
  }

  export function pick() {}

  export function omit() {}

  export function memoize() {}

  export function debounce() {}

  export function throttle() {}

  export function clickOutside() {}
}

export default _;
