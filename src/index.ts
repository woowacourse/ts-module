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
  addEvent: (
    type: keyof HTMLElementEventMap,
    handler: (this: Element, ev: Event) => void
  ) => void;
} {
  const element = document.querySelector(selector);

  if (element === null) {
    throw new Error("엘리먼트를 찾지 못하였습니다");
  }

  return {
    get() {
      return element as HTMLElement;
    },
    innerHTML(template) {
      element.innerHTML = template;
    },
    show() {
      (element as HTMLElement).style.display = "";
    },
    hidden() {
      (element as HTMLElement).style.display = "none";
    },
    addEvent(type, handler) {
      element.addEventListener(type, handler);
    },
  };
}

module _ {
  export async function fetch<T>(
    input: URL | RequestInfo,
    init?: RequestInit | undefined
  ): Promise<T> {
    const response = await window.fetch(input, init);

    if (!response.ok) {
      throw new Error("에러");
    }

    const json: unknown = await response.json();

    return json as T;
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

  export function isFunction(arg: unknown): arg is (...args: any[]) => any {
    return typeof arg === "function";
  }

  export function shuffle<T>(
    list: T[] | null | undefined
  ): T[] | null | undefined {
    return list?.sort(() => Math.random() - 0.5);
  }

  export function pick<T extends Record<string, unknown>, U extends keyof T>(
    object: T,
    ...props: Array<U>
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
    ...props: Array<U>
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

  export function memoize(callbackFunction: Function): Function {
    const cache: {
      memoized: boolean;
      data: any;
    } = {
      memoized: false,
      data: null,
    };

    const memoizedFunction = (props: any) => {
      if (!cache.memoized) {
        cache.memoized = true;
        cache.data = callbackFunction(props);
      }

      return cache.data;
    };

    return memoizedFunction;
  }

  export function debounce(callbackFunction: Function, time: number): Function {
    const debounce: {
      timeout: NodeJS.Timeout | null;
    } = {
      timeout: null,
    };

    const debouncedFunction = (props: any) => {
      if (debounce.timeout) {
        clearTimeout(debounce.timeout);
      }

      debounce.timeout = setTimeout(() => {
        callbackFunction(props);
        debounce.timeout = null;
      }, time);
    };

    return debouncedFunction;
  }

  export function throttle(callbackFunction: Function, time: number): Function {
    const throttle: {
      timeout: NodeJS.Timeout | null;
    } = {
      timeout: null,
    };

    const throttledFunction = (props: any) => {
      if (throttle.timeout) {
        return;
      }

      throttle.timeout = setTimeout(() => {
        callbackFunction(props);
        throttle.timeout = null;
      }, time);
    };

    return throttledFunction;
  }

  export function clickOutside() {}
}
export default _;
