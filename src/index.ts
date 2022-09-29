import { CustomNode, FetchOptions, FetchResponse } from "./@types";

function _(selector: string): CustomNode {
  const element = document.querySelector(selector);

  if (element === null)
    throw new Error("Error: there is no element with entered selector.");

  const get = () => element;

  const innerHTML = (value: string) => {
    if (value) element.innerHTML = value;

    return element.innerHTML;
  };

  const show = () => {
    if (element instanceof HTMLElement) {
      element.style.display = "block";
    }
  };

  const hidden = () => {
    if (element instanceof HTMLElement) element.style.display = "none";
  };

  const addEvent = <K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any
  ) => {
    if (element instanceof HTMLElement)
      element.addEventListener(type, listener);
  };

  return {
    get,
    innerHTML,
    show,
    hidden,
    addEvent,
  };
}

module _ {
  export function fetch<T = any>(
    url: string,
    options?: FetchOptions
  ): Promise<FetchResponse<T>> {
    if (options !== undefined) return fetch(url, { ...options });
    return fetch(url);
  }

  export function isNull(value: unknown) {
    return value == null;
  }

  export function isNil(value: unknown) {
    return value == null || value === undefined;
  }

  export function isNumber(value: unknown) {
    return typeof value === "number";
  }

  export function isFunction(value: unknown) {
    return typeof value === "function";
  }

  export function shuffle<T>(array: Array<T>): Array<T> {
    const length = array == null ? 0 : array.length;
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
  }

  export function pick<T extends Record<string, unknown>, K extends keyof T>(
    object: T,
    type: K | Array<K>
  ): Record<string, unknown> {
    if (typeof type !== "object") {
      return object.hasOwnProperty(type)
        ? {
            type: object[type],
          }
        : {};
    }

    const newObject = <T>{};

    type.forEach((el) => {
      if (object.hasOwnProperty(el)) {
        newObject[el] = object[el];
      }
    });

    return newObject;
  }

  export function omit<T extends Record<string, unknown>, K extends keyof T>(
    object: T,
    type: K | K[]
  ): Record<string, unknown> {
    const newObject = Object.assign({}, object);

    if (typeof type !== "object") {
      if (newObject.hasOwnProperty(type)) {
        delete newObject[type];
      }
      return newObject;
    }

    type.forEach((el) => {
      if (newObject.hasOwnProperty(el)) {
        delete newObject[el];
      }
    });

    return newObject;
  }

  export function memoize<T>(func: (value: unknown) => T) {
    const results: Record<string, unknown> = {};

    return (...args: unknown[]) => {
      const key = args.join("");

      if (!results[key]) {
        results[key] = func(args);
      }

      return results[key];
    };
  }

  export function debounce(callback: Function, delay: number) {
    let timer: NodeJS.Timeout;
    return (e: unknown) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(callback(e), delay);
    };
  }

  export function throttle(callback: Function, delay: number) {
    let waiting = true;

    return function () {
      if (waiting) {
        callback();
        waiting = false;
        setTimeout(() => {
          waiting = true;
        }, delay);
      }
    };
  }

  export function clickOutside(element: HTMLElement, callback: Function): void {
    if (element === null) return;

    element.addEventListener("click", (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && !element.contains(e.target)) {
        callback();
      }
    });
  }
}

export default _;
