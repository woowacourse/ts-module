interface CustomElementMethod {
  addEvent<T extends keyof GlobalEventHandlersEventMap>(
    eventType: T,
    handler: (event: GlobalEventHandlersEventMap[T]) => void,
  ): void;

  innerHtml(content?: string): string | void;

  show(): void;
  hide(): void;
}

declare global {
  interface HTMLElement extends CustomElementMethod {}
}

function _(selector: string) {
  const element = document.querySelector<HTMLElement>(selector);
  if (element === null) throw new Error('error no Element');

  const show = () => {
    element.style.display = 'block';
  };

  const hide = () => {
    element.style.display = 'hidden';
  };

  const addEvent = <T extends keyof GlobalEventHandlersEventMap>(event: T, handler: (...args: any) => void) => {
    element.addEventListener(event, handler);
  };

  const innerHtml = (content?: string): string | void => {
    if (element === null) throw new Error('요소 없음');
    if (!content) {
      return element.innerHTML;
    }
    element.innerHTML = content;
    return;
  };

  element.hide = hide;
  element.show = show;
  element.addEvent = addEvent;
  element.innerHtml = innerHtml;

  return element;
}
module _ {
  export function isNull(input: unknown): input is null {
    return input === null;
  }

  export function isNil(input: unknown): input is null | undefined {
    return input === null || typeof input === `undefined`;
  }

  export function isNumber(input: unknown): input is number {
    return typeof input === 'number';
  }

  export function isFunction(input: unknown): input is Function {
    return typeof input === 'function';
  }

  export function shuffle<T>(input: T[]): T[] | undefined {
    const shuffle = (array: T[]) => {
      return array.sort(() => Math.random() - 0.5);
    };

    if (Array.isArray(input)) {
      return shuffle(input);
    }
  }

  export function pick<T extends Record<string, string | number>, G extends (keyof T)[]>(
    input: T,
    target: G,
  ): { [K in G[number]]: T[K] } {
    const pickTarget = () => {
      const newObj = <T>{};
      target.forEach((key) => {
        newObj[key] = input[key];
      });

      return newObj;
    };

    return pickTarget();
  }

  export function omit<T extends Record<string, string | number>, G extends (keyof T)[]>(
    input: T,
    target: G,
  ): { [K in keyof Omit<T, G[number]>]: T[K] } {
    const omitTarget = () => {
      const newObj = <T>{};
      const inputKeys: (keyof T)[] = Object.keys(input);
      const filteredKeys = inputKeys.filter((key) => !target.includes(key));

      filteredKeys.forEach((key) => {
        newObj[key] = input[key];
      });

      return newObj;
    };

    return omitTarget();
  }

  export function fetch(url: string, method: string, payload?: unknown): Promise<any> {
    const request = new XMLHttpRequest();
    request.open(method, url);
    request.responseType = 'json';
    const requestBody = JSON.stringify(payload);

    let resolve: unknown, reject: unknown;

    request.onload = function (this: XMLHttpRequest) {
      if (typeof resolve !== 'function') throw new Error('잘못 설정된  resolver');
      return resolve(this.response);
    };

    request.onerror = function (this: XMLHttpRequest) {
      if (typeof reject !== 'function') throw new Error('잘못 설정된  rejecter');
      return reject(this.response);
    };

    request.send(requestBody);

    return new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
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
