declare function _(selector: string): Node;
declare global {
  interface Node {
    setInnerHTML(value: string): void;
    setShow(): void;
    setHidden(): void;
    addEvent<K extends keyof HTMLElementEventMap, U extends unknown>(
      type: K,
      listener: (event: HTMLElementEventMap[K]) => U,
      options?: boolean | AddEventListenerOptions
    ): void;
  }
}

declare module _ {
  export function fetch(
    input: RequestInfo | URL,
    init?: RequestInit
  ): Promise<Response>;

  export function isNull<T extends unknown>(
    value: T
  ): T extends null ? true : false;

  export function isNil<T extends unknown>(
    value: T
  ): T extends undefined | null ? true : false;

  export function isNumber<T extends unknown>(
    value: T
  ): T extends number ? true : false;

  export function isFunction<T extends unknown>(
    value: T
  ): T extends Function ? true : false;

  export function shuffle<T>(array: T[]): T[];

  type PickType<T, U extends readonly (keyof T)[]> = {
    [K in U[number]]: T[K];
  };

  export function pick<
    T extends Record<string, unknown>,
    U extends (keyof T)[]
  >(object: T, paths: U): PickType<T, U>;

  type OmitType<T, U extends readonly (keyof T)[]> = {
    [K in keyof Omit<T, U[number]>]: T[K];
  };

  export function omit<
    T extends Record<string, unknown>,
    U extends (keyof T)[]
  >(object: T, paths: U): OmitType<T, U>;

  // type FunctionType<T extends unknown> = (...args: T[]) => T;
  // type ArrowFunctionType<F extends FunctionType> = (
  //   ...args: Parameters<F>
  // ) => ReturnType<F>;

  // 돌아가는 버전
  export function memoize<T extends unknown[], U extends unknown>(
    func: (...args: T) => U,
    resolver?: (...args: T) => string
  ): (...args: T) => U;

  // 원래 버전
  // export function memoize<F extends ArrowFunctionType<F>>(
  //   func: F,
  //   resolver?: (...args: Parameters<F>) => string
  // ): F;

  type DebounceOptionsType = {
    leading?: boolean;
    maxWait?: number;
    trailing?: boolean;
  };

  export function debounce<T extends unknown[], U extends unknown>(
    func: (...args: T) => U,
    wait?: number,
    options?: DebounceOptionsType
  ): (...args: T) => void;

  // export function debounce<F extends ArrowFunctionType<F>>(
  //   func: F,
  //   wait?: number,
  //   options?: DebounceOptionsType
  // ): (...args: Parameters<F>) => void;

  type ThrottleOptionsType = Omit<DebounceOptionsType, "maxWait">;

  export function throttle<T extends unknown[], U extends unknown>(
    func: (...args: T) => U,
    wait?: number,
    options?: ThrottleOptionsType
  ): (...args: T) => void;

  // export function throttle<F extends ArrowFunctionType<F>>(
  //   func: F,
  //   wait?: number,
  //   options?: ThrottleOptionsType
  // ): (...args: Parameters<F>) => void;

  export function clickOutside<T extends unknown[], U extends unknown>(
    target: Node,
    func: (...args: T) => U
  ): void;

  // export function clickOutside<F extends ArrowFunctionType<F>>(
  //   target: Node,
  //   func: F
  // ): void;
}

export default _;
