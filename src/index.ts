import Dom from './libs/dom';
import libs from './libs/libs';

function _(selector: string) {
  return new Dom(selector);
}

namespace _ {
  export const isNull = libs.isNull;
  export const isNil = libs.isNil;
  export const isNumber = libs.isNumber;
  export const isFunction = libs.isFunction;
  export const shuffle = libs.shuffle;
  export const omit = libs.omit;
  export const pick = libs.pick;
  export const memoize = libs.memoize;
  export const debounce = libs.debounce;
  export const throttle = libs.throttle;
  export const clickOutside = libs.clickOutside;
}

export default _;
