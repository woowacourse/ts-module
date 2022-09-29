declare global {
  interface HTMLElement extends CustomElementProperty {}
}

interface CustomElementProperty {
  innerHTML: string;
  hide: () => void;
  show: () => void;
  addEvent: <K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, event: HTMLElementEventMap[K]) => any
  ) => void;
}

function _(selector: string) {
  const element = document.querySelector<HTMLElement>(selector);
  if (element === null) throw new Error("No Element");

  const show = () => {
    element.style.visibility = "visible";
  };

  const hide = () => {
    element.style.visibility = "hidden";
  };

  const addEvent = <K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, event: HTMLElementEventMap[K]) => any
  ) => {
    element.addEventListener(type, listener);
  };

  element.show = show;
  element.hide = hide;
  element.addEvent = addEvent;

  return element;
}

type Function<T = unknown, R = unknown> = (...args: T[]) => R;

type FetchResource = string | URL | Request;

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Headers;
  body?:
    | string
    | Blob
    | ArrayBuffer
    | DataView
    | FormData
    | URLSearchParams
    | ReadableStream;
};

module _ {
  export function fetch(
    resource: FetchResource,
    options?: FetchOptions
  ): Promise<Response> {
    return fetch(resource, options);
  }

  export function isNull(value: unknown): boolean {
    return value === null;
  }

  export function isNil(value: unknown): boolean {
    return value === null || value === undefined;
  }

  export function isNumber(value: unknown): boolean {
    return typeof value === "number" || value instanceof Number;
  }

  export function isFunction(value: unknown): boolean {
    return typeof value === "function";
  }

  export function shuffle<T>(array: T[]): T[] {
    const length = array === null ? 0 : array.length;
    if (!length) return [];
    let index = -1;
    const lastIndex = length - 1;
    const result = [...array];
    while (++index < length) {
      const rand = index + Math.floor(Math.random() * (lastIndex - index + 1));
      const value = result[rand];
      result[rand] = result[index];
      result[index] = value;
    }
    return result;
  }

  export function pick<T extends Record<string, unknown>, K extends keyof T>(
    object: T,
    paths: K[]
  ): Pick<T, K> {
    const result = paths.reduce(
      (prev, cur) => ({ ...prev, [cur]: object[cur] }),
      {} as T
    );
    return result;
  }

  export function omit<T extends Record<string, unknown>, K extends keyof T>(
    object: T,
    paths: K[]
  ): Omit<T, K> {
    const result = { ...object };
    paths.forEach((key) => {
      delete result[key];
    });
    return result;
  }

  export function memoize<T, R>(
    func: Function<T, R>,
    resolver?: Function<
      T,
      string | number | boolean | null | undefined | symbol | bigint
    >
  ): Function<T, R> {
    const memoized = function (args: any) {
      const key = resolver ? resolver(args) : args[0];
      const cache = new Map();

      if (cache.has(key)) {
        return cache.get(key);
      }

      const result = func(args);
      cache.set(key, result);
      return result;
    };
    return memoized;
  }

  export function debounce<T, R>(
    func: Function<T, R>,
    wait: number
  ): Function<T, void> {
    let timerId: NodeJS.Timeout | null;

    return (...args) => {
      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(func, wait, ...args);
    };
  }

  export function throttle<T, R>(
    func: Function<T, R>,
    wait: number
  ): Function<T, void> {
    let timerId: NodeJS.Timeout | null;

    return (...args) => {
      if (timerId) return;
      timerId = setTimeout(() => {
        func(...args);
        timerId = null;
      }, wait);
    };
  }

  export function clickOutside(
    target: Element,
    handler: (event: MouseEvent) => any
  ): void {
    window.addEventListener("click", (event) => {
      const isClickInside = target.contains(event.target as HTMLElement);
      if (!isClickInside) {
        handler(event);
      }
    });
  }
}

export default _;
