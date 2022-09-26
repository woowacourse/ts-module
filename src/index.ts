import __ from '../index';
type isNumberType = typeof __.isNumber;
type isNullType = typeof __.isNull;

function _(selector: string): any {
  /**
   * innerHTML() {
   * }
   *
   * show() {
   * }
   *
   * hidden() {
   * }
   *
   * addEvent() {
   * }
   */
}

module _ {
  export function fetch() {
    return {};
  }

  export const isNull: isNullType = (value) => {
    return value === null;
  };

  export function isNil() {}

  export const isNumber: isNumberType = (value) => {
    return typeof value === 'number';
  };

  export function isFunction() {}

  export function shuffle() {}

  export function pick() {}

  export function omit() {}

  export function memoize() {}

  export function debounce() {}

  export function throttle() {}

  export function clickOutside() {}
}

export default _;
