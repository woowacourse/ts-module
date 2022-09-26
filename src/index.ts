import { NumberRange, CreateArray } from "./util";

declare function _(selector: string): Node;
declare global {
  interface Node {
    addEvent<T extends keyof HTMLElementEventMap>(
      eventType: T,
      callback: (event: HTMLElementEventMap[T]) => void
    ): void;
    setInnerHTML(value: string): void;
    setShow(): void;
    setHidden(): void;
  }
}

HTMLElement.prototype.addEvent = function <T extends keyof HTMLElementEventMap>(
  eventType: T,
  callback: (event: HTMLElementEventMap[T]) => void
) {
  this.addEventListener(eventType, callback);
};

HTMLElement.prototype.setInnerHTML = function (value: string) {
  this.innerHTML = value;
};

HTMLElement.prototype.setShow = function () {
  this.style.display = "block";
};

HTMLElement.prototype.setHidden = function () {
  this.style.display = "none";
};

module _ {
  export function fetch<Data>(
    url: Url,
    options?: FetchOptions
  ): Promise<Response<Data>> {
    return new Promise((resolve, reject) => {
      const response: Response<Data> = {
        status: 200, // 200 ~ 600이하의 status code가 들어올수 있도록 하는 타입
        ok: true,
        statusText: "example code",
        json: () => {
          return new Promise((resolve, reject) => {
            resolve("아무튼 데이터임..!" as Data);
          });
        },
      };

      resolve(response);
    });
  }

  export function isNull<T extends unknown>(value: T): boolean {
    return value === null;
  }

  export function isNil<T extends unknown>(value: T): boolean {
    return value === undefined || value === null;
  }

  export function isNumber<T extends unknown>(value: T): boolean {
    return typeof value === "number";
  }

  export function isFunction<T extends unknown>(value: T): boolean {
    return typeof value === "function";
  }

  export function shuffle<T extends unknown>(arr: T[]): T[] {
    const length = arr == null ? 0 : arr.length;
    if (!length) {
      return [];
    }
    let index = -1;
    const lastIndex = length - 1;
    const result = [...arr];
    while (++index < length) {
      const rand = index + Math.floor(Math.random() * (lastIndex - index + 1));
      const value = result[rand];
      result[rand] = result[index];
      result[index] = value;
    }
    return result;
  }

  export function pick<
    T extends Record<string, unknown>,
    R extends (keyof T)[]
  >(obj: T, selectedKeyArray: R): PickResponse<T, R> {
    const result = {} as T;
    for (let key in obj) {
      if (selectedKeyArray.includes(key)) {
        result[key] = obj[key];
      }
    }

    return result;
  }

  export function omit<
    T extends Record<string, unknown>,
    R extends (keyof T)[]
  >(obj: T, selectedKeyArray: R): OmitResponse<T, R> {
    const result = {} as T;
    for (let key in obj) {
      if (!selectedKeyArray.includes(key)) {
        result[key] = obj[key];
      }
    }

    return result;
  }

  export function memoize<K extends unknown>(
    func: (...args: unknown[]) => K,
    resolver?: (...args: unknown[]) => string
  ): (...args: unknown[]) => K {
    const cache = new Map();

    const memoized = function (...args: unknown[]) {
      const key = resolver ? resolver.apply(null, args) : args[0];
      if (cache.has(key)) {
        return cache.get(key);
      } else {
        const result = func.apply(null, args);
        cache.set(key, result);
        return result;
      }
    };

    return memoized;
  }

  export function debounce<T extends unknown[]>(
    func: (...args: T) => void,
    wait: number,
    options?: DebounceOptions
  ): (...args: T) => void {
    let timer: undefined | ReturnType<typeof setTimeout>;
    return function (...args) {
      let callNow = options?.leading && !timer;

      const later = () => {
        timer = undefined;
        if (!options?.leading) {
          func.apply(null, args);
        }
      };

      clearTimeout(timer);
      timer = setTimeout(later, wait);

      if (callNow) {
        func.apply(null, args);
      }
    };
  }

  export function throttle<T extends unknown[]>(
    func: (...args: T) => void,
    wait: number
  ): (...args: T) => void {
    let timer: undefined | ReturnType<typeof setTimeout>;

    return (...args) => {
      if (!timer) {
        timer = setTimeout(() => {
          timer = undefined;
          func.apply(null, args);
        }, 50);
      }
    };
  }

  export function clickOutside(
    target: HTMLElement,
    func: (...args: unknown[]) => void
  ): void {
    window.addEventListener("click", (e, ...args) => {
      if (!(e.target instanceof HTMLElement)) {
        return;
      }
      if (target.isSameNode(e.target)) {
        return;
      }

      func.apply(null, args);
    });
  }

  type FetchBodyType =
    | string
    | URLSearchParams
    | FormData
    | Blob
    | ArrayBuffer
    | ArrayBufferView
    | DataView;

  type Url = `http${"s" | ""}://${string}`;

  type FetchOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: FetchBodyType | null;
    headers?: Record<string, string>;
    credentials?: "omit" | "same-origin" | "include";
  };

  type Response<Data> = {
    status: NumberRange<CreateArray<200>, 600>; // 200 ~ 600이하의 status code가 들어올수 있도록 하는 타입
    ok: boolean;
    statusText: string;
    url?: string;
    headers?: Record<string, string>;
    json: () => Promise<Data>;
  };

  type PickResponse<
    T extends Record<string, unknown>,
    R extends readonly (keyof T)[]
  > = {
    [K in R[number]]: T[K];
  };

  type OmitResponse<
    T extends Record<string, unknown>,
    R extends readonly (keyof T)[]
  > = {
    [K in keyof Omit<T, R[number]>]: T[K];
  };

  type DebounceOptions = {
    leading?: boolean;
    trailing?: boolean;
  };
}

export default _;
