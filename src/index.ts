declare global {
  export interface HTMLElement extends ElementProperty {}
}

interface ElementProperty {
  html: (htmlText: string) => void;
  show: () => void;
  hide: () => void;
  addEvent: <T extends keyof HTMLElementEventMap>(
    type: T,
    listener: (event: HTMLElementEventMap[T]) => void
  ) => void;
}

function _(selector: string): HTMLElement {
  const element = document.body.querySelector<HTMLElement>(selector);
  if (_.isNull(element)) throw new Error("요소가 없습니다!");

  const html = (htmlText: string) => {
    element.innerHTML = htmlText;
  };

  const show = () => {
    element.style.display = "block";
  };

  const hide = () => {
    element.style.display = "none";
  };

  const addEvent = <T extends keyof HTMLElementEventMap>(
    type: T,
    listener: (event: HTMLElementEventMap[T]) => void
  ): void => {
    element.addEventListener(type, listener);
  };

  element.html = html;
  element.addEvent = addEvent;
  element.show = show;
  element.hide = hide;

  return element;
}

module _ {
  /**
   *
   * @param url
   * @param options
   * @returns
   */
  export function fetch<Data>(
    url: string,
    options?: FetchOptions
  ): Promise<Response<Data>> {
    return fetch(url, options);
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

  /**
   * @param object
   * @param keys
   * @returns partial array of object which has `param keys`
   * @example pick( {a: 1, b: "c"}, ['b'] ) => {b: 'c'}
   * 매개변수로 depth가 1인 flat한 객체만 들어온다고 가정
   */
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

  /**
   * @param object
   * @param keys
   * @returns partial array of object without `param keys`
   * @example omit( {a: 1, b: "c"}, ['b'] ) => {a: 1}
   * 매개변수로 depth가 1인 flat한 객체만 들어온다고 가정
   */
  export function omit<T extends Record<string, unknown>, R extends keyof T>(
    object: T,
    keys: R[]
  ): OmitResult<T, R> {
    const result = { ...object };
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      delete result[key];
    }

    return result;
  }

  /**
   *
   * @param func
   * @param resolver
   * @returns
   */
  export function memoize<T extends unknown[], R>(
    func: (...args: T) => R
  ): (...args: T) => R {
    // const value = func;
    // const memoized = () => value;

    // return memoized;
    return func;
  }

  export function debounce<T extends unknown[]>(
    func: (...args: T) => void,
    wait: number
  ): (...args: T) => void {
    let timerId: NodeJS.Timeout | null;

    return (...args) => {
      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(func, wait, ...args);
    };
  }

  export function throttle<T extends unknown[]>(
    func: (...args: T) => void,
    wait: number
  ): (...args: T) => void {
    let timerId: NodeJS.Timeout | null;

    return (...args) => {
      if (timerId) return;
      timerId = setTimeout(() => {
        func(...args);
        timerId = null;
      }, wait);
    };
  }

  export function clickOutside(
    target: Node,
    func: (...args: unknown[]) => void
  ): void {}
}

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: Record<string, string>;
};

type Response<Data> = {
  status: number;
  ok: boolean;
  redirected: boolean;
  url: string;
  headers: Record<string, string>;
  json: () => Promise<Data>;
};

type PickResult<T, K extends keyof T> = {
  [k in K]: T[k];
};

type OmitResult<T, K extends keyof T> = PickResult<T, Exclude<keyof T, K>>;

export default _;
