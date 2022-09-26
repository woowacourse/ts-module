import { CreateArrayWithLengthX, NumericRange } from './utils';

function _(selector: string): any {
  /**
   * innerHTML() {
   * }
   *
   * show() {
   * }
   *
   * hidden() {
   * }
   *
   * addEvent() {
   * }
   */
}

declare module _ {
  export function fetch<Data>(
    url: string,
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

  // export function isFunction() {}

  // export function shuffle() {}

  // export function pick() {}

  // export function omit() {}

  // export function memoize() {}

  // export function debounce() {}

  // export function throttle() {}

  // export function clickOutside() {}

  type FetchBodyType =
    | string
    | URLSearchParams
    | FormData
    | Blob
    | ArrayBuffer
    | ArrayBufferView
    | DataView;

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
