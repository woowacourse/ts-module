const cacheData = new Map()

function memoize<FunctionParameters extends Array<unknown>, FunctionReturn>(
  cacheFunction: (...args: FunctionParameters) => FunctionReturn,
  key: string = '',
) {
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
