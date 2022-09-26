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

declare function _(selector: string): Node;

declare module _ {
  export function fetch<Data>(
    url: string,
    options?: FetchOptions
  ): Promise<Response<Data>>;

  // export function isNull() {}

  // export function isNil() {}

  // export function isNumber() {}

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
