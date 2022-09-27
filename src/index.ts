interface SelectedElement extends HTMLElement {
  _innerHTML: () => string;
  show: () => void;
  _hidden: () => void;
  addEvent: <T extends keyof HTMLElementEventMap>(
    event: T,
    eventHandler: (event: HTMLElementEventMap[T]) => void
  ) => void;
}

interface DebounceOptions {
  leading: boolean;
  trailing: boolean;
  maxWait: number;
}

interface ThrottleOptions extends DebounceOptions {}

function _(selector: string) {
  const element = document.querySelector(selector) as SelectedElement;

  if (!element) {
    throw Error('해당 element를 찾을 수 없습니다.');
  }

  element.show = () => {
    element.hidden = false;
  };

  element._hidden = () => {
    element.hidden = true;
  };

  element._innerHTML = () => {
    return element.innerHTML;
  };

  element.addEvent = <T extends keyof HTMLElementEventMap>(
    eventType: T,
    eventHandler: (event: HTMLElementEventMap[T]) => void
  ) => {
    element.addEventListener(eventType, eventHandler);
  };

  return element;
}

module _ {
  /**
   * 서버에 네트워크 요청을 보내고 새로운 데이터를 받아올 수 있습니다.
   *
   * @param {string} url 리소스의 경로를 넣습니다.
   *
   * @returns {Promise<Response>} 요청에 대한 응답을 반환합니다.
   */
  export function fetch(url: string): Promise<Response> {
    return window.fetch(url);
  }

  /**
   * 인자로 들어온 값의 타입이 `null`인지 확인합니다.
   *
   * @param {unknown} value `null` 타입이 맞는지 확인하고 싶은 값을 넣습니다.
   *
   * @returns {value is null} null 타입이 맞다면 `true`, 아니면 `false`를 반환합니다.
   */
  export function isNull(value: unknown): value is null {
    return value === null ? true : false;
  }

  /**
   * 인자로 들어온 값이 `null` 혹은 `undefined`인지 확인합니다.
   *
   * @param {unknown} value `null` 혹은 `undefined`인지 확인하고 싶은 값을 넣습니다.
   *
   * @returns {boolean} `null` 혹은 `undefined`이 맞다면 `true`, 아니면 `false`를 반환합니다.
   */
  export function isNil(value: unknown): value is null | undefined {
    return value === null || value === undefined ? true : false;
  }

  /**
   * 인자로 들어온 값이 `number` 타입인지 확인합니다.
   *
   * @param {unknown} value `number` 타입인지 확인하고 싶은 값을 넣습니다.
   *
   * @returns {boolean} `number` 타입이 맞다면 `true`, 아니면 `false`를 반환합니다.
   */
  export function isNumber(value: unknown): value is number {
    return typeof value === 'number' ? true : false;
  }

  /**
   * 인자로 들어온 값이 `function` 타입인지 확인합니다.
   *
   * @param {unknown} value `function` 타입인지 확인하고 싶은 값을 넣습니다.
   *
   * @returns {boolean} `function` 타입이 맞다면 `true`, 아니면 `false`를 반환합니다.
   */
  export function isFunction(value: unknown): value is Function {
    return typeof value === 'function' ? true : false;
  }

  /**
   * 인자로 들어온 배열의 요소에 랜덤으로 인덱스를 배정합니다.
   *
   * @param {Array} array 인덱스를 섞을 배열을 넣습니다.
   *
   * @returns {Array} 인덱스를 섞은 배열을 반환합니다.
   */
  export function shuffle<T>(array: Array<T>): Array<T> {
    return array.sort(() => Math.random() - 0.5);
  }

  /**
   * 첫번째 인자로 들어온 객체에서 두번째로 들어온 프로퍼티만 가지는 객체를 반환합니다.
   *
   * @param {T extends object} object 대상 객체를 넣습니다.
   * @param {Array<keyof T> | keyof T} target 반환할 객체가 가질 프로퍼티 이름을 넣습니다.
   *
   * @returns {Partial<T>} 필요한 프로퍼티만을 갖는 객체를 반환합니다.
   */
  export function pick<T extends object, K extends Array<keyof T> | keyof T>(
    object: T,
    target: K
  ): Partial<T> {
    const pickedObject = object;

    if (!Array.isArray(target)) {
      for (const key in pickedObject) {
        if (key === String(target)) {
          continue;
        }
        delete pickedObject[key];
      }
    } else {
      for (const key in pickedObject) {
        if (target.map(target => String(target)).includes(key)) {
          continue;
        }
        delete pickedObject[key];
      }
    }

    if (Array.isArray(pickedObject)) {
      return pickedObject.filter(n => n) as T;
    }

    return pickedObject;
  }

  /**
   * 첫번째 인자로 들어온 객체에서 두번째로 들어온 프로퍼티를 제외한 객체를 반환합니다.
   *
   * @param {T extends object} object 대상 객체를 넣습니다.
   * @param {Array<keyof T> | keyof T} target 반환할 객체에서 제외시킬 프로퍼티 이름을 넣습니다.
   *
   * @returns {Partial<T>} 필요한 프로퍼티만을 갖는 객체를 반환합니다.
   */
  export function omit<T extends object>(
    object: T,
    target: Array<keyof T> | keyof T
  ): Partial<T> {
    const omittedObject = object;

    if (typeof target === 'object') {
      for (const value of target) {
        delete omittedObject[value];
      }
    } else {
      delete omittedObject[target];
    }

    if (Array.isArray(omittedObject)) {
      return omittedObject.filter(n => n) as T;
    }

    return omittedObject;
  }

  /**
   * 이전 계산 값을 메모리에 저장해, 같은 계산 반복을 제거합니다.
   *
   * @param {Function} func 반환값을 memorized 할 함수를 넣습니다.
   * @param {Function} resolver 캐시 키 역할을 할 함수를 넣습니다.
   *
   * @returns {Function} memorized된 function을 반환합니다.
   */
  memoize.Cache = Map;

  export function memoize(func: Function, resolver?: Function): Function {
    if (
      typeof func !== 'function' ||
      (resolver != null && typeof resolver !== 'function')
    ) {
      throw new TypeError('Expected a function');
    }
    const memoized = function (this: Function, ...args: unknown[]) {
      const key = resolver ? resolver.apply(this, args) : args[0];
      const cache = memoized.cache;

      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = func.apply(this, args);
      memoized.cache = cache.set(key, result) || cache;
      return result;
    };
    memoized.cache = new (memoize.Cache || Map)();
    return memoized;
  }

  /**
   * 첫번째 인자로 들어온 함수가 반복돼서 실행되는 동안 강제적으로 함수를 대기시킵니다.
   * 만약 두번째 인자로 들어온 시간만큼 함수의 반복이 없는 경우 함수를 실행시킵니다.
   *
   * @param {Function} func debounce 할 함수를 넣습니다.
   * @param {number} wait 함수의 실행을 재개할 시간을 넣습니다. (단위 ms)
   * @param {DebounceOptions} options debounce에 적용할 옵션을 넣습니다.
   *
   * @returns {Function} debounce 처리된 함수를 반환합니다.
   */
  export function debounce(
    func: Function,
    wait: number,
    options?: DebounceOptions
  ): Function {
    const root = globalThis;
    let lastArgs: unknown,
      lastThis: Function | undefined,
      maxWait: number | undefined,
      result: unknown,
      timerId: number | undefined,
      lastCallTime: number | undefined;

    let lastInvokeTime = 0;
    let leading = false;
    let maxing = false;
    let trailing = true;

    const useRAF =
      !wait && wait !== 0 && typeof root.requestAnimationFrame === 'function';

    if (typeof func !== 'function') {
      throw new TypeError('Expected a function');
    }
    wait = +wait || 0;
    if (options && isObject(options)) {
      leading = !!options.leading;
      maxing = 'maxWait' in options;
      maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait;
      trailing = 'trailing' in options ? !!options.trailing : trailing;
    }

    function isObject(value: unknown) {
      const type = typeof value;
      return value != null && (type === 'object' || type === 'function');
    }

    function invokeFunc(time: number) {
      const args = lastArgs;
      const thisArg = lastThis;

      lastArgs = lastThis = undefined;
      lastInvokeTime = time;
      result = func.apply(thisArg, args);
      return result;
    }

    function startTimer(pendingFunc: FrameRequestCallback, wait: number) {
      if (useRAF) {
        root.cancelAnimationFrame(timerId as number);
        return root.requestAnimationFrame(pendingFunc);
      }
      return setTimeout(pendingFunc, wait);
    }

    function cancelTimer(id: number) {
      if (useRAF) {
        return root.cancelAnimationFrame(id);
      }
      clearTimeout(id);
    }

    function leadingEdge(time: number) {
      lastInvokeTime = time;
      timerId = startTimer(timerExpired, wait);

      return leading ? invokeFunc(time) : result;
    }

    function remainingWait(time: number) {
      const timeSinceLastCall = time - (lastCallTime as number);
      const timeSinceLastInvoke = time - lastInvokeTime;
      const timeWaiting = wait - timeSinceLastCall;

      return maxWait
        ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
        : timeWaiting;
    }

    function shouldInvoke(time: number) {
      const timeSinceLastCall = time - (lastCallTime as number);
      const timeSinceLastInvoke = time - lastInvokeTime;

      return (
        lastCallTime === undefined ||
        timeSinceLastCall >= wait ||
        timeSinceLastCall < 0 ||
        (maxWait && timeSinceLastInvoke >= maxWait)
      );
    }

    function timerExpired() {
      const time = Date.now();
      if (shouldInvoke(time)) {
        return trailingEdge(time);
      }

      timerId = startTimer(timerExpired, remainingWait(time));
    }

    function trailingEdge(time: number) {
      timerId = undefined;

      if (trailing && lastArgs) {
        return invokeFunc(time);
      }
      lastArgs = lastThis = undefined;
      return result;
    }

    function cancel() {
      if (timerId !== undefined) {
        cancelTimer(timerId);
      }
      lastInvokeTime = 0;
      lastArgs = lastCallTime = lastThis = timerId = undefined;
    }

    function flush() {
      return timerId === undefined ? result : trailingEdge(Date.now());
    }

    function pending() {
      return timerId !== undefined;
    }

    function debounced(this: Function, ...args: unknown[]) {
      const time = Date.now();
      const isInvoking = shouldInvoke(time);

      lastArgs = args;
      lastThis = this;
      lastCallTime = time;

      if (isInvoking) {
        if (timerId === undefined) {
          return leadingEdge(lastCallTime);
        }
        if (maxing) {
          timerId = startTimer(timerExpired, wait);
          return invokeFunc(lastCallTime);
        }
      }
      if (timerId === undefined) {
        timerId = startTimer(timerExpired, wait);
      }
      return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    debounced.pending = pending;
    return debounced;
  }

  /**
   * 첫번째 인자로 들어온 함수를, 두번째 인자로 들어온 주기마다 무조건 실행되도록 throttle을 겁니다.
   * debounce와는 다르게 함수 실행 주기를 방해하지는 않습니다.
   *
   * @param {Function} func throttle 할 함수를 넣습니다.
   * @param {number} wait 함수의 실행을 throttle 하는 시간을 넣습니다. (단위 ms)
   * @param {ThrottleOptions} options throttle 옵션을 설정합니다.
   *
   * @returns {Function} throttle 처리된 함수를 반환합니다.
   */
  export function throttle(
    func: Function,
    wait: number,
    options?: ThrottleOptions
  ): Function {
    let leading = true;
    let trailing = true;

    if (typeof func !== 'function') {
      throw new TypeError('Expected a function');
    }

    function isObject(value: unknown) {
      const type = typeof value;
      return value != null && (type === 'object' || type === 'function');
    }

    if (options && isObject(options)) {
      leading = 'leading' in options ? !!options.leading : leading;
      trailing = 'trailing' in options ? !!options.trailing : trailing;
    }

    return debounce(func, wait, {
      leading,
      trailing,
      maxWait: wait,
    });
  }

  /**
   * event가 발생한 eventTarget이 target element안에 존재하는 지 확인합니다.
   * 즉, target의 바깥 영역을 클릭했는지 확인합니다.
   *
   * @param {HTMLElement} eventTarget event가 발생한 element를 넣습니다.
   * @param {HTMLElement} target eventTarget의 존재를 확인할 element를 넣습니다.
   *
   * @returns {boolean} 만약 이벤트가 발생한 element가 target 내부에 있다면 `false`, 없다면 `true`를 반환합니다.
   */
  export function clickOutside(
    eventTarget: HTMLElement,
    target: HTMLElement
  ): boolean {
    return !target.contains(eventTarget);
  }
}

export default _;
