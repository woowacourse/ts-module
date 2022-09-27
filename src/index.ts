class CustomElement {
  element;
  constructor(selector: string) {
    const selectedElement = document.body.querySelector<HTMLElement>(selector);
    this.element = selectedElement;
  }

  innerHTML(HTMLString: string): void {
    this.element.innerHTML = HTMLString;
  }

  show() {
    this.element.style.display = "block";
  }

  hide() {
    this.element.style.display = "none";
  }

  addEvent<T extends keyof HTMLElementEventMap>(
    type: T,
    listener: (event: HTMLElementEventMap[T]) => void
  ) {
    this.element.addEventListener(type, listener);
  }
}

function _(selector: string): CustomElement {
  const customElement = new CustomElement(selector);

  return customElement;
}

const HTTP_METHOD = {
  POST: "POST",
  GET: "GET",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
} as const;

const defaultFetchOptions = {
  method: HTTP_METHOD.GET,
  headers: {},
  body: "",
  credentials: "",
};

module _ {
  export function fetch<T = any>(
    url: string,
    options?: FetchOptions
  ): Promise<Response<T>> {
    return fetch(url, { ...defaultFetchOptions, ...options });
  }

  export function isNull(value: unknown): boolean {
    return value === null;
  }

  export function isNil(value: unknown): boolean {
    return value == null;
  }

  export function isNumber(value: unknown): boolean {
    return typeof value === "number";
  }

  export function isFunction(value: unknown): boolean {
    var type = typeof value;
    return value != null && (type == "object" || type == "function");
  }

  export const shuffle = <T>(array: T[]): T[] => {
    const length = array === null ? 0 : array.length;
    if (!length) {
      return [];
    }
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
  };

  export function pick<
    T extends Record<string, unknown>,
    R extends (keyof T)[]
  >(object: T, path: R): PickResult<T, R> {
    let newObj = { ...object };
    Object.keys(object).forEach((key) => {
      if (path.indexOf(key) === -1) {
        delete newObj[key];
      }
    });
    return newObj;
  }

  export function omit<
    T extends Record<string, unknown>,
    R extends (keyof T)[]
  >(object: T, path: R): OmitResult<T, R> {
    let newObj = { ...object };
    path.forEach((key) => {
      delete newObj[key];
    });
    return newObj;
  }

  export function memoize<T, K>(
    func: (...args: T[]) => K,
    resolver: (...args: T[]) => K
  ): (...args: T[]) => K {
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

  export function debounce<T>(
    func: T,
    wait: number,
    options: Record<"leading" | "trailing", number>
  ): T {
    return func;
  }

  // export function throttle<T extends unknown[]>(
  //   func: T,
  //   wait: number,
  //   options?: Record<"leading" | "trailing", number>
  // ): DebouncedFunction<T> {
  //   let leading = true;
  //   let trailing = true;

  //   if (options) {
  //     leading = "leading" in options ? !!options.leading : leading;
  //     trailing = "trailing" in options ? !!options.trailing : trailing;
  //   }
  //   return debounce(func, wait, {
  //     leading,
  //     trailing,
  //   });
  // }

  export function clickOutside(
    eventTarget: HTMLElement,
    innerElement: HTMLElement
  ): boolean {
    return !innerElement.contains(eventTarget);
  }

  type DefinitelyObject<T = any> = Record<string, T>;

  type PickResult<T extends Record<string, unknown>, R extends (keyof T)[]> = {
    [K in R[number]]: T[K];
  };

  type OmitResult<T extends Record<string, any>, R extends (keyof T)[]> = {
    [K in keyof Omit<T, R[number]>]: T[K];
  };

  type HTTPMethod = keyof typeof HTTP_METHOD;

  type FetchOptions = {
    method?: HTTPMethod;
    headers?: DefinitelyObject;
    body?: string;
    credentials?: string;
  };

  type Response<T> = {
    status: number;
    statusText: string;
    ok: boolean;
    headers: Headers;
    url: string;
    data: T;
  };
}

export default _;
