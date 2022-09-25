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
  // export function fetch() {
  //   return {};
  // }

  export function isNull<T>(value: T): T extends null ? true : false;

  export function isNil<T>(value: T): T extends null | undefined ? true : false;

  export function isNumber<T>(value: T): T extends number ? true : false;

  export function isFunction<T>(value: T): T extends Function ? true : false;

  export function shuffle<T>(value: Array<T> | object): Array<T>;

  // ...keys로 들어올 수도 있다. 이 부분도 해결하기!
  export function pick<T, K extends keyof T>(
    obj: T,
    keys?: Array<K>
  ): Pick<T, K>;

  // ...keys로 들어올 수도 있다. 이 부분도 해결하기!
  export function omit<T, K extends keyof T>(
    obj: T,
    keys?: Array<K>
  ): Omit<T, K>;

  // export function memoize() {}

  interface DebounceOptionsType {
    leading?: boolean;
    maxWait?: number;
    trailing?: boolean;
  }

  // TODO: Function 더 구체적으로 타이핑
  export function debounce(
    func: Function,
    wait?: number,
    options?: DebounceOptionsType
  ): Function;

  interface ThrottleOptionsType {
    leading?: boolean;
    trailing?: boolean;
  }

  export function throttle(
    func: Function,
    wait?: number,
    options?: ThrottleOptionsType
  ): Function;

  // export function clickOutside() {}
}

export default _;
