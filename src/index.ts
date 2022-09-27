/**
 * CustomElement는 HTMLElement를 확장한 타입이다.
 * CustomElement는 다음과 같은 메서드를 추가로 갖는다.
 *
 * - addEvent
 */
interface CustomElement extends HTMLElement {
  insertHTML: (html: string) => string;
  /**
   * Target element에 listener로 전달한 함수를 type 이벤트로 추가한다.
   *
   * @param type - Type은 target 요소에 등록할 이벤트 타입이다.
   * @param listener - Listener는 target 요소의 type 이벤트가 발생했을 때 호출되는 함수이다.
   */
  addEvent: <T extends keyof HTMLElementEventMap>(
    type: T,
    listener: (event: HTMLElementEventMap[T]) => void,
  ) => void;
  show: () => void;
  hide: () => void;
}

type TypeValidator = (value: unknown) => boolean;

type Shuffle = <T extends Array<unknown> | Object>(
  collection: T,
) => Array<ShuffleReturn<T>>;

type ShuffleReturn<T> = T extends { [key: string | number | symbol]: infer R1 }
  ? R1
  : T extends Array<infer R2>
  ? R2
  : never;

type Pick = <T extends Object, U extends Array<keyof T>>(
  object: T,
  paths: U,
) => { [key in U[number]]: T[key] };

type Omit = <T extends Object, U extends Array<keyof T>>(
  object: T,
  paths: U,
) => { [key in Exclude<keyof T, U[number]>]: T[key] };

/**
 * 전달한 selector에 해당되는 요소를 찾고, 해당 요소에서 사용할 수 있는 커스텀 메서드를 반환한다.
 *
 * @param selector - Selector은 document의 자식 요소들 중 selector와 일치하는 요소를 찾을 때 사용된다.
 * @returns HTMLElement를 확장한 CustomElement 객체 또는 null을 반환한다.
 */
function _(selector: string): CustomElement | null {
  const target = document.querySelector<CustomElement>(selector);

  if (target !== null) {
    target.insertHTML = (html) => {
      target.innerHTML = html;

      return target.innerHTML;
    };

    target.addEvent = (type, listener) => {
      target.addEventListener(type, listener);
    };

    target.show = () => {
      target.style.display = 'block';
    };

    target.hide = () => {
      target.style.display = 'none';
    };
  }

  return target;
}

namespace _ {
  export const fetch = (url: string, options: RequestInit) => {
    return window.fetch(url, options);
  };

  /**
   * 전달한 value가 null인지 확인하는 함수
   *
   * @param value - Value는 null인지 확인하려는 값이다.
   * @returns Value가 null이면 true를 반환한다. 그렇지 않으면 false를 반환한다.
   */
  export const isNull: TypeValidator = (value) => value === null;

  /**
   * 전달한 value가 null 또는 undefined 타입인지 확인하는 함수
   *
   * @param value - Value는 null 또는 undefined 타입인지 확인하려는 값이다.
   * @returns Value가 null 또는 undefined 타입이면 true를 반환한다. 그렇지 않으면 false를 반환한다.
   */
  export const isNil: TypeValidator = (value) =>
    typeof value === 'undefined' || value === null;

  /**
   * 전달한 value가 number 타입인지 확인하는 함수
   *
   * @param value - Value는 number 타입인지 확인하려는 값이다.
   * @returns Value가 number 타입이면 true를 반환한다. 그렇지 않으면 false를 반환한다.
   */
  export const isNumber: TypeValidator = (value) => typeof value === 'number';

  /**
   * 전달한 value가 함수인지 확인하는 함수
   *
   * @param value - Value는 함수인지 확인하려는 값이다.
   * @returns Value가 함수이면 true를 반환한다. 그렇지 않으면 false를 반환한다.
   */
  export const isFunction: TypeValidator = (value) => value instanceof Function;

  export const shuffle: Shuffle = (collection) => {
    if (collection instanceof Array) {
      return collection.sort(() => (Math.random() > 0.5 ? 1 : -1));
    }

    return Object.values(collection).sort(() => (Math.random() > 0.5 ? 1 : -1));
  };

  export const pick: Pick = (object, paths) => {
    const copiedObject1 = { ...object };
    const copiedObject2 = { ...object };

    paths.forEach((key) => {
      delete copiedObject1[key];
    });

    const tempKeys = Object.keys(copiedObject1);

    Object.keys(object).forEach((key) => {
      if (tempKeys.includes(key)) {
        delete copiedObject2[key];
      }
    });

    return copiedObject2;
  };

  export const omit: Omit = (object, paths) => {
    const copiedObject = { ...object };

    paths.forEach((key) => {
      delete copiedObject[key];
    });

    return copiedObject;
  };

  export const memoize = <T extends Function, U>(
    func: T,
  ): ((...args: unknown[]) => U) => {
    const cache: Record<string, U> = {};

    return function (...args: unknown[]): U {
      const key = JSON.stringify(args);

      if (!cache.hasOwnProperty(key)) {
        cache[key] = func.apply(this, args);
      }

      return cache[key];
    };
  };

  export const debounce = <T extends Function>(func: T, wait = 0) => {
    let timerId: number | null = null;

    return function (...args: unknown[]) {
      if (timerId) {
        clearTimeout(timerId);
      }

      timerId = window.setTimeout(() => {
        timerId = null;
        return func.apply(this.args);
      }, wait);
    };
  };

  export const throttle = <T extends Function>(func: T, wait = 0) => {
    let timerId: number | null = null;

    return function (...args: unknown[]) {
      if (timerId) {
        timerId = window.setTimeout(() => {
          func.apply(this, args);
          timerId = null;
        }, wait);
      }
    };
  };

  export const clickOutside = <T extends HTMLElement, U extends Function>(
    element: T,
    callback: U,
  ) => {
    const parentElement = element.parentElement;

    parentElement.addEventListener('click', (event) => {
      callback(event);
    });
  };
}

export default _;
