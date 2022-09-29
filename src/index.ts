function keys<T extends Record<string, unknown>, U extends keyof T>(
  object: T
): U[] {
  const keys: unknown = Object.keys(object);
  return keys as U[];
}

function _(selector: string): {
  get: () => HTMLElement;

  innerHTML: (template: string) => void;

  show: () => void;

  hidden: () => void;

  addEvent: <K extends keyof HTMLElementEventMap>(
    type: K,
    handler: (this: Element, ev: HTMLElementEventMap[K]) => void
  ) => void;
} {
  const element = document.querySelector(selector) as HTMLElement;

  if (element === null) {
    throw new Error("엘리먼트를 찾지 못하였습니다");
  }

  return {
    get() {
      return element;
    },
    innerHTML(template) {
      element.innerHTML = template;
    },
    show() {
      element.style.display = "";
    },
    hidden() {
      element.style.display = "none";
    },
    addEvent(type, handler) {
      element.addEventListener(type, handler);
    },
  };
}

module _ {
  export async function fetch<T extends Record<keyof T, unknown>>(
    input: URL | RequestInfo,
    init?: RequestInit | undefined
  ): Promise<T> {
    const response = await window.fetch(input, init);

    if (!response.ok) {
      throw new Error("에러");
    }

    const json: T = await response.json();

    return json;
  }

  export function isNull(arg: unknown): arg is null {
    return arg === null;
  }

  export function isNil(arg: unknown): arg is null | undefined {
    return arg == null;
  }

  export function isNumber(arg: unknown): arg is number {
    return typeof arg === "number";
  }

  export function isFunction(arg: unknown): arg is Function {
    return typeof arg === "function";
  }

  export function shuffle<T>(
    list: T[] | null | undefined
  ): T[] | null | undefined {
    return list?.sort(() => Math.random() - 0.5);
  }

  export function pick<T extends Record<string, unknown>, U extends keyof T>(
    object: T,
    ...props: U[]
  ): Pick<T, U> {
    return props.reduce<Pick<T, U>>(
      (prev, currentKey) => ({
        ...prev,
        [currentKey]: object[currentKey],
      }),
      {} as Pick<T, U>
    );
  }

  export function omit<T extends Record<string, unknown>, U extends keyof T>(
    object: T,
    ...props: U[]
  ): Omit<T, U> {
    return keys<typeof object, U>(object).reduce<Omit<T, U>>(
      (prev, currentKey) => {
        if (props.includes(currentKey)) {
          return prev;
        }
        return { ...prev, [currentKey]: object[currentKey] };
      },
      {} as Omit<T, U>
    );
  }

  export function memoize<T, R extends unknown[]>(
    callbackFunction: (...args: R) => T
  ): (...args: R) => T {
    const memo: {
      cache: { isMemoized: false; data: null } | { isMemoized: true; data: T };
    } = {
      cache: {
        isMemoized: false,
        data: null,
      },
    };

    const memoizedFunction = (...args: R): T => {
      if (!memo.cache.isMemoized) {
        memo.cache = {
          isMemoized: true,
          data: callbackFunction(...args),
        };
      }

      return memo.cache.data;
    };

    return memoizedFunction;
  }

  export function debounce(
    callbackFunction: (...args: unknown[]) => void,
    time: number
  ): (...args: unknown[]) => void {
    const debounce: {
      timeout: NodeJS.Timeout | null;
    } = {
      timeout: null,
    };

    const debouncedFunction = (...args: unknown[]) => {
      if (debounce.timeout) {
        clearTimeout(debounce.timeout);
      }

      debounce.timeout = setTimeout(() => {
        callbackFunction(...args);
        debounce.timeout = null;
      }, time);
    };

    return debouncedFunction;
  }

  export function throttle(
    callbackFunction: (...args: unknown[]) => void,
    time: number
  ): (...args: unknown[]) => void {
    const throttle: {
      timeout: NodeJS.Timeout | null;
    } = {
      timeout: null,
    };

    const throttledFunction = (...args: unknown[]) => {
      if (throttle.timeout) {
        return;
      }

      throttle.timeout = setTimeout(() => {
        callbackFunction(...args);
        throttle.timeout = null;
      }, time);
    };

    return throttledFunction;
  }

  export function clickOutside() {}
}

export default _;
