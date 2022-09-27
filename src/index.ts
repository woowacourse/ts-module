import { CreateArrayWithLengthX, NumericRange } from './utils';

interface Node {
  addEvent<T extends GlobalEventHandlersEventMap, K extends keyof T>(
    eventType: K,
    eventListener: (event: T[K]) => void
  ): void;
  innerHTML: ((value: string) => void) | string;
  show: () => void;
  hidden: () => void;
}
declare function _(selector: string): Node;

module _ {
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

  export function fetch<Data>(
    url: Url,
    options?: FetchOptions
  ): Promise<Response<Data>> {}

  type Nullable<T> = T extends null ? T : never;
  export function isNull<T>(value: T): value is Nullable<T> {
    return value === null;
  }

  type Nilable<T> = T extends null | undefined ? T : never;
  export function isNil<T>(value: T): value is Nilable<T> {
    return isNull(value) || value === undefined;
  }

  type Numberable<T> = T extends number ? T : never;
  export function isNumber<T>(value: T): value is Numberable<T> {
    return typeof value === 'number';
  }

  type Functionable<T> = T extends Function ? T : never;
  export function isFunction<T>(value: T): value is Functionable<T> {
    return typeof value === 'function';
  }

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
}

export default _;
