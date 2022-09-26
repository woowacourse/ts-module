const cacheData = new Map();

function memoize<CacheFunction extends (...rest: any[]) => unknown>(cacheFunction: CacheFunction, key: string = "") {
  type ParameterType = CacheFunction extends (...args: infer CacheParameters) => unknown ? CacheParameters : never;
  type ReturnType = CacheFunction extends (...args: any[]) => infer CacheReturn ? CacheReturn : never;

  const memoized = (...args: ParameterType): ReturnType => {
    if (!cacheData.has(cacheFunction)) {
      cacheData.set(cacheFunction, {});
    }

    const cache: Record<string, unknown> = cacheData.get(cacheFunction);

    if (cache[key]) return cache[key] as ReturnType;

    const result = cacheFunction(...args);

    cache[key] = result;
    cacheData.set(cacheFunction, cache);

    return result as ReturnType;
  };

  return memoized;
}

export default memoize;
