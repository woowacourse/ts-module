declare global {
  interface HTMLElement extends CustomElement {}
}

interface CustomElement {
  innerHtml: (html: string) => string;
  hide: () => void;
  show: () => void;
  addEvent: <T extends keyof HTMLElementEventMap>(
    type: T,
    handler: (event: HTMLElementEventMap[T]) => void
  ) => void;
}

function _(selector: string) {
  const element = document.querySelector<HTMLElement>(selector);

  if (element === null) {
    throw new Error("Element is null");
  }

  const innerHtml = (html: string): string => {
    if (html) {
      element.innerHTML = html;
    }

    return element.innerHTML;
  };

  const show = () => {
    element.style.display = "block";
  };

  const hide = () => {
    element.style.display = "hidden";
  };

  const addEvent = <T extends keyof HTMLElementEventMap>(
    type: T,
    handler: (event: HTMLElementEventMap[T]) => void
  ) => {
    element.addEventListener(type, handler);
  };

  element.show = show;
  element.hide = hide;
  element.addEvent = addEvent;
  element.innerHtml = innerHtml;

  return element;
}

module _ {
  export function fetch<T>(url: string, config: RequestInit): Promise<T> {
    return fetch(url, config);
  }

  export function isNull<T>(value: T): boolean {
    return value === null;
  }

  export function isNil<T>(value: T): boolean {
    return value === null || value === undefined;
  }

  export function isNumber<T>(value: T): boolean {
    return typeof value === "number";
  }

  export function isFunction<T>(value: T): boolean {
    return typeof value === "function";
  }

  export function shuffle<T>(collection: T[]): T[] {
    const length = collection === null ? 0 : collection.length;
    if (!length) {
      return [];
    }
    let index = -1;
    const lastIndex = length - 1;
    const result = [...collection];
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
    K extends Partial<keyof T>
  >(obj: T, paths: K[]): Pick<T, K> {
    return paths.reduce((acc, cur) => {
      acc[cur] = obj[cur];
      return acc;
    }, {} as Pick<T, K>);
  }

  export function omit<
    T extends Record<string, unknown>,
    K extends Partial<keyof T>
  >(obj: T, paths: K[]): Omit<T, K> {
    const copyObj = { ...obj };
    paths.forEach((key) => {
      delete copyObj[key];
    });
    return copyObj;
  }

  export function memoize(func: Function): Function {
    const cacheStorage: Record<string, unknown> = {};

    return (key: string) => {
      if (cacheStorage[key]) {
        return cacheStorage[key];
      }

      cacheStorage[key] = func(key);
      return cacheStorage[key];
    };
  }

  export function debounce(func: Function, wait: number = 0) {
    let timer: NodeJS.Timeout;

    return () => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        func();
        clearTimeout(timer);
      }, wait);
    };
  }

  export function throttle(func: Function, wait: number = 0) {
    let isWaiting = true;

    return () => {
      if (isWaiting) {
        isWaiting = false;
        setTimeout(() => {
          func();
          isWaiting = true;
        }, wait);
      }
    };
  }

  export function clickOutside(
    target: HTMLElement,
    element: HTMLElement
  ): boolean {
    return !element.contains(target);
  }
}

export default _;
