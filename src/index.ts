declare global {
  interface HTMLElement extends CustomElement {}
}

class CustomElement {
  target;
  constructor(selector: string) {
    this.target = document.body.querySelector<HTMLElement>(selector);
  }

  innerHTML(html: string): void {
    if (this.target) {
      this.target.innerHTML = html;
    }
  }

  show(): void {
    if (this.target && this.target.style.display === 'none') {
      this.target.style.display = '';
    }
  }

  hidden(): void {
    if (this.target) this.target.style.display = 'none';
  }

  addEvent<K extends keyof HTMLElementEventMap>(
    eventType: K,
    callback: (this: HTMLElement, ev: HTMLElementEventMap[K]) => void
  ): void {
    if (this.target) this.target.addEventListener(eventType, callback);
  }
}

function _(selector: string): CustomElement {
  return new CustomElement(selector);
}

module _ {
  export function fetch(
    input: RequestInfo | URL,
    init?: RequestInit
  ): Promise<Response> {
    return window.fetch(input, init);
  }

  export function isNull(input: unknown): input is null {
    return input === null;
  }

  export function isNil(input: unknown): input is null | undefined {
    return input == null;
  }

  export function isNumber(input: unknown): input is number {
    return typeof input === 'number';
  }

  export function isFunction(input: unknown): input is Function {
    return typeof input === 'function';
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
