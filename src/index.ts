import { ITQuery } from "./types";

class TQuery implements ITQuery {
  els: NodeListOf<HTMLElement> | null = null;
  get length() {
    return 0;
  }

  constructor(selector: string) {}

  loop = (callback: (el: HTMLElement) => void) => () => {};

  [Symbol.iterator]() {
    return {
      next: () => {
        return { value: new HTMLElement(), done: true };
      },
    };
  }

  show() {
    return;
  }

  hidden() {
    return;
  }

  addEvent<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ) {
    return;
  }
}

function wtil(selector: string): TQuery {
  return new TQuery(selector);
}

module wtil {
  export function fetch() {
    return {};
  }

  export function isNull() {}

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

export default wtil;
