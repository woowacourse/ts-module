import __ from '../index';
type isNumberType = typeof __.isNumber;
type isNullType = typeof __.isNull;
type isNilType = typeof __.isNil;
type shuffleType = typeof __.shuffle;
type PickType = typeof __.pick;
type OmitType = typeof __.omit;

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

  export const pick: PickType = (obj, targets) => {
    // TODO: any말고 targets에 대한 타입들이 들어가야한다...
    // NOTE: as로 단언해준 이유는, 무조건 pick 함수의 반환 타입이 들어가는 게 확실하기 때문에 해주었습니다.
    const pickedObj = {} as Pick<typeof obj, any>;
    // NOTE: targets인자에 'target'나 ['target1', 'target2']가 올 수 있기 때문에 분기처리 해주었습니다.
    if (typeof targets === 'string') pickedObj[targets] = obj[targets];
    if (targets instanceof Object) {
      targets.forEach((target) => {
        pickedObj[target] = obj[target];
      });
    }

    return pickedObj;
  };

  export const omit: OmitType = (obj, targets) => {
    const omittedObj = { ...obj };
    if (typeof targets === 'string') {
      delete omittedObj[targets];
    }
    if (targets instanceof Array) {
      targets.forEach((target) => {
        delete omittedObj[target];
      });
    }

    return omittedObj;
  };

  export function memoize() {}

  export function debounce() {}

  export function throttle() {}

  export function clickOutside() {}
}

export default _;
