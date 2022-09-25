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

  /**
   * @param value
   * @returns return true if value is null
   */
  export function isNull(value: unknown): value is null {
    return value === null;
  }

  /**
   *
   * @param value
   * @returns return true if value is null or false
   */
  export function isNil(value: unknown): value is null | undefined {
    return value == null;
  }

  /**
   *
   * @param value
   * @returns return true if type of value is primitive number
   */
  export function isNumber(value: unknown): value is number {
    return typeof value === "number";
  }

  /**
   * @param value
   * @returns return true if type of value is function
   */
  export function isFunction(
    value: unknown
  ): value is (...args: unknown[]) => unknown {
    return typeof value === "function";
  }

  /**
   * @param array
   * @returns shuffled array which has same type of param array
   * @example shuffle([1, 2, 3, 4]) => [2, 4, 3, 1]
   * 여러 타입이 담긴 array는 우선 생각 안함. array 내의 type이 모두 동일하다고 하고 구현
   * 매개변수로 depth가 1인 flat한 배열만 들어온다고 가정
   */
  export function shuffle<T>(array: T[]): T[] {
    const copyArray = [...array];
    const arrayLength = array.length;

    if (arrayLength <= 1) return array;

    for (let i = 0; i < arrayLength; i++) {
      const rand = i + Math.floor(Math.random() * (arrayLength - i));
      const value = copyArray[rand];
      copyArray[rand] = copyArray[i];
      copyArray[i] = value;
    }

    return copyArray;
  }

  export function pick<T extends Record<string, unknown>, R extends keyof T>(
    object: T,
    keys: R[]
  ): PickResult<T, R> {
    const result = {} as PickResult<T, R>;
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      result[key] = object[key];
    }

    return result;
  }

  export function omit() {}

  export function memoize() {}

  export function debounce() {}

  export function throttle() {}

  export function clickOutside() {}
}

type PickResult<T, K extends keyof T> = {
  [k in K]: T[k];
};

export default _;
