import { NumberRange, CreateArray } from "./util";

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
  ): T extends undefined | null ? true : false;

  export function isNumber<T extends unknown>(
    value: T
  ): T extends number ? true : false;

  export function isFunction<T extends unknown>(
    value: T
  ): T extends Function ? true : false;

  export function shuffle<T extends unknown>(arr: T[]): T[];

  export function pick<
    T extends Record<string, unknown>,
    R extends (keyof T)[]
  >(obj: T, selectedKeyArray: R): PickResponse<T, R>;

  export function omit() {}

  export function memoize() {}

  export function debounce() {}

  export function throttle() {}

  export function clickOutside() {}

  type FetchBodyType =
    | string
    | URLSearchParams
    | FormData
    | Blob
    | ArrayBuffer
    | ArrayBufferView
    | DataView;

  type FetchOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: FetchBodyType | null;
    headers?: Record<string, string>;
    credentials?: "omit" | "same-origin" | "include";
  };

  type Response<Data> = {
    status: NumberRange<CreateArray<200>, 600>; // 200 ~ 600이하의 status code가 들어올수 있도록 하는 타입
    ok: boolean;
    statusText: string;
    url: string;
    headers: Record<string, string>;
    json: () => Promise<Data>;
  };

  type PickResponse<
    T extends Record<string, unknown>,
    R extends readonly (keyof T)[]
  > = {
    [K in R[number]]: T[K];
  };
}

export default _;
