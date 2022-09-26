interface CustomElementMethod {
  addEvent<T extends keyof GlobalEventHandlersEventMap>(
    eventType: T,
    handler: (event: GlobalEventHandlersEventMap[T]) => void
  ): void;

  html(): string;
  html(content: string): void;
  html(content?: string): string | void;

  show(): void;
  show(duration: number, complete: Function): void;

  hide(): void;
  hide(duration: number, complete: Function): void;
}

declare global {
  interface HTMLElement extends CustomElementMethod {}
}

function _(selector: string) {
  const element = document.querySelector<HTMLElement>(selector);
  if (element === null) throw new Error("요소 없음");

  function html(): string;
  function html(content: string): void;
  function html(content?: string): string | void {
    if (content) {
      element.innerHTML = content;
      return;
    }

    return element.innerHTML;
  }

  const show = () => {
    element.style.display = "block";
  };

  const hide = () => {
    element.style.display = "hidden";
  };

  const addEvent = <T extends keyof GlobalEventHandlersEventMap>(
    eventType: T,
    handler: (event: GlobalEventHandlersEventMap[T]) => void
  ): void => {
    element.addEventListener(eventType, handler);
  };

  element.html = html;
  element.show = show;
  element.hide = hide;
  element.addEvent = addEvent;

  return element;
}

module _ {
  export function fetch(
    url: string,
    method: string,
    payload?: unknown
  ): Promise<any> {
    const request = new XMLHttpRequest();
    request.open(method, url);
    request.responseType = "json";
    const requestBody = JSON.stringify(payload);

    let resolve: unknown, reject: unknown;

    request.onload = function (this: XMLHttpRequest) {
      if (typeof resolve !== "function")
        throw new Error("잘못 설정된  resolver");
      return resolve(this.response);
    };

    request.onerror = function (this: XMLHttpRequest) {
      if (typeof reject !== "function")
        throw new Error("잘못 설정된  rejecter");
      return reject(this.response);
    };

    request.send(requestBody);

    return new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
  }

  export function isNull<T>(input: T): T extends null ? true : false;
  export function isNull(input: unknown): input is null {
    return input === null;
  }

  export function isNil<T>(input: T): T extends null | undefined ? true : false;
  export function isNil(input: unknown): input is null | undefined {
    return input === null || input === undefined;
  }

  export function isNumber<T>(input: T): T extends number ? true : false;
  export function isNumber(input: unknown): input is Number {
    return typeof input === "number";
  }

  export function isFunction<T>(input: T): T extends Function ? true : false;
  export function isFunction(input: unknown): input is Function {
    return typeof input === "function";
  }

  export function shuffle<T>(collection: T[]): T[];
  export function shuffle<T>(collection: Record<string, T>): T[];
  export function shuffle<T>(collection: T[] | Record<string, T>) {
    const result =
      collection instanceof Array ? collection : Object.values(collection);

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
