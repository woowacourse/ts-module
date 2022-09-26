import { PickParameterType } from '../utils'

const timeoutIDCache = new Map()

function debounce<TargetFunction extends (...args: any[]) => unknown>(
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

  const debounced = (...args: ParameterType) => {
    clearPreviousTimeout()

    timeoutIDCache.set(targetFunction, setTimeout(timerCallback(args), delay))
  }

  return Object.assign(debounced, {
    cancel: clearPreviousTimeout,
  })
}

export default debounce
