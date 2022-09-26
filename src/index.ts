module _ {
  export function fetch() {}

  /**
   * `value` 가 `null` 인지 체크한다.
   */
  export function isNull(value: any): value is null {
    return value === null;
  }

  /**
   * `value` 가 `null` 혹은 `undefined`인지 체크한다.
   */

  export function isNil(value: any): value is null | undefined {
    return value == null;
  }

  /**
   * `value`가 `Number` 원시값 또는 객체로 분류될 수 있는지 체크한다.(Infinity, -Infinity, NaN이 포함된다)
   */
  export function isNumber(value: any): value is number {
    return typeof value === "number";
  }

  /**
   *  `value`가 `Function` 객체로 분류되는지 체크한다.
   */
  export function isFunction(value: any): value is (...args: any[]) => any {
    return typeof value === "function";
  }

  /**
   * 무작위로 섞인 값들의 배열을 생성한다.
   */
  export const shuffle = <T>(array: T[]): T[] => {
    const length = array === null ? 0 : array.length;
    if (!length) {
      return [];
    }
    let index = -1;
    const lastIndex = length - 1;
    const result = [...array];
    while (++index < length) {
      const rand = index + Math.floor(Math.random() * (lastIndex - index + 1));
      const value = result[rand];
      result[rand] = result[index];
      result[index] = value;
    }
    return result;
  };

  /**
   * 선택한 'object' 속성만으로 구성된 객체를 만든다.
   */
  export function pick<
    T extends Record<string, unknown>,
    K extends (keyof T)[]
  >(object: T, path: K): PickResult<T, K> {
    let newObj = {} as PickResult<T, K>;
    path.forEach((key) => {
      newObj[key] = object[key];
    });
    return newObj;
  }

  type PickResult<T extends Record<string, unknown>, K extends (keyof T)[]> = {
    [P in K[number]]: T[P];
  };

  /**
   * 선택한 'object' 속성이 제외되어 구성된 객체를 만든다.
   */
  export function omit<
    T extends Record<string, unknown>,
    K extends (keyof T)[]
  >(object: T, path: K): OmitResult<T, K> {
    let newObj = { ...object };
    path.forEach((key) => {
      delete newObj[key];
    });
    return newObj;
  }

  type OmitResult<T extends Record<string, unknown>, K extends (keyof T)[]> = {
    [P in keyof Omit<T, K[number]>]: T[P];
  };

  /**
   * 'func'의 결과를 메모하는 함수를 만든다.
   */
  export function memoize(func: Function, resolver: Function): Function {
    if (
      typeof func !== "function" ||
      (resolver != null && typeof resolver !== "function")
    ) {
      throw new TypeError("Expected a function");
    }
    const memoized = function (this: any, args: unknown[]) {
      const key = resolver ? resolver.apply(this, args) : args[0];
      const cache = memoized.cache;

      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = func.apply(this, args);
      memoized.cache = cache.set(key, result) || cache;
      return result;
    };
    memoized.cache = new Map();
    return memoized;
  }

  /**
   * 'func' 호출을 'wait' 이후까지 지연시키는 디바운스 함수를 만든다.
   */
  export function debounce<T extends Function>(
    func: T,
    wait: number,
    options: Record<"leading" | "trailing", number>
  ): T {
    return func;
  }

  /**
   * "wait" 밀리초마다 최대 한 번(또는 브라우저 프레임당 한 번) 'func'를 호출하는 쓰로틀 함수를 만든다.
   */
  export function throttle(
    func: Function,
    wait: number,
    options: Record<"leading" | "trailing", number>
  ): Function {
    return func;
  }

  export function clickOutside() {}
}

export default _;
