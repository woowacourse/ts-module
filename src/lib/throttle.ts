import { PickParameterType } from '../utils'

const timeoutIDCache = new Map()

function throttle<TargetFunction extends (...args: any[]) => unknown>(
  targetFunction: TargetFunction,
  delay: number,
) {
  type ParameterType = PickParameterType<TargetFunction>

  const clearPreviousTimeout = () =>
    timeoutIDCache.has(targetFunction) && clearTimeout(timeoutIDCache.get(targetFunction))

  const timerCallback = (args: ParameterType) => () => {
    timeoutIDCache.delete(targetFunction)

    targetFunction(...args)
  }

  const throttled = (...args: ParameterType) => {
    if (timeoutIDCache.has(targetFunction)) return

    targetFunction(...args)
    clearTimeout(timeoutIDCache.get(targetFunction))

    timeoutIDCache.set(targetFunction, setTimeout(timerCallback(args), delay))
  }

  return Object.assign(throttled, {
    cancel: clearPreviousTimeout,
  })
}

export default throttle
