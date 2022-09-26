import { NumberRange, CreateArray } from "./util";

declare function _(selector: string): Node;
declare global {
  interface Node {
    addEvent<T extends HTMLElementEventMap, K extends keyof T>(
      eventType: K,
      callback: (event: T[K]) => void
    ): void;
    setInnerHTML(value: string): void;
    setShow(): void;
    setHidden(): void;
  }
}

module _ {
  export function fetch<Data>(
    url: Url,
    options?: FetchOptions
  ): Promise<Response<Data>> {}

  export function isNull<T extends unknown>(value: T): boolean {
    return value === null;
  }

  export function isNil<T extends unknown>(value: T): boolean {
    return value === undefined || value === null;
  }

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

  export function omit<
    T extends Record<string, unknown>,
    R extends (keyof T)[]
  >(obj: T, selectedKeyArray: R): OmitResponse<T, R>;

  export function memoize<T extends unknown[], K extends unknown>(
    func: (...args: T) => K,
    resolver?: (...args: T) => string
  ): (...args: T) => K;

  export function debounce<T extends unknown[]>(
    func: (...args: T) => void,
    wait: number,
    options?: DebounceOptions
  ): (...args: T) => void;

  export function throttle<T extends unknown[]>(
    func: (...args: T) => void,
    wait: number
  ): (...args: T) => void;

  export function clickOutside(
    target: Node,
    func: (...args: unknown[]) => void
  ): void;

  type FetchBodyType =
    | string
    | URLSearchParams
    | FormData
    | Blob
    | ArrayBuffer
    | ArrayBufferView
    | DataView;

  type Url = `http${"s" | ""}://${string}`;

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

  type OmitResponse<
    T extends Record<string, unknown>,
    R extends readonly (keyof T)[]
  > = {
    [K in keyof Omit<T, R[number]>]: T[K];
  };

  type DebounceOptions = {
    leading?: boolean;
    trailing?: boolean;
  };
}

export default _;
