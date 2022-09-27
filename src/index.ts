declare global {
  interface HTMLElement extends CustomElement {}
}

interface CustomElement {
  innerHtml: (htmlString: string) => void;
  hide: () => void;
  show: () => void;
  addEvent: <K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, event: HTMLElementEventMap[K]) => any
  ) => void;
}

function _(selector: string) {
  const element = document.querySelector<HTMLElement>(selector);
  if (!element) return;

  const innerHtml = (htmlString: string) => {
    element.innerHTML = htmlString;
  };

  const show = () => {
    element.style.display = "block";
  };

  const hide = () => {
    element.style.display = "none";
  };

  const addEvent = <K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, event: HTMLElementEventMap[K]) => any
  ) => {
    element.addEventListener(type, listener);
  };

  element.innerHtml = innerHtml;
  element.show = show;
  element.hide = hide;
  element.addEvent = addEvent;

  return element;
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

type HeadersObject<T = any> = Record<string, T>;

type PickResult<T extends Record<string, unknown>, R extends (keyof T)[]> = {
  [K in R[number]]: T[K];
};

type OmitResult<T extends Record<string, any>, R extends (keyof T)[]> = {
  [K in keyof Omit<T, R[number]>]: T[K];
};

type HTTPMethod = keyof typeof HTTP_METHOD;

type FetchOptions = {
  method?: HTTPMethod;
  headers?: HeadersObject;
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

  export function debounce() {}

  export function throttle() {}

  export function clickOutside(
    eventTarget: HTMLElement,
    innerElement: HTMLElement
  ): boolean {
    return !innerElement.contains(eventTarget);
  }
}

export default _;
