declare function _(selector: string): HTMLElement;
declare global {
  interface HTMLElement {
    setInnerHTML(str?: string): void;
    showElement(): void;
    hideElement(): void;
    addEvent<T extends HTMLElementEventMap, K extends keyof T>(
      type: K,
      listener: (event: T[K]) => void
    ): void;
  }
}

module _ {
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

export default _;
