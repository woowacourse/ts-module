function _(selector: string) {
  const element = <HTMLElement>document.querySelector(selector);

  const getElement = () => element;

  const innerHTML = () => element.innerHTML;

  const show = () => {
    element.style.display = '';
  };

  const hidden = () => {
    element.style.display = 'none';
  };

  const addEvent = <K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ) => {
    element.addEventListener(type, listener, options);
  };

  return {
    getElement,
    innerHTML,
    show,
    hidden,
    addEvent,
  };
}

namespace _ {
  export function fetch(input: RequestInfo | URL, init?: RequestInit) {
    return window.fetch(input, init);
  }

  export function isNull(value: unknown) {
    return value === null;
  }

  export function isNil(value: unknown) {
    return value == null;
  }

  export function isNumber(value: unknown) {
    return typeof value === 'number';
  }

  export function isFunction(value: unknown) {
    return typeof value === 'function';
  }

  export function shuffle(array: unknown[]) {
    const originArray = array;
    const newArray: typeof array = [];

    while (originArray.length) {
      const lastIdx = originArray.length - 1;
      const randomIdx = Math.floor(Math.random() * originArray.length);

      [originArray[lastIdx], originArray[randomIdx]] = [
        originArray[randomIdx],
        originArray[lastIdx],
      ];

      newArray.push(originArray.pop());
    }

    return newArray;
  }

  export function pick(
    object: Record<string, unknown>,
    keys: string
  ): Pick<typeof object, typeof keys> {
    const pickKeys = keys.split('|').map((key) => key.trim());

    return pickKeys.reduce(function (obj: typeof object, key) {
      return (obj[key] = object[key]), obj;
    }, {});
  }

  export function omit(
    object: Record<string, unknown>,
    key: string
  ): Omit<typeof object, typeof key> {
    const pickKeys = key.split('|').map((k) => k.trim());
    const omitKeys = Object.keys(object).filter((k) => !pickKeys.includes(k));

    return omitKeys.reduce(function (obj: Record<string, unknown>, key) {
      return (obj[key] = object[key]), obj;
    }, {});
  }

  export function memoize(
    func: (...args: unknown[]) => {},
    resolver: (...args: unknown[]) => {}
  ) {
    if (
      typeof func !== 'function' ||
      (resolver != null && typeof resolver !== 'function')
    ) {
      throw new TypeError('Expected a function');
    }

    const memoized = function (...args: unknown[]) {
      const key = resolver ? resolver(...args) : args[0];
      const cache = memoized.cache;

      if (cache.has(key)) {
        return cache.get(key);
      }

      const result = func(...args);

      memoized.cache = cache.set(key, result) || cache;

      return result;
    };

    memoized.cache = new (memoize.Cache || Map)();

    return memoized;
  }

  memoize.Cache = Map;

  export function debounce(callback: () => void, delay = 500) {
    let timeout: NodeJS.Timeout;

    return () => {
      if (timeout) clearTimeout(timeout);

      timeout = setTimeout(callback, delay);
    };
  }

  export function throttle(callback: () => void, delay = 500) {
    let timeout: NodeJS.Timeout | null;

    return () => {
      if (timeout) return;

      timeout = setTimeout(() => {
        callback();
        timeout = null;
      }, delay);
    };
  }

  export function clickOutside(element: HTMLElement, func: () => void) {
    document.addEventListener('click', ({ target }) => {
      if (!(target instanceof HTMLElement) || target === element) return;

      func();
    });
  }
}

export default _;
