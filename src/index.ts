function _<T extends HTMLElement>(selector: string) {
  const element = document.querySelector(selector) as T | null;

  const get = () => {
    return element;
  };

  const show = () => {
    if (!element) {
      return;
    }
    element.style.display = 'block';
  };

  const hidden = () => {
    if (!element) {
      return;
    }
    element.style.display = 'none';
  };

  const addEvent = <K extends keyof HTMLElementEventMap>(
    event: K,
    listener: (event: HTMLElementEventMap[K]) => void
  ) => {
    if (!element) {
      return;
    }
    element.addEventListener(event, listener);
  };

  const clickOutside = (func: (...args: unknown[]) => void) => {
    window.addEventListener('click', (e: MouseEvent) => {
      if (e.target !== element) {
        func();
      }
    });
  };

  return {
    get,
    innerHTML: element?.innerHTML,
    show,
    hidden,
    addEvent,
    clickOutside,
  };
}

declare global {
  interface Response<DataType = any> extends Body {
    json(): Promise<DataType>;
  }
}

module _ {
  export function fetch<DataType>(url: string, options?: RequestInit): Promise<Response<DataType>> {
    return window.fetch(url, options);
  }

  export function isNull(value: unknown): boolean {
    return value === null;
  }

  export function isNil(value: unknown): boolean {
    return value == null;
  }

  export function isNumber(value: unknown): boolean {
    return typeof value === 'number';
  }

  export function isFunction(value: unknown): boolean {
    return typeof value === 'function';
  }

  export function shuffle<T extends unknown>(array: T[]): T[] {
    const length = array == null ? 0 : array.length;

    if (!length) {
      return [];
    }

    const result = [...array];

    let index = -1;
    const lastIndex = length - 1;

    while (++index < length) {
      const random = index + Math.floor(Math.random() * (lastIndex - index + 1));
      const value = result[random];

      result[random] = result[index];
      result[index] = value;
    }

    return result;
  }

  // @TODO: {} vs Record
  export function pick<T extends Record<string, unknown>, K extends keyof T>(
    object: T,
    ...keys: K[]
  ): Pick<T, K> {
    return keys.reduce<Pick<T, K>>(
      (prev, key) => ({ ...prev, [key]: object[key] }),
      {} as Pick<T, K>
    );
  }

  export function omit<T extends {}, K extends keyof T>(object: T, ...keys: K[]): Omit<T, K> {
    const result = { ...object };

    keys.forEach(key => {
      delete result[key];
    });

    return result;
  }

  const cache: Record<string, any> = {};

  export function memoize<T extends any[], K extends unknown>(
    func: (...args: T) => K,
    key: string
  ) {
    const memoized = (...args: T): K => {
      if (cache[key]) {
        return cache[key];
      }

      const result = func(...args);

      cache[key] = result;

      return result;
    };
    return memoized;
  }

  export function debounce<T extends any[]>(
    func: (...args: T) => void,
    delay: number
  ): (...args: T) => void {
    let timer: NodeJS.Timeout;

    return (...args: T): void => {
      if (timer) clearTimeout(timer);

      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  export function throttle<T extends any[]>(
    func: (...args: T) => void,
    delay: number
  ): (...args: T) => void {
    let timer: NodeJS.Timeout | null;

    return (...args: T): void => {
      if (!timer) {
        func(...args);
        timer = setTimeout(() => {
          timer = null;
        }, delay);
      }
    };
  }
}

export default _;
