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

  export function shuffle() {}

  export function pick() {}

  export function omit() {}

  export function memoize() {}

  export function debounce() {}

  export function throttle() {}

  export function clickOutside() {}
}

export default _;
