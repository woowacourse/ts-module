import { DebouncedFunc, DebounceOptions, FetchOptions } from "./utils";

interface CustomElement {
  element: HTMLElement | null;
  innerHTML: (template: string) => void;
  show: () => void;
  hide: () => void;
  addEvent: <T extends keyof HTMLElementEventMap>(
    eventType: T,
    callback: (...args: any) => void
  ) => void;
}

function _(selector: string): CustomElement {
  const element = document.querySelector(selector) as HTMLElement;

  return {
    element,
    innerHTML: (template: string) => {
      element.innerHTML = template;
    },
    show: () => {
      element.style.display = "block";
    },
    hide: () => {
      element.style.display = "none";
    },
    addEvent: <T extends keyof HTMLElementEventMap>(
      eventType: T,
      callback: (...args: any) => void
    ) => {
      element.addEventListener(eventType, callback);
    },
  };
}

module _ {
  export function fetch(
    url: string,
    fetchOptions?: FetchOptions
  ): Promise<Response> {
    return fetch(url, { ...fetchOptions });
  }
  export function isNull(value: unknown): value is null {
    return value === null;
  }

  export function isNil(value: unknown): value is null | undefined {
    return value === null || value === undefined;
  }

  export function isNumber(value: unknown): value is number {
    return typeof value === "number";
  }

  export function isFunction(value: unknown): value is (...args: any[]) => any {
    return typeof value === "function";
  }

  export function shuffle<T>(array: T[]): T[] {
    const duplicatedArray: T[] = JSON.parse(JSON.stringify(array));
    duplicatedArray.sort(() => Math.random() - 0.5);

    return duplicatedArray;
  }

  export function pick<T extends object, U extends keyof T>(
    object: T,
    targetList: U[]
  ): Pick<T, U> {
    return targetList.reduce((previous, key) => {
      previous[key] = object[key];

      return previous;
    }, {} as Pick<T, U>);
  }

  export function omit<T extends object, K extends keyof T>(
    object: T,
    target: K[]
  ): Omit<T, K> | {} {
    const newObj = { ...object };
    target.forEach((key) => {
      delete newObj[key];
    });

    return newObj;
  }

  export function memoize<T extends Array<unknown>, K>(
    func: (...args: T) => K,
    resolver?: (...args: T) => unknown
  ): (...args: T) => K {
    if (
      typeof func !== "function" ||
      (resolver != null && typeof resolver !== "function")
    ) {
      throw new TypeError("Expected a function");
    }
    const memoized = function (...args) {
      const key = resolver ? resolver.apply(this, args) : args[0];
      const cache = memoized.cache;

      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = func.apply(this, args);
      memoized.cache = cache.set(key, result) || cache;
      return result;
    };
    memoized.cache = new (memoize.Cache || Map)();
    return memoized;
  }

  memoize.Cache = Map;

  export function debounce<T extends (...args: any) => any>(
    func: T,
    wait: number,
    options?: DebounceOptions
  ): DebouncedFunc<T> {
    let maxWait: number,
      result: any,
      timerId: any,
      lastCallTime: number,
      lastInvokeTime: number,
      leading = false,
      trailing = false;

    if (typeof func != "function") {
      throw new TypeError("not function error");
    }
    wait = +wait || 0;
    if (options) {
      leading = !!options.leading;
      trailing = !!options.trailing;
    }

    function shouldInvoke(time: number) {
      const timeSinceLastCall = time - lastCallTime;
      const timeSinceLastInvoke = time - lastInvokeTime;
      return (
        lastCallTime === undefined ||
        timeSinceLastCall >= wait ||
        timeSinceLastCall < 0 ||
        timeSinceLastInvoke >= maxWait
      );
    }

    function startTimer(pendingFunc: (...args: any) => any, wait: number) {
      return setTimeout(pendingFunc, wait);
    }

    function remainingWait(time: number) {
      const timeSinceLastCall = time - lastCallTime;
      const timeWaiting = wait - timeSinceLastCall;

      return timeWaiting;
    }

    function timerExpired() {
      const time = Date.now();
      if (shouldInvoke(time)) {
        return;
      }
      timerId = startTimer(timerExpired, remainingWait(time));
    }

    function cancel() {
      if (timerId !== undefined) {
        clearTimeout(timerId);
      }
      lastInvokeTime = 0;
    }

    function flush() {
      return timerId === undefined ? result : null;
    }

    function debounced(this: any, ...args: any[]) {
      const time = Date.now();
      if (shouldInvoke(time)) {
        timerId = startTimer(timerExpired, wait);
        lastInvokeTime = time;
        return func.apply(this, args);
      }
      return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;

    return debounced;
  }

  export function throttle<T extends (...args: any) => any>(
    func: T,
    wait: number,
    options?: Omit<DebounceOptions, "maxWait">
  ): DebouncedFunc<T> {
    let leading = true,
      trailing = true;

    if (typeof func != "function") {
      throw new TypeError("함수를 기대했습니다..");
    }
    if (options) {
      leading = "leading" in options ? !!options.leading : leading;
      trailing = "trailing" in options ? !!options.trailing : trailing;
    }
    return debounce(func, wait, {
      leading: leading,
      maxWait: wait,
      trailing: trailing,
    });
  }

  export function clickOutside(
    eventTarget: HTMLElement,
    innerElement: HTMLElement
  ): boolean {
    return !innerElement.contains(eventTarget);
  }
}

export default _;
