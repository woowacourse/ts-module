import type { NewElement, Function } from './type';

function _(selector: string): NewElement {
  const element = document.querySelector(selector) as NewElement;

  element['innerHTML'] = element.innerHTML;

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

    result.forEach((_, index) => {
      const random = index + Math.floor(Math.random() * (array.length - index));
      [result[random], result[index]] = [result[index], result[random]];
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

  export function memoize<T extends Function>(
    func: T,
    resolver?: (...args: Parameters<T>) => unknown
  ) {
    if (typeof func !== 'function' || (!isNil(resolver) && typeof resolver !== 'function')) {
      throw new TypeError('Expected a function');
    }

    const memoized = function (...args: Parameters<T>): ReturnType<T> {
      const key = resolver ? resolver(...args) : args[0];
      const cache = memoized.cache;

      if (cache.has(key)) {
        console.log('hit');
        return cache.get(key);
      }

      const result = func(...args) as ReturnType<T>;
      memoized.cache = cache.set(key, result) || cache;
      return result;
    };

    memoized.cache = new Map();

    return memoized;
  }

  export function debounce<T extends Function>(callback: T, delay: number) {
    let timer: NodeJS.Timeout;
    return function (...args: Parameters<T>) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  }

  export function throttle<T extends Function>(callback: T, delay: number) {
    let timer: NodeJS.Timeout | null;
    return function (...args: Parameters<T>) {
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
