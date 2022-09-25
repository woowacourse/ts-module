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

  export function shuffle<T>(
    collection: T[]
  ): T[] | [] {
    if (
      !collection ||
      !collection.length
    ) {
      return [];
    }
    let index = -1;
    const lastIndex =
      collection.length - 1;
    const result = [...collection];
    while (
      ++index < collection.length
    ) {
      const prIndex =
        index +
        Math.floor(
          Math.random() *
            (lastIndex - index + 1)
        );
      const value = result[prIndex];
      result[prIndex] = result[index];
      result[index] = value;
    }
    return result;
  }

  export function pick() {}

  export function omit() {}

  export function memoize() {}

  export function debounce() {}

  export function throttle() {}

  export function clickOutside() {}
}

export default _;
