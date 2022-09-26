export type RealFunction = (...args: any) => any;

export type DebounceOptions = {
	leading?: boolean | undefined;
	maxWait?: number | undefined;
	trailing?: boolean | undefined;
};

export const isObject = (value: any) => {
	var type = typeof value;
	return value != null && (type == "object" || type == "function");
};

export type DebouncedFunc<T extends (...args: any[]) => any> = {
	(...args: Parameters<T>): ReturnType<T> | undefined;
	cancel(): void;
	flush(): ReturnType<T> | undefined;
};
