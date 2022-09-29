export declare type DebounceOptions = {
    leading?: boolean | undefined;
    maxWait?: number | undefined;
    trailing?: boolean | undefined;
};
export declare type DebouncedFunc<T extends (...args: any[]) => any> = {
    (...args: Parameters<T>): ReturnType<T> | undefined;
    cancel(): void;
    flush(): ReturnType<T> | undefined;
};
