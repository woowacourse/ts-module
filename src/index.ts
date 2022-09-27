function _(selector: string): Node | null {
  return document.querySelector(selector);
}

declare global {
  interface Node {
    setInnerHTML(value: string): void;
    setShow(): void;
    setHidden(): void;
    addEvent<K extends keyof HTMLElementEventMap, U extends unknown>(
      type: K,
      listener: (event: HTMLElementEventMap[K]) => U,
      options?: boolean | AddEventListenerOptions
    ): void;
  }
}

HTMLElement.prototype.addEvent = function <
  K extends keyof HTMLElementEventMap,
  U extends unknown
>(
  type: K,
  listener: (event: HTMLElementEventMap[K]) => U,
  options?: boolean | AddEventListenerOptions
) {
  this.addEventListener(type, listener);
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
  export function fetch(
    input: string | URL,
    init?: RequestInit
  ): Promise<Response> {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open(init?.method || "GET", input);
      if (init?.headers !== undefined) {
        for (const [key, value] of Object.entries(init.headers)) {
          request.setRequestHeader(key, value);
        }
      }

      request.addEventListener(
        "load",
        () => {
          if (request.status === 200) {
            resolve(request.response);
          } else {
            reject(`Error: ${request.status}`);
          }
        },
        false
      );

      request.addEventListener(
        "error",
        () => {
          reject("request failed");
        },
        false
      );

      request.send(init?.body ? JSON.stringify(init.body) : null);
    });
  }

  export function isNull<T extends unknown>(value: T): boolean {
    return value === null;
  }

  export function isNil<T extends unknown>(value: T): boolean {
    return value === undefined || value === null;
  }

  export function isNumber<T extends unknown>(value: T): boolean {
    return !isNaN(Number(value));
  }

  export function isFunction<T extends unknown>(value: T): boolean {
    return typeof value === "function";
  }

  export function shuffle<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
  }

  type PickType<
    T extends { [key: string]: unknown },
    U extends readonly (keyof T)[]
  > = {
    [K in U[number]]: T[K];
  };

  export function pick<
    T extends { [key: string]: unknown },
    U extends (keyof T)[]
  >(object: T, paths: U): PickType<T, U> {
    return paths.reduce((obj, key) => {
      obj[key] = object[key];
      return obj;
    }, <T>{});
  }

  type OmitType<
    T extends { [key: string]: unknown },
    U extends readonly (keyof T)[]
  > = {
    [K in keyof Omit<T, U[number]>]: T[K];
  };

  export function omit<
    T extends { [key: string]: unknown },
    U extends (keyof T)[]
  >(object: T, paths: U): OmitType<T, U> {
    const result = <T>{};
    for (let key in object) {
      if (!paths.includes(key)) {
        result[key] = object[key];
      }
    }
    return result;
  }

  export function memoize<T extends unknown[], U extends unknown>(
    func: (...args: T) => U,
    resolver?: (...args: T) => string
  ): (...args: T) => U {
    const cache = new Map();

    const memoized = function (...args: unknown[]) {
      const key = resolver ? resolver.apply(null, args as T) : args[0];
      if (cache.has(key)) {
        return cache.get(key);
      } else {
        const result = func.apply(null, args as T);
        cache.set(key, result);
        return result;
      }
    };

    return memoized;
  }

  type DebounceOptionsType = {
    leading?: boolean;
    maxWait?: number;
    trailing?: boolean;
  };

  export function debounce<T extends unknown[], U extends unknown>(
    func: (...args: T) => U,
    wait?: number,
    options?: DebounceOptionsType
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

  type ThrottleOptionsType = Omit<DebounceOptionsType, "maxWait">;

  export function throttle<T extends unknown[], U extends unknown>(
    func: (...args: T) => U,
    wait?: number,
    options?: ThrottleOptionsType
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

  export function clickOutside<T extends unknown, U extends unknown>(
    target: Node,
    func: (...args: T[]) => U
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
}

export default _;
