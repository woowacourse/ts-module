function _(selector: string) {
  /**
   * innerHTML() {
   * }
   *
   * show() {
   * }
   *
   * hidden() {
   * }
   *
   * addEvent() {
   * }
   */
  const element = document.querySelector(selector);
  if (!element) throw new Error("요소 없음");

  return element;
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

  export function isNumber(input: unknown): input is Number {
    return typeof input === "number";
  }

  export function isFunction(input: unknown): input is Function {
    return typeof input === "function";
  }

  export function shuffle<T>(input: T[] | Record<string, T>) {
    const result = input instanceof Array ? input : Object.values(input);

    let currIndex = result.length;
    let randomIndex;

    while (currIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currIndex);
      currIndex -= 1;
      [result[currIndex], result[randomIndex]] = [
        result[randomIndex],
        result[currIndex],
      ];
    }

    return result;
  }

  export function pick<
    T extends Record<string, unknown>,
    U extends Partial<keyof T>
  >(object: T, props: U[]): Pick<T, U> {
    return props.reduce((acc, curr) => {
      acc[curr] = object[curr];
      return acc;
    }, {} as Pick<T, U>);
  }

  export function omit<
    T extends Record<string, unknown>,
    U extends Partial<keyof T>
  >(object: T, props?: U[]): Omit<T, U> {
    return props === undefined
      ? object
      : props.reduce((acc, curr) => {
          delete acc[curr];
          return acc;
        }, object);
  }

  export function memoize<T extends unknown[], U>(
    func: (...args: T) => U,
    resolver?: (...args: T) => string
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

  export const debounce: <T extends unknown[], U>(
    func: (...args: T) => U,
    wait?: number
  ) => (...args: T) => U = <T extends unknown[], U>(
    func: (...args: T) => U,
    wait = 0
  ) => {
    let timer, result: U;

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
    wait?: number
  ) => (...args: T) => U = <T extends unknown[], U>(
    func: (...args: T) => U,
    wait = 0
  ) => {
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

  export function clickOutside(
    targetElement: Element,
    handler: (event: MouseEvent) => void
  ): void {
    window.addEventListener("click", (e) => {
      if (e.target === targetElement) return;
      handler(e);
    });
  }
}

export default _;
