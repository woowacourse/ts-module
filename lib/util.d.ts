import { HTTP_METHOD } from "./constants";
export declare type Nill = null | undefined;
export declare type SoundFunction<T = any> = (...args: any) => T;
export declare type SoundObject<T = any> = Record<string, T>;
export declare type PickResult<T extends SoundObject, K extends (keyof T)[]> = {
    [P in K[number]]: T[P];
};
export declare type OmitResult<T extends SoundObject, K extends (keyof T)[]> = {
    [P in keyof Omit<T, K[number]>]: T[P];
};
export declare type DebounceThrottleOptions = Record<"leading" | "trailing", boolean>;
export declare type HTTPMethod = keyof typeof HTTP_METHOD;
export declare type FetchOptions = {
    method?: HTTPMethod;
    headers?: SoundObject;
    body?: string;
    credentials?: string;
};
export declare type FetchResponse<T> = {
    status: number;
    statusText: string;
    ok: boolean;
    headers: Headers;
    url: string;
    data: T;
};
export declare type GetArgumentsTypeByIndex<T extends SoundFunction, K extends number> = Parameters<T>[K];
export declare type DebouncedFunction<T extends SoundFunction> = (...args: Parameters<T>) => {
    cancel: () => void;
    pending: () => boolean;
    flush: () => T;
};
