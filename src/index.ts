declare function _(selector: string): HTMLElement | null;
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
  export declare function fetch<
    T extends RequestInfo | URL,
    K extends RequestInit | undefined
  >(input: T, init?: K): Promise<Response>;

  export declare function isNull<T extends unknown>(
    value: T
  ): T extends null ? true : false;

  export declare function isNil<T extends unknown>(
    value: T
  ): T extends undefined | null ? true : false;

  export declare function isNumber<T extends unknown>(
    value: T
  ): T extends number ? true : false;

  export declare function isFunction<T extends unknown>(
    value: T
  ): T extends Function ? true : false;

  export declare function shuffle<T extends Array<unknown>>(value: T): T;

  export declare function pick<
    T extends Record<string | number, unknown>,
    K extends keyof T
  >(obj: T, array: K[]): Record<string | number, unknown>;

  export declare function omit<
    T extends Record<string | number, unknown>,
    K extends keyof T
  >(obj: T, array: K[]): Record<string | number, unknown>;

  export declare function memoize<T extends unknown[]>(
    func: (...args: T) => unknown
  ): unknown;

  export declare function debounce<T extends unknown[]>(
    func: (...args: T) => unknown,
    delay: number
  ): Function;

  export declare function throttle<T extends unknown[]>(
    func: (...args: T) => unknown,
    delay: number
  ): Function;

  export declare function clickOutside<T extends HTMLElement>(target: T): void;
}

export default _;
