import { CustomElement, MemoizedFunction } from './@types/types';

function _(selector: string): CustomElement {
  const element = document.body.querySelector<HTMLElement>(selector);

  if (!element) {
    throw new Error('존재하지 않는 요소입니다.');
  }

  const innerHTML = (content: string): void => {
    element.innerHTML = content;
  };

  const show = (): void => {
    element.style.display = 'none';
  };

  const hidden = (): void => {
    element.style.display = 'block';
  };

  const addEvent = <K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, event: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ): void => {
    element.addEventListener(type, listener, options);
  };

  return {
    element,
    innerHTML,
    show,
    hidden,
    addEvent,
  };
}

module _ {
  export function fetch(
    input: RequestInfo | URL,
    init?: RequestInit,
  ): Promise<Response> {
    return window.fetch(input, init);
  }

  /**
   * 값이 null인 경우엔 true, 아닌 경우엔 false를 반환
   * @param {unknown} value
   * @returns {boolean} true 또는 false를 반환
   */
  export function isNull(value: unknown): value is null {
    return value === null;
  }

  /**
   * 값이 null 또는 undefined인 경우엔 true, 아닌 경우엔 false를 반환
   * @param {unknown} value
   * @returns {boolean} true 또는 false를 반환
   */
  export function isNil(value: unknown): value is null | undefined {
    return value == null;
  }

  /**
   * 값의 타입이 number인 경우엔 true, 아닌 경우엔 false를 반환
   * @param {unknown} value
   * @returns {boolean} true 또는 false를 반환
   */
  export function isNumber(value: unknown): value is Number {
    return typeof value === 'number';
  }

  /**
   * 값의 타입이 function인 경우엔 true, 아닌 경우엔 false를 반환
   * @param {unknown} value
   * @returns {boolean} true 또는 false를 반환
   */
  export function isFunction(value: unknown): value is Function {
    return typeof value === 'function';
  }

  /**
   * 받은 배열 내부 순서를 무작위로 섞어 반환
   * @param {T[]} array
   * @returns {T[]} 무작위로 섞은 새로운 배열을 반환
   */
  export function shuffle<T>(array: T[]): T[] {
    const length = isNil(array) ? 0 : array.length;

    if (!length) {
      return [];
    }

    const result = [...array];

    for (let idx = array.length - 1; idx >= 0; idx--) {
      const randomIdx = Math.floor(Math.random() * (length - idx));

      const tmp = result[randomIdx];
      result[randomIdx] = result[idx];
      result[idx] = tmp;
    }

    return result;
  }

  function existInvalidKey<T>(
    object: CustomObject<T>,
    keys: ObjectKeyType<CustomObject<T>>[],
  ): boolean {
    return !keys.every(key => key in object);
  }

  /**
   * 객체에서 원하는 키, 값만 뽑아 반환
   * @param {CustomObject<T>} object
   * @param {...(ObjectKeyType<CustomObject<T>>|ObjectKeyType<CustomObject<T>>[])} [keys]
   * @returns {CustomObject<T>} 전달된 키, 값만 뽑아 구성한 새로운 객체를 반환
   */
  export function pick<T>(
    object: CustomObject<T>,
    ...keys: ObjectKeyType<CustomObject<T>>[]
  ): CustomObject<T> {
    if (isNil(object) || existInvalidKey(object, keys)) {
      return {};
    }

    const result: CustomObject<T> = {};

    keys.forEach(path => {
      result[path] = object[path];
    });

    return result;
  }

  /**
   * 객체에서 원하는 키, 값만 제외하여 반환
   * @param {CustomObject<T>} object
   * @param {...(ObjectKeyType<CustomObject<T>>|ObjectKeyType<CustomObject<T>>[])} [keys]
   * @returns {CustomObject<T>} 전달된 키, 값을 제외하여 구성한 새로운 객체를 반환
   */
  export function omit<T>(
    object: CustomObject<T>,
    ...keys: ObjectKeyType<CustomObject<T>>[]
  ): CustomObject<T> {
    if (isNil(object) || existInvalidKey(object, keys)) {
      return {};
    }

    const result = Object.assign({}, object);

    Object.keys(result).forEach(key => {
      if (keys.includes(key)) {
        delete result[key];
      }
    });

    return result;
  }

  /**
   * 기록이 있는 값은 저장된 값을, 새롭게 들어온 값은 저장 후 반환하는 함수를 반환
   * @param {T} originFunc
   * @returns {MemoizedFunction<T>} 메모이제이션이 적용된 함수를 반환
   */
  export function memoize<T extends CustomFunction>(
    originFunc: T,
  ): MemoizedFunction<T> {
    function memoizedFunc(key: string, ...args: unknown[]): ReturnType<T> {
      if (memoizedFunc.cache[key]) {
        console.log('memoized');

        return memoizedFunc.cache[key];
      }

      return (memoizedFunc.cache[key] = originFunc(...args));
    }

    const cache: CustomObject<ReturnType<T>> = {};
    memoizedFunc.cache = cache;

    return memoizedFunc;
  }

  /**
   * 마지막 요청이 들어왔을 때부터 지정된 시간동안 추가 요청이 들어오지 않을 경우 해당 요청의 콜백 함수를 실행하는 함수 반환
   * @param {Function} func
   * @param {number} wait
   * @returns {Function} 디바운스가 적용된 함수를 반환
   */
  export function debounce(func: Function, wait: number): () => void {
    let timeout: ReturnType<typeof setTimeout>;

    function debouncedFunc() {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        func.apply(typeof func, arguments);
      }, wait);
    }

    return debouncedFunc;
  }

  /**
   * 지정된 시간 간격으로 콜백 함수를 실행하는 함수 반환
   * @param {Function} func
   * @param {number} wait
   * @returns {Function} 쓰로틀링이 적용된 함수를 반환
   */
  export function throttle(func: Function, wait: number): () => void {
    let waiting = false;

    function throttledFunc() {
      if (waiting) return;

      func.apply(typeof func, arguments);
      waiting = true;

      setTimeout(() => {
        waiting = false;
      }, wait);
    }

    return throttledFunc;
  }

  /**
   * 클릭 이벤트가 지정한 엘리먼트 기준으로 밖에서 발생했는지를 반환
   * @param {HTMLElement} element
   * @param {EventTarget} eventTarget
   * @returns {boolean} true 또는 false를 반환
   */
  export function clickOutside(
    element: HTMLElement,
    eventTarget: EventTarget,
  ): boolean {
    return !element.contains(eventTarget as HTMLElement);
  }
}

export default _;
