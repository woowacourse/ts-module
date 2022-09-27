import { HTTP_METHOD } from "./constants";

export type Nill = null | undefined;

export type DefinitelyFunction<T = any> = (...args: any) => T;

export type DefinitelyObject<T = any> = Record<string, T>;

export type PickResult<T extends DefinitelyObject, K extends (keyof T)[]> = {
  [P in K[number]]: T[P];
};

export type OmitResult<T extends DefinitelyObject, K extends (keyof T)[]> = {
  [P in keyof Omit<T, K[number]>]: T[P];
};

export type DebounceThrottleOptions = Record<"leading" | "trailing", boolean>;

export type HTTPMethod = keyof typeof HTTP_METHOD;

export type FetchOptions = {
  method?: HTTPMethod;
  headers?: DefinitelyObject;
  body?: string;
  credentials?: string;
};

export type FetchResponse<T> = {
  status: number;
  statusText: string;
  ok: boolean;
  headers: Headers;
  url: string;
  data: T;
};

export type GetArgumentsTypeByIndex<
  T extends DefinitelyFunction,
  K extends number
> = Parameters<T>[K];

export type DebouncedFunction<T extends DefinitelyFunction> = (
  ...args: Parameters<T>
) => {
  cancel: () => void;
  pending: () => boolean;
  flush: () => T;
};
