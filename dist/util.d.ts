import { HTTP_METHOD } from "./constants";
export declare type Nill = null | undefined;
export declare type DefinitelyFunction<T = any, K = any> = (...args: T[]) => K;
export declare type DefinitelyObject<T = any> = Record<string, T>;
export declare type PickResult<T extends Record<string, any>, K extends (keyof T)[]> = {
    [P in K[number]]: T[P];
};
export declare type OmitResult<T extends Record<string, any>, K extends (keyof T)[]> = {
    [P in keyof Omit<T, K[number]>]: T[P];
};
export declare type DebounceThrottleOptions = Record<"leading" | "trailing", number>;
export declare type HTTPMethod = keyof typeof HTTP_METHOD;
export declare type FetchOptions = {
    method?: HTTPMethod;
    headers?: DefinitelyObject;
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
