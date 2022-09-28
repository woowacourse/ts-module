import type { NewElement, Function } from './type';

function _(selector: string): NewElement {
  const element = document.querySelector(selector) as NewElement;

  element['show'] = function () {
    element.style.visibility = 'visible';
  };

  element['hide'] = function () {
    element.style.visibility = 'hidden';
  };

  element['addEvent'] = function (cmd, callback) {
    element.addEventListener(cmd, callback);
  };

  return element;
}

namespace _ {
  export async function fetch(input: string | URL, init?: RequestInit): Promise<Response> {
    return fetch(input, init);
  }

  export function isNull(value?: unknown): Boolean {
    return value === null;
  }

  export function isNil(value?: unknown): Boolean {
    return value === null || value === undefined;
  }

  export function isNumber(value?: unknown): Boolean {
    return typeof value === 'number' || Object.prototype.toString.call(value) === '[object Number]';
  }

  export function isFunction(value?: unknown): Boolean {
    return typeof value === 'function';
  }

  export function shuffle(array: number[]): number[] {
    if (array.length === 0) {
      return [];
    }

    const result = array.map((el) => el);

    array.forEach((_, index, array) => {
      const random = index + Math.floor(Math.random() * (array.length - index));
      const value = result[random];
      result[random] = result[index];
      result[index] = value;
    });

    return result;
  }

  export function pick<T extends Record<string, unknown>>(object: T, paths: (keyof T)[]) {
    if (isNil(object)) {
      return {};
    }

    return Object.fromEntries(Object.entries(object).filter((el) => paths.includes(el[0])));
  }

  export function omit<T extends Record<string, unknown>>(object: T, paths: (keyof T)[]) {
    if (isNil(object)) {
      return {};
    }

    return Object.fromEntries(Object.entries(object).filter((el) => !paths.includes(el[0])));
  }

  memoize.Cache = Map;
  export function memoize<T extends Function>(func: T, resolver?: Function) {
    if (typeof func !== 'function' || (!isNil(resolver) && typeof resolver !== 'function')) {
      throw new TypeError('Expected a function');
    }

    const memoized = function (...args: Parameters<T>): ReturnType<T> {
      const key = resolver ? resolver(...args) : args[0];
      const cache = memoized.cache;

      if (cache.has(key)) {
        return cache.get(key);
      }

      const result = func(...args) as ReturnType<typeof func>;
      memoized.cache = cache.set(key, result) || cache;
      return result;
    };

    memoized.cache = new (memoize.Cache || Map)();

    return memoized;
  }

  export function debounce(callback: Function, delay: number) {
    let timer: NodeJS.Timeout;
    return function (...args: Parameters<typeof callback>) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  }

  export function throttle(callback: Function, delay: number) {
    let timer: NodeJS.Timeout | null;
    return function (...args: Parameters<typeof callback>) {
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          callback(...args);
        }, delay);
      }
    };
  }

  export function clickOutside(element: Element, callback: Function) {
    document.addEventListener('click', function (event) {
      const target = event.target as Node;
      if (!element.contains(target)) {
        callback(event);
      }
    });
  }
}

export default _;
