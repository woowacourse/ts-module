class CustomElement {
  element;
  constructor(selector: string) {
    this.element = document.body.querySelector<HTMLElement>(selector);
  }

  innerHTML(HTMLString: string): void {
    if (_.isNull(this.element)) {
      throw "Invalid Element";
    }
    this.element.innerHTML = HTMLString;
  }

  show() {
    if (_.isNull(this.element)) {
      throw "Invalid Element";
    }
    this.element.style.display = "block";
  }

  hide() {
    if (_.isNull(this.element)) {
      throw "Invalid Element";
    }
    this.element.style.display = "none";
  }

  addEvent<T extends keyof HTMLElementEventMap>(
    type: T,
    listener: (event: HTMLElementEventMap[T]) => void
  ) {
    if (_.isNull(this.element)) {
      throw "Invalid Element";
    }

    this.element.addEventListener(type, listener);
  }
}

function _(selector: string): CustomElement {
  const customElement = new CustomElement(selector);

  return customElement;
}

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

  export function isNil(value: any): value is Nill {
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
  export function isFunction(value: any): value is DefinitelyFunction {
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
  export function pick<T extends DefinitelyObject, K extends (keyof T)[]>(
    object: T,
    path: K
  ): PickResult<T, K> {
    let newObj = { ...object };
    Object.keys(object).forEach((key) => {
      if (path.indexOf(key) === -1) {
        delete newObj[key];
      }
    });
    return newObj;
  }

  /**
   * 선택한 'object' 속성이 제외되어 구성된 객체를 만든다.
   */
  export function omit<T extends DefinitelyObject, K extends (keyof T)[]>(
    object: T,
    path: K
  ): OmitResult<T, K> {
    let newObj = { ...object };
    path.forEach((key) => {
      delete newObj[key];
    });
    return newObj;
  }

  /**
   * 'func'의 결과를 메모하는 함수를 만든다.
   */
  export function memoize(
    func: DefinitelyFunction,
    resolver: DefinitelyFunction
  ): DefinitelyFunction {
    const memoized = function (this: any, args: any) {
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
  export function debounce<T extends DefinitelyFunction>(
    func: T,
    wait: number,
    options: DebounceThrottleOptions
  ): T {
    return func;
  }

  /**
   * "wait" 밀리초마다 최대 한 번(또는 브라우저 프레임당 한 번) 'func'를 호출하는 쓰로틀 함수를 만든다.
   */
  export function throttle(
    func: DefinitelyFunction,
    wait: number,
    options: DebounceThrottleOptions
  ): DefinitelyFunction {
    return func;
  }

  /**
   * 클릭된 영역(eventTarget)이 innerElement 에 포함 되어있는지 확인한다.
   */
  export function clickOutside(
    eventTarget: HTMLElement,
    innerElement: HTMLElement
  ): boolean {
    return !innerElement.contains(eventTarget);
  }

  type Nill = null | undefined;

  type DefinitelyFunction<T = any, K = any> = (...args: T[]) => K;

  type DefinitelyObject<T = any> = Record<string, T>;

  type PickResult<T extends Record<string, any>, K extends (keyof T)[]> = {
    [P in K[number]]: T[P];
  };

  type OmitResult<T extends Record<string, any>, K extends (keyof T)[]> = {
    [P in keyof Omit<T, K[number]>]: T[P];
  };

  type DebounceThrottleOptions = Record<"leading" | "trailing", number>;
}

export default _;
