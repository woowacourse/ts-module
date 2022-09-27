import _ from 'lodash';

function _(selector: string): any {
  const element = document.querySelector<HTMLElement>(selector);
  if (element === null) throw new Error('no element');

  return {
    innerHTML: (content: string): void => {
      element.innerHTML = content;
    },

    show: () => {
      element.style.display = 'block';
    },

    hide: () => {
      element.style.display = 'hidden';
    },

    addEvent: <T extends keyof GlobalEventHandlersEventMap>(event: T, handler: () => void) => {
      element.addEventListener(event, handler);
    },
  };
}
module _ {
  export function fetch() {
    return {};
  }

  export function isNull(input: unknown): input is null {
    return input === null;
  }

  export function isNil(input: unknown): input is null | undefined {
    return input === null || input === undefined;
  }

  export function isNumber(input: unknown): input is number {
    return typeof input === 'number';
  }

  export function isFunction(input: unknown): input is Function {
    return typeof input === 'function';
  }

  export function shuffle<T>(input: T[]): T[] | undefined {
    const shuffle = (array) => {
      return array.sort(() => Math.random() - 0.5);
    };

    if (Array.isArray(input)) {
      return shuffle(input);
    }
  }

  export function pick<T extends object, G extends string[]>(input: T, target: G): {} {
    const pickTarget = () => {
      const newObj = {};
      target.forEach((key) => {
        newObj[key] = input[key];
      });

      return newObj;
    };

    return input === null ? {} : pickTarget();
  }

  export function omit<T extends object, G extends string[]>(input: T, target: G) {
    const omitTarget = () => {
      const newObj = {};
      const inputKeys = Object.keys(input);
      const filteredKeys = inputKeys.filter((key) => target.includes(key));
      filteredKeys.forEach((key) => {
        newObj[key] = input[key];
      });

      return newObj;
    };

    return input === null ? {} : omitTarget();
  }

  export function memoize<T extends unknown[], U>(
    func: (...args: T) => U,
    resolver?: (...args: T) => string,
  ): (...args: T) => U {
    const cache = new Map();

    const memoizedFunction = (...args: T) => {
      const cacheKey = resolver !== undefined ? resolver(...args) : args[0];
      if (cache.has(cacheKey)) return cache.get(cacheKey);

      const result = func(...args);
      cache.set(cacheKey, result);

      return result;
    };
    return memoizedFunction;
  }

  export const debounce: <T extends unknown[], U>(func: (...args: T) => U, wait?: number) => (...args: T) => U = <
    T extends unknown[],
    U,
  >(
    func: (...args: T) => U,
    wait = 0,
  ) => {
    let timer: NodeJS.Timeout, result: U;

    const debouncedFunction = (...args: T) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        result = func(...args);
      }, wait);

      return result;
    };

    return debouncedFunction;
  };

  export const throttle: <T extends unknown[], U>(
    func: (...args: T) => U,
    wait?: number,
  ) => (...args: T) => U | undefined = <T extends unknown[], U>(func: (...args: T) => U, wait = 0) => {
    let shouldRun = true;
    let result: U;

    const throttledFunction = (...args: T) => {
      if (!shouldRun) return;

      shouldRun = false;
      setTimeout(() => {
        result = func(...args);

        shouldRun = true;
      }, wait);

      return result;
    };

    return throttledFunction;
  };

  export function clickOutside(targetElement: Element, handler: (event: MouseEvent) => void): void {
    window.addEventListener('click', (e) => {
      if (e.target === targetElement) return;
      handler(e);
    });
  }
}

export default _;
