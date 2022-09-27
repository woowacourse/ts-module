function _(selector: string): Element {
  if (!selector) {
    return;
  }

  const element = document.querySelector(selector);

  return element;
}

namespace _ {
  // export function fetch(input: string | URL, init?: RequestInit): Promise<Response> {
  //   const xhr = new XMLHttpRequest()
  //   xhr.open(init.method, input)

  //   xhr.onreadystatechange = function (event) {
  //     const { target } = event;

  //     if (target.readyState === XMLHttpRequest.DONE) {
  //         const { status } = target;

  //         if (status === 0 || (status >= 200 && status < 400)) {
  //           return Promise
  //             Promise.resolve()
  //         } else {
  //             Promise.reject()
  //         }
  //     }

  //  xhr.send();
  // }

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

  export function pick(object: Record<string, unknown>, paths: string[]) {
    if (isNil(object)) {
      return {};
    }

    return Object.fromEntries(Object.entries(object).filter((el) => paths.includes(el[0])));
  }

  export function omit(object: Record<string, unknown>, paths: string[]) {
    if (isNil(object)) {
      return {};
    }

    return Object.fromEntries(Object.entries(object).filter((el) => !paths.includes(el[0])));
  }

  type Function = (...args: unknown[]) => unknown;

  interface MapCache {
    delete(key: string): boolean;
    get(key: string): unknown;
    has(key: string): boolean;
    set(key: string, value: unknown): { [index: string]: unknown };
  }

  interface MemoizedFunction extends Function {
    cache: MapCache;
  }

  interface Memoize {
    <T extends Function>(func: T, resolver?: Function): T & MemoizedFunction;
    Cache: MapCache;
  }

  export function memoize<T extends Function>(func: T, resolver?: Function) {
    if (typeof func !== 'function' || (!isNil(resolver) && typeof resolver !== 'function')) {
      throw new TypeError('Expected a function');
    }

    const memoized = function (...args: Parameters<T>): ReturnType<T> {
      const key = resolver ? resolver.apply(this, args) : args[0];
      const cache = memoized.cache;

      if (cache.has(key)) {
        return cache.get(key);
      }

      const result = func.apply(this, args) as ReturnType<typeof func>;
      memoized.cache = cache.set(key, result) || cache;
      return result;
    };

    memoized.cache = new (memoize.Cache || Map)();

    return memoized;
  }

  memoize.Cache = Map;

  // export function debounce<T>(callback: Function, delay: number) {
  //   let timer: NodeJS.Timeout;
  //   return function (...args: Parameters<typeof callback>) {
  //     clearTimeout(timer);
  //     timer = setTimeout(() => {
  //       callback.apply(this, args);
  //     }, delay);
  //   };
  // }

  // export function throttle(callback: Function, delay: number) {
  //   let timer: NodeJS.Timeout;
  //   return function (...args: Parameters<typeof callback>) {
  //     if (!timer) {
  //       timer = setTimeout(() => {
  //         timer = null;
  //         callback.apply(this, args);
  //       }, delay);
  //     }
  //   };
  // }

  // export function clickOutside(target: Element, callback: Function) {
  //   return this.each(function () {
  //     document.addEventListener('click', (event) => {
  //       const element = event.currentTarget as HTMLElement;
  //       if (!element.closest(self).length) {
  //         callback.call(self, event);
  //       }
  //     });
  //   });
  // }
}

export default _;
