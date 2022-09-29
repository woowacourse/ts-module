type UniversalIterator<T = unknown> = Iterator<T> | AsyncIterator<T>;

type UniversalIterable<T = unknown> = Iterable<T> | AsyncIterable<T>;

type Iter<T> = UniversalIterator<T> | UniversalIterable<T>;

declare interface DebounceSettings {
  leading?: boolean | undefined;
  maxWait?: number | undefined;
  trailing?: boolean | undefined;
}

declare interface DebouncedFunc<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): ReturnType<T> | undefined;
  cancel(): void;
  flush(): ReturnType<T> | undefined;
}
declare interface ThrottleSettings {
  leading?: boolean | undefined;
  trailing?: boolean | undefined;
}
