import selector from './lib/selector'

import isNull from './lib/isNull'
import isNil from './lib/isNil'
import isNumber from './lib/isNumber'
import isFunction from './lib/isFunction'
import shuffle from './lib/shuffle'
import pick from './lib/pick'
import omit from './lib/omit'
import memoize from './lib/memoize'
import debounce from './lib/debounce'
import throttle from './lib/throttle'
import fetch from './lib/fetch'

const _ = Object.assign(selector, {
  isNull,
  isNil,
  isNumber,
  isFunction,
  shuffle,
  pick,
  omit,
  memoize,
  debounce,
  throttle,
  fetch,
})

export default _
