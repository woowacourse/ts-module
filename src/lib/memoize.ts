const cacheData = new Map()

function memoize<CacheFunction extends (...rest: any[]) => unknown>(
  cacheFunction: CacheFunction,
  key: string = '',
) {
  type FunctionParameters = Parameters<CacheFunction>
  type FunctionReturn = ReturnType<CacheFunction>

  const memoized = (...args: FunctionParameters): FunctionReturn => {
    const isCached = cacheData.has(cacheFunction)

    isCached === false && cacheData.set(cacheFunction, {})

    const cache: Record<string, unknown> = cacheData.get(cacheFunction)

    if (cache[key]) {
      return cache[key] as FunctionReturn
    }

    const result = cacheFunction(...args)

    cache[key] = result
    cacheData.set(cacheFunction, cache)

    return result as FunctionReturn
  }

  return memoized
}

export default memoize
