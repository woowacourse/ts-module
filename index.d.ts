export {};

declare global {
  interface Element {
    addEvent: (eventType: string, handler: (event: MouseEvent) => void) => void;
  }

  function _(selector: string): Element;

  module _ {
    function isNull<T>(input: T): T extends null ? true : false;
    function isNil<T>(input: T): T extends null | undefined ? true : false;
    function isNumber<T>(input: T): T extends number ? true : false;
    function isFunction<T>(input: T): T extends Function ? true : false;
    function isFunction<T>(input: T): T extends Function ? true : false;

    function shuffle<T>(collection: T[]): T[];
    function shuffle<U extends Record<string, unknown>>(
      collection: U
    ): U[keyof U][];

    function pick<T extends Record<string, unknown>, U extends keyof T>(
      object: T,
      props?: U[]
    ): Pick<T, U>;
    function omit<T extends Record<string, unknown>, U extends keyof T>(
      object: T,
      props?: U[]
    ): Omit<T, U>;

    function memoize<T extends unknown[], U>(
      func: (...args: T) => U,
      resolver?: (...args: T) => string
    ): (...args: T) => U;
    function debounce<T extends unknown[], U>(
      func: (...args: T) => U,
      wait?: number
    ): (...args: T) => U;
    function throttle<T extends unknown[], U>(
      func: (...args: T) => U,
      wait?: number
    ): (...args: T) => U;

    function clickOutside(
      targetElement: Element,
      handler: (event: MouseEvent) => void
    ): void;
  }
}

export default _;
