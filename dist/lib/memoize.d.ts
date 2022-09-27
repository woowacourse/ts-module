declare function memoize<CacheFunction extends (...rest: any[]) => unknown>(cacheFunction: CacheFunction, key?: string): (...args: Parameters<CacheFunction>) => ReturnType<CacheFunction>;
export default memoize;
