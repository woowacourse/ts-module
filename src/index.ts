import __ from '../index';
type isNumberType = typeof __.isNumber;
type isNullType = typeof __.isNull;
type isNilType = typeof __.isNil;
type shuffleType = typeof __.shuffle;

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

  export const isNil: isNilType = (value) => {
    return value === null || value === undefined;
  };

  export const isNumber: isNumberType = (value) => {
    return typeof value === 'number';
  };

  export function isFunction() {}

  export const shuffle: shuffleType = (arr) => {
    return [...arr].sort(() => 0.5 - Math.random());
  };

  export function pick() {}

  export function omit() {}

  export function memoize() {}

  export function debounce() {}

  export function throttle() {}

  export function clickOutside() {}
}

export default _;
