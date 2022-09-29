/// <reference path="./types/index.d.ts" />

import { isIterable } from './util';

class CustomElement {
  target;
  constructor(selector: string) {
    this.target = document.body.querySelector<HTMLElement>(selector);
  }

  innerHTML(html: string): void {
    if (this.target) {
      this.target.innerHTML = html;
    }
  }

  show(): void {
    if (this.target && this.target.style.display === 'none') {
      this.target.style.display = '';
    }
  }

  hidden(): void {
    if (this.target) this.target.style.display = 'none';
  }

  addEvent<K extends keyof HTMLElementEventMap>(
    eventType: K,
    callback: (this: HTMLElement, ev: HTMLElementEventMap[K]) => void
  ): void {
    if (this.target) this.target.addEventListener(eventType, callback);
  }
}

function _(selector: string): CustomElement {
  return new CustomElement(selector);
}

module _ {
  export function fetch(
    input: RequestInfo | URL,
    init?: RequestInit
  ): Promise<Response> {
    return window.fetch(input, init);
  }

  export function isNull(input: unknown): input is null {
    return input === null;
  }

  export function isNil(input: unknown): input is null | undefined {
    return input == null;
  }

  export function isNumber(input: unknown): input is number {
    return typeof input === 'number';
  }

  export function isFunction(input: unknown): input is Function {
    return typeof input === 'function';
  }

  export function shuffle<T>(input: Iterable<T>): T[];
  export function shuffle<T>(input: Record<string, T>): T[];
  export function shuffle(input: Function): [];
  export function shuffle(input: object): unknown[];
  export function shuffle(input: object | Iterable<unknown>): unknown[] {
    let result;
    if (isIterable(input)) {
      result = Array.from(input);
    } else if (typeof input === 'object') {
      result = Object.values(input);
    } else {
      return [];
    }

    if (result.length === 0) {
      return [];
    }
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = result[i];
      result[i] = result[j];
      result[j] = temp;
    }
    return result;
  }

  export function pick<T extends object, K extends keyof T>(
    obj: T,
    ...target: Array<K | K[]>
  ): Pick<T, K> {
    const result = {};
    target.forEach((item) => {
      let target;
      if (typeof item !== 'string' && isIterable(item)) {
        target = pick(obj, ...item);
        Object.assign(result, target);
      } else if (typeof item === 'string' && Object.keys(obj).includes(item)) {
        target = { [item]: obj[item] };
        Object.assign(result, target);
      }
    });
    return result as Pick<T, K>;
  }

  export function omit<
    T extends Record<string, unknown>,
    K extends string[] | string[][]
  >(obj: T, ...target: K): Partial<T> {
    let result: Partial<T> = {};
    target.forEach((item) => {
      let target;
      if (typeof item !== 'string') {
        target = omit(obj, ...item);
        result = target;
      } else if (typeof item === 'string' && Object.keys(obj).includes(item)) {
        delete obj[item];
        result = obj;
      }
    });
    return result;
  }

  export function memoize<T extends (...args: any) => any>(
    func: T,
    resolver?: (...args: Parameters<T>) => any
  ) {
    function memoized(this: unknown, ...args: Parameters<T>) {
      const key = resolver ? resolver.apply(this, args) : args[0];
      const cache = memoized.cache;

      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = func.apply(this, args);
      memoized.cache = cache.set(key, result) || cache;
      return result;
    }

    memoized.cache = new Map();
    return memoized;
  }
  module.children;
  export function debounce<T extends (...args: any) => any>(
    func: T,
    wait?: number,
    options?: DebounceSettings
  ): DebouncedFunc<T> {
    let lastArgs: any,
      lastThis: any,
      maxWait: number,
      result: ReturnType<T>,
      timerId: NodeJS.Timeout | undefined,
      lastCallTime: number | undefined;

    let lastInvokeTime = 0;
    let leading = false;
    let maxing = false;
    let trailing = true;

    wait = +wait! || 0;
    if (options) {
      leading = !!options.leading;
      maxing = 'maxWait' in options;
      maxWait = maxing ? Math.max(+options.maxWait! || 0, wait) : maxWait!;
      trailing = 'trailing' in options ? !!options.trailing : trailing;
    }

    function invokeFunc(time: number) {
      const args = lastArgs;
      const thisArg = lastThis;

      lastArgs = lastThis = undefined;
      lastInvokeTime = time;
      result = func.apply(thisArg, args);
      return result;
    }

    function startTimer(pendingFunc: () => void, wait?: number) {
      return setTimeout(pendingFunc, wait);
    }

    function cancelTimer(id: NodeJS.Timeout) {
      clearTimeout(id);
    }

    function leadingEdge(time: number) {
      lastInvokeTime = time;
      timerId = startTimer(timerExpired, wait);
      return leading ? invokeFunc(time) : result;
    }

    function remainingWait(time: number) {
      const timeSinceLastCall = time - lastCallTime!;
      const timeSinceLastInvoke = time - lastInvokeTime;
      const timeWaiting = wait! - timeSinceLastCall;

      return maxing
        ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
        : timeWaiting;
    }

    function shouldInvoke(time: number) {
      const timeSinceLastCall = time - lastCallTime!;
      const timeSinceLastInvoke = time - lastInvokeTime;

      return (
        lastCallTime === undefined ||
        timeSinceLastCall >= wait! ||
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

    function debounced(this: unknown, ...args: unknown[]) {
      const time = Date.now();
      const isInvoking = shouldInvoke(time);

      lastArgs = args;
      lastThis = this;
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
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    debounced.pending = pending;

    return debounced;
  }

  export function throttle<T extends (...args: any) => any>(
    func: T,
    wait?: number,
    options?: ThrottleSettings
  ): DebouncedFunc<T> {
    let leading = true;
    let trailing = true;

    if (options) {
      leading = 'leading' in options ? !!options.leading : leading;
      trailing = 'trailing' in options ? !!options.trailing : trailing;
    }
    return debounce(func, wait, {
      leading,
      trailing,
      maxWait: wait,
    });
  }

  export function clickOutside(target: Node, func: (...args: any[]) => void) {
    window.addEventListener('click', (e: MouseEvent) => {
      if (
        !(e.target instanceof Node) ||
        (e.target instanceof Node && e.target.isSameNode(target))
      ) {
        return;
      }
      func(...func.arguments);
    });
  }
}

export default _;
