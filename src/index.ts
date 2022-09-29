import { FetchOptions, FetchResponse } from "types";

class SelectedElement {
  element;

  constructor(selector: string) {
    const selectedElement = document.querySelector(selector) as HTMLElement;

    if (_.isNull(selectedElement)) {
      throw new Error("There is no such element");
    }
    this.element = selectedElement;
  }

  innerHTML(html: string): void {
    this.element.innerHTML = html;
  }

  show(): void {
    this.element.style.display = "block";
  }

  hidden(): void {
    this.element.style.display = "none";
  }

  addEvent<K extends keyof HTMLElementEventMap>(
    type: K,
    callback: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any
  ) {
    this.element.addEventListener(type, callback);
  }
}

function _(selector: string) {
  const selectedElement = new SelectedElement(selector);

  return selectedElement;
}

module _ {
  export function fetch<T = any>(
    url: string,
    options?: FetchOptions
  ): Promise<FetchResponse<T>> {
    return fetch(url, { ...options });
  }

  export function isNull(value: unknown): value is null {
    return value === null;
  }

  export function isNil(value: unknown): boolean {
    return value == null;
  }

  function isObjectLike(value: unknown): boolean {
    return typeof value === "object" && value !== null;
  }

  function getTag(value: unknown): string {
    if (value == null) {
      return value === undefined ? "[object Undefined]" : "[object Null]";
    }
    return Object.prototype.toString.call(value);
  }

  export function isNumber(value: unknown): value is number {
    return (
      typeof value === "number" ||
      (isObjectLike(value) && getTag(value) == "[object Number]")
    );
  }

  export function isFunction(value: unknown): value is Function {
    return typeof value === "function";
  }

  function copyArray<T extends unknown>(source: T[]): T[] {
    let index = -1;
    const length = source.length;

    const array = new Array(length);
    while (++index < length) {
      array[index] = source[index];
    }
    return array;
  }

  export function shuffle<T extends unknown>(collection: T[]): T[] {
    const length = collection == null ? 0 : collection.length;
    if (!length) {
      return [];
    }
    let index = -1;
    const lastIndex = length - 1;
    const result = copyArray(collection);
    while (++index < length) {
      const rand = index + Math.floor(Math.random() * (lastIndex - index + 1));
      const value = result[rand];
      result[rand] = result[index];
      result[index] = value;
    }
    return result;
  }

  function getPathArray<T, K extends keyof T>(
    object: T,
    paths: K | Array<K>
  ): Array<K> {
    let pathArray = [] as Array<K>;

    if (typeof paths === "string") {
      pathArray.push(paths);
    }
    if (typeof paths === "object") {
      pathArray = [...paths];
    }
    return pathArray;
  }

  export function pick<T, K extends keyof T>(
    object: T,
    paths: K | Array<K>
  ): Pick<T, K> {
    const result = {} as Pick<T, K>;

    const pathArray = getPathArray(object, paths);

    pathArray.forEach((path) => {
      result[path] = object[path as keyof T] as T[K];
    });
    return result;
  }

  export function omit<T, K extends keyof T>(
    object: T,
    paths: K | Array<K>
  ): Omit<T, K> {
    const pathArray = getPathArray(object, paths);

    pathArray.forEach((path) => {
      delete object[path];
    });

    return object;
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
    const memoized = (...args: T) => {
      const key = resolver ? resolver.apply(null, args) : args[0];
      const cache = memoized.cache;

      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = func.apply(null, args);
      memoized.cache = cache.set(key, result) || cache;
      return result;
    };
    memoized.cache = new (memoize.Cache || Map)();
    return memoized;
  }

  memoize.Cache = Map;

  interface DebounceOptionType {
    leading: boolean;
    maxWait?: number;
    trailing: boolean;
  }

  export interface DebouncedFunctionType<T extends Array<unknown>> {
    (...args: T): unknown;
    cancel: () => void;
    flush: () => unknown;
    pending: () => boolean;
  }

  export function debounce<T extends Array<unknown>>(
    func: (...args: T) => unknown,
    wait: number = 0,
    options: DebounceOptionType = {
      leading: false,
      trailing: true,
    }
  ): DebouncedFunctionType<T> {
    let lastArgs: T | undefined,
      lastThis: unknown,
      maxWait: number,
      result: unknown,
      timerId: number | undefined,
      lastCallTime: number | undefined;

    let lastInvokeTime = 0;
    let leading = false;
    let maxing = false;
    let trailing = true;

    const useRAF =
      !wait && wait !== 0 && typeof requestAnimationFrame === "function";

    if (typeof func !== "function") {
      throw new TypeError("Expected a function");
    }
    wait = +wait || 0;

    leading = !!options.leading;
    maxing = "maxWait" in options;
    maxWait =
      maxing && options.maxWait ? Math.max(+options.maxWait || 0, wait) : 0;
    trailing = "trailing" in options ? !!options.trailing : trailing;

    function invokeFunc(time: number) {
      const args = lastArgs;
      const thisArg = lastThis;

      lastArgs = lastThis = undefined;
      lastInvokeTime = time;
      result = func.apply(thisArg, args as T);
      return result;
    }

    function startTimer(pendingFunc: FrameRequestCallback, wait: number) {
      if (useRAF) {
        cancelAnimationFrame(timerId as number);
        return requestAnimationFrame(pendingFunc);
      }
      return setTimeout(pendingFunc, wait);
    }

    function cancelTimer(id: number) {
      if (useRAF) {
        return cancelAnimationFrame(id);
      }
      clearTimeout(id);
    }

    function leadingEdge(time: number) {
      lastInvokeTime = time;
      timerId = startTimer(timerExpired, wait);
      return leading ? invokeFunc(time) : result;
    }

    function remainingWait(time: number) {
      const timeSinceLastCall = time - (lastCallTime as number);
      const timeSinceLastInvoke = time - lastInvokeTime;
      const timeWaiting = wait - timeSinceLastCall;

      return maxing
        ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
        : timeWaiting;
    }

    function shouldInvoke(time: number) {
      const timeSinceLastCall = time - (lastCallTime as number);
      const timeSinceLastInvoke = time - lastInvokeTime;

      return (
        lastCallTime === undefined ||
        timeSinceLastCall >= wait ||
        timeSinceLastCall < 0 ||
        (maxing && timeSinceLastInvoke >= maxWait)
      );
    }

    function timerExpired() {
      const time = Date.now();
      if (shouldInvoke(time)) {
        return trailingEdge(time);
      }
      timerId = startTimer(timerExpired, remainingWait(time));
    }

    function trailingEdge(time: number) {
      timerId = undefined;

      if (trailing && lastArgs) {
        return invokeFunc(time);
      }
      lastArgs = lastThis = undefined;
      return result;
    }

    function cancel() {
      if (timerId !== undefined) {
        cancelTimer(timerId);
      }
      lastInvokeTime = 0;
      lastArgs = lastCallTime = lastThis = timerId = undefined;
    }

    function flush() {
      return timerId === undefined ? result : trailingEdge(Date.now());
    }

    function pending() {
      return timerId !== undefined;
    }

    const debounced = (...args: T) => {
      const time = Date.now();
      const isInvoking = shouldInvoke(time);

      lastArgs = args as T;
      lastCallTime = time;

      if (isInvoking) {
        if (timerId === undefined) {
          return leadingEdge(lastCallTime);
        }
        if (maxing) {
          timerId = startTimer(timerExpired, wait);
          return invokeFunc(lastCallTime);
        }
      }
      if (timerId === undefined) {
        timerId = startTimer(timerExpired, wait);
      }
      return result;
    };
    debounced.cancel = cancel;
    debounced.flush = flush;
    debounced.pending = pending;
    return debounced;
  }

  interface ThrottleOptionType {
    leading: boolean;
    trailing: boolean;
  }

  export function throttle<T extends Array<unknown>>(
    func: (...args: T) => unknown,
    wait: number = 0,
    options: ThrottleOptionType = { leading: true, trailing: true }
  ): DebouncedFunctionType<T> {
    let leading = true;
    let trailing = true;

    if (typeof func !== "function") {
      throw new TypeError("Expected a function");
    }
    leading = "leading" in options ? !!options.leading : leading;
    trailing = "trailing" in options ? !!options.trailing : trailing;
    return debounce(func, wait, {
      leading,
      trailing,
      maxWait: wait,
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
