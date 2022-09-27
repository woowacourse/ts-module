type UniversalIterator<T = unknown> = Iterator<T> | AsyncIterator<T>;

type UniversalIterable<T = unknown> = Iterable<T> | AsyncIterable<T>;

type Iter<T> = UniversalIterator<T> | UniversalIterable<T>;

export function isIterable<T = unknown>(
  a: Iter<T> | unknown
): a is Iterable<T> {
  return typeof (a as any)?.[Symbol.iterator] === 'function';
}

export interface DebounceSettings {
  leading?: boolean | undefined;
  maxWait?: number | undefined;
  trailing?: boolean | undefined;
}

export interface DebouncedFunc<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): ReturnType<T> | undefined;
  cancel(): void;
  flush(): ReturnType<T> | undefined;
}
