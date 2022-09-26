import { PickParameterType, PickReturnType } from '../utils'

const cacheData = new Map()

function memoize<CacheFunction extends (...rest: any[]) => unknown>(
  cacheFunction: CacheFunction,
  key: string = '',
) {
  type ParameterType = PickParameterType<CacheFunction>
  type ReturnType = PickReturnType<CacheFunction>

  const memoized = (...args: ParameterType): ReturnType => {
    const isCached = cacheData.has(cacheFunction)

    isCached === false && cacheData.set(cacheFunction, {})

    const cache: Record<string, unknown> = cacheData.get(cacheFunction)

    if (cache[key]) {
      return cache[key] as ReturnType
    }

    const result = cacheFunction(...args)

    cache[key] = result
    cacheData.set(cacheFunction, cache)

    return result as ReturnType
  }

  return memoized
}

export default memoize
