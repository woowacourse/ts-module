function _(selector: string): Element {
  if (!selector) {
    return;
  }

  const element = document.querySelector(selector);

  return element;
}

namespace _ {
  // export function fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  //   return {};
  // }

  export function isNull(value?: unknown): Boolean {
    return value === null;
  }

  export function isNil(value?: unknown): Boolean {
    return value === null || value === undefined;
  }

  export function isNumber(value?: unknown): Boolean {
    return typeof value === 'number' || Object.prototype.toString.call(value) === '[object Number]';
  }

  export function isFunction(value?: unknown): Boolean {
    return typeof value === 'function';
  }

  export function shuffle(array: number[]): number[] {
    if (array.length === 0) {
      return [];
    }

    const result = array.map((el) => el);

    array.forEach((_, index, array) => {
      const random = index + Math.floor(Math.random() * (array.length - index));
      const value = result[random];
      result[random] = result[index];
      result[index] = value;
    });

    return result;
  }

  export function pick(object: Record<string, unknown>, paths: string[]) {
    if (isNil(object)) {
      return {};
    }

    return Object.fromEntries(Object.entries(object).filter((el) => paths.includes(el[0])));
  }

  export function omit(object: Record<string, unknown>, paths: string[]) {
    if (isNil(object)) {
      return {};
    }

    return Object.fromEntries(Object.entries(object).filter((el) => !paths.includes(el[0])));
  }

  export function memoize() {}

  export function debounce() {}

  export function throttle() {}

  export function clickOutside() {}
}

export default _;
