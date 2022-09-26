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

  export function isNil() {}

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
