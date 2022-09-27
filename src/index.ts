import { CreateArrayWithLengthX, NumericRange } from './utils';

interface Node {
  addEvent<T extends HTMLElementEventMap, K extends keyof HTMLElementEventMap>(
    eventType: K,
    eventListener: (event: T[K]) => void
  ): void;
  innerHTML: ((value: string) => void) | string;
  show: () => void;
  hidden: (() => void) | boolean;
}
declare function _(selector: string): Node;

declare module _ {
  export function fetch<Data>(
    url: Url,
    options?: FetchOptions
  ): Promise<Response<Data>>;

  export function isNull<T extends unknown>(
    value: T
  ): T extends null ? true : false;

  export function isNil<T extends unknown>(
    value: T
  ): T extends null | undefined ? true : false;

  export function isNumber<T extends unknown>(
    value: T
  ): T extends number ? true : false;

  export function isFunction<T extends unknown>(
    value: T
  ): T extends Function ? true : false;

  export function shuffle<T extends unknown>(value: T[]): T[];

  export function pick<T extends Record<string, unknown>, R extends keyof T>(
    obj: T,
    ...keys: R[]
  ): { [K in R]: T[K] };

  export function omit<T extends Record<string, unknown>, R extends keyof T>(
    obj: T,
    ...keys: R[]
  ): { [K in Exclude<keyof T, R>]: T[K] };

  export function memoize<T extends (...args: any[]) => any>(func: T): T;

  export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): T;

  export function throttle<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): T;

  export function clickOutside(dom: Node, func: (...args: any[]) => void): void;

  type FetchBodyType =
    | string
    | URLSearchParams
    | FormData
    | Blob
    | ArrayBuffer
    | ArrayBufferView
    | DataView;

  type Url = `http${'' | 's'}://${string}`;

  type FetchOptions = {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: FetchBodyType | null;
    headers?: Record<string, string>;
    credentials?: 'omit' | 'same-origin' | 'include';
  };

  type Response<Data> = {
    status: NumericRange<CreateArrayWithLengthX<200>, 600>;
    ok: boolean;
    statusText: string;
    url: string;
    headers: Record<string, string>;
    json: () => Promise<Data>;
  };
}

export default _;
