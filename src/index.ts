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

  export function pick<T>(
    object: PickObject<T>,
    paths: PickPaths
  ): PickObject<T> | null {
    if (!object || !paths) {
      return;
    }
    const result = Object.fromEntries(
      Object.entries(object).map(
        (item) => {
          if (
            typeof paths != "string" &&
            paths.includes(
              String(item[0])
            )
          ) {
            return item;
          }
          if (
            typeof paths === "string" &&
            paths === String(item[0])
          ) {
            return item;
          }
          return;
        }
      )
    );

    return result;
  }

  export function omit() {}

  export function memoize() {}

  export function debounce() {}

  export function throttle() {}

  export function clickOutside() {}
}

type PickObject<T> = {
  [key: string]: T;
};
type PickPaths = string | string[];

export default _;
