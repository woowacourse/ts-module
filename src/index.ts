function _(selector: string): any {
  function getElement() {
    const el = document.getElementById(selector) as HTMLElement;

    return el;
  }

  function innerHTML(template?: string) {
    const el = getElement();

    if (template) {
      el.innerHTML = template;
      return;
    }

    return el.innerHTML;
  }

  function show() {
    const el = getElement();

    el.style.display = '';
  }

  function hidden() {
    const el = getElement();

    el.style.display = 'none';
  }

  function addEvent(type: keyof HTMLElementEventMap, listener: EventListenerOrEventListenerObject) {
    const el = getElement();

    el.addEventListener(type, listener);
  }

  return {
    innerHTML,
    show,
    hidden,
    addEvent,
  };
}

module _ {
  export function fetch(path: RequestInfo | URL, config?: RequestInit): Promise<Response> {
    return window.fetch(path, config).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
  }

  type Nullable<Type> = Type extends null ? Type : never;
  export function isNull<Type>(args: Type): args is Nullable<Type> {
    if (args === null) {
      return true;
    }

    return false;
  }

  type Nilable<Type> = Type extends null | undefined ? Type : never;
  export function isNil<Type>(args: Type): args is Nilable<Type> {
    if (args === null || args === undefined) {
      return true;
    }

    return false;
  }

  export function isNumber(args: unknown): args is number {
    return typeof args === 'number';
  }

  isNumber('zzzz');

  export function isFunction(args: unknown): args is Function {
    return typeof args === 'function';
  }

  export function shuffle<T>(args: T[]): T[] {
    let arr = [];
    let n: number = args.length;
    let i: number;
    while (n) {
      i = Math.floor(Math.random() * n--);
      arr.push(args.splice(i, 1)[0]);
    }

    return arr;
  }

  export function pick(arr: Array<string>, obj: Record<string, any>): Array<Pick<typeof obj, typeof arr[number]>> {
    return Object.entries(obj)
      .filter(([k, _]) => arr.includes(k))
      .map(([k, v]) => ({ [k]: v }));
  }

  export function omit(arr: Array<string>, obj: Record<string, any>): Array<Omit<typeof obj, typeof arr[number]>> {
    return Object.entries(obj)
      .filter(([k, _]) => !arr.includes(k))
      .map(([k, v]) => ({ [k]: v }));
  }

  const cache: CacheType = { time: 0, data: [] };
  export function memoize<T>(func: (args: any[]) => T[], timer: number = 50000): Function {
    if (!isFunction(func)) {
      throw new TypeError('Expected a function');
    }

    const memo = function (...args: any[]): T[] {
      const curTime = new Date().getTime();
      if (cache.time && cache.time + timer > curTime) {
        return cache.data;
      }
      const result: T[] = func(args);
      cache.time = curTime;
      cache.data.splice(0, 1, result);

      return cache.data;
    };

    return memo;
  }

  interface CacheType {
    time: number;
    data: any[];
  }

  export const debounce: DebounceType = {
    flag: 0,
    action({ func, args }) {
      if (this.flag) {
        clearTimeout(this.flag);
      }
      this.flag = setTimeout(() => {
        args ? func({ ...args }) : func();
      }, 300);
    },
  };

  interface DebounceActionArgsType<P, R> {
    func: (args?: P) => R;
    args?: P;
  }

  interface DebounceType {
    flag: number | ReturnType<typeof setTimeout>;
    action: <P, R>({ func, args }: DebounceActionArgsType<P, R>) => void;
  }

  let flag = true;
  export function throttle(func: Function, time: number) {
    if (flag) {
      flag = false;
      func();
    }
    setTimeout(() => {
      flag = true;
    }, time);
  }

  export function clickOutside() {}
}

export default _;
