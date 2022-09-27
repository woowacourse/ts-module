declare function _(selector: string): HTMLElement | null;
declare global {
  interface HTMLElement {
    setInnerHTML(str?: string): void;
    showElement(): void;
    hideElement(): void;
    addEvent<T extends HTMLElementEventMap, K extends keyof T>(
      type: K,
      listener: (event: T[K]) => void
    ): void;
  }
}
module _ {
  export function fetch(
    url: string,
    responseType: XMLHttpRequestResponseType = "text"
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const request = new XMLHttpRequest();

        request.addEventListener("load", () => {
          if (responseType === "text") {
            try {
              resolve(JSON.parse(request.responseText));
            } catch (_) {
              resolve(request.responseText);
            }
          } else {
            resolve(request.response);
          }
        });
        request.addEventListener("error", () => {
          throw new Error(String(request.status));
        });
        request.open("GET", url, true);
        request.responseType = responseType;
        request.send();
      } catch (error) {
        reject(error);
      }
    });
  }

  export function isNull<T extends unknown>(value: T): boolean {
    return value === null;
  }

  export function isNil<T extends unknown>(value: T): boolean {
    return value === null || value === undefined;
  }

  export function isNumber<T extends unknown>(value: T): boolean {
    return typeof value === "number";
  }

  export function isFunction<T extends unknown>(value: T): boolean {
    return typeof value === "function";
  }

  export function shuffle<T extends Array<unknown>>(value: T): T {
    return value.sort(() => Math.random() - 0.5);
  }

  export function pick<
    T extends Record<string | number, unknown>,
    K extends keyof T
  >(obj: T, array: K[]): Record<string | number, unknown> {
    const pickedObj = <T>{};
    for (const key of array) {
      pickedObj[key] = obj[key];
    }
    return pickedObj;
  }

  export function omit<
    T extends Record<string | number, unknown>,
    K extends keyof T
  >(obj: T, array: K[]): Record<string | number, unknown> {
    const omittedObj = <T>{};
    for (const key of array) {
      if (!array.includes(key)) {
        omittedObj[key] = obj[key];
      }
    }
    return omittedObj;
  }

  export function memoize<T>(
    func: (...args: any) => T,
    resolver?: (...args: any) => T
  ): (...args: any) => T {
    const memoized = function (this: any, args: any) {
      const key = resolver ? resolver.apply(this, args) : args[0];
      const cache = memoized.cache;

      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = func.apply(this, args);
      memoized.cache = cache.set(key, result) || cache;
      return result;
    };
    memoized.cache = new Map();
    return memoized;
  }

  export function debounce(
    func: (...args: any) => void,
    delay: number
  ): (...args: any) => void {
    let timeout: ReturnType<typeof setTimeout>;
    return function (...args: any) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  }

  export function throttle(
    func: (...args: any) => void,
    delay: number
  ): (...args: any) => void {
    let timeout: ReturnType<typeof setTimeout>;
    return function (...args: any) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  }

  export function clickOutside<T extends HTMLElement>(
    target: T,
    func: (...args: any) => void
  ): void {
    window.addEventListener("click", (event, ...args) => {
      if (!(event.target instanceof HTMLElement)) {
        return;
      }
      if (target.isSameNode(event.target)) {
        return;
      }

      func.apply(null, args);
    });
  }
}

export default _;
