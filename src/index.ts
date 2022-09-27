import TQuery from "./TQuery";
import _clickOutside from "./clickOutside";
import _debounce from "./debounce";
import _fetch from "./fetch";
import _isFunction from "./isFunction";
import _isNil from "./isNil";
import _isNull from "./isNull";
import _isNumber from "./isNumber";
import _memoize from "./memoize";
import _omit from "./omit";
import _pick from "./pick";
import _shuffle from "./shuffle";
import _throtle from "./throttle";

function wtil(selector: string): TQuery {
  return new TQuery(selector);
}

module wtil {
  export const clickOutside = _clickOutside;
  export const debounce = _debounce;
  export const fetch = _fetch;
  export const isFunction = _isFunction;
  export const isNil = _isNil;
  export const isNull = _isNull;
  export const isNumber = _isNumber;
  export const memoize = _memoize;
  export const omit = _omit;
  export const pick = _pick;
  export const shuffle = _shuffle;
  export const throttle = _throtle;
}

export default wtil;
