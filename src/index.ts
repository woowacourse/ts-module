declare global {
  interface HTMLElement extends CustomElementProperty {}
}

interface CustomElementProperty {
  innerHTML: string;
  hide: () => void;
  show: () => void;
  addEvent: <K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, event: HTMLElementEventMap[K]) => any
  ) => void;
}

type PickResult<T extends Record<string, unknown>, K extends (keyof T)[]> = {
  [P in K[number]]: T[P];
};

type OmitResult<T extends Record<string, unknown>, K extends (keyof T)[]> = {
  [P in Exclude<keyof T, K>]: T[P];
};

type Function<T = unknown, R = unknown> = (...args: T[]) => R;

type FetchResource = string | URL | Request;

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Headers;
  body?:
    | string
    | Blob
    | ArrayBuffer
    | DataView
    | FormData
    | URLSearchParams
    | ReadableStream;
};

declare function _(selector: string): HTMLElement;

declare module _ {
  export function fetch(
    resource: FetchResource,
    options?: FetchOptions
  ): Promise<Response>;

  export function isNull(value: unknown): boolean;

  export function isNil(value: unknown): boolean;

  export function isNumber(value: unknown): boolean;

  export function isFunction(value: unknown): boolean;

  export function shuffle<T>(array: T[]): T[];

  export function pick<
    T extends Record<string, unknown>,
    K extends (keyof T)[]
  >(object: T, paths: K): PickResult<T, K>;

  export function omit<
    T extends Record<string, unknown>,
    K extends (keyof T)[]
  >(object: T, paths: K): OmitResult<T, K>;

  export function memoize(func: Function, resolver?: Function): Function;

  export function debounce(func: Function, wait: number): Function;

  export function throttle(func: Function, wait: number): Function;

  export function clickOutside(
    target: Element,
    handler: (event: MouseEvent) => any
  ): void;
}

export default _;
