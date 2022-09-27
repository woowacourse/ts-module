function _(selector: string): any {
  function innerHTML(template?: string) {
    const el = document.getElementById(selector) as HTMLElement;
    if (template) {
      el.innerHTML = template;
      return;
    }

    return el.innerHTML;
  }

  function show() {
    const el = document.getElementById(selector) as HTMLElement;
    el.style.display = '';
  }

  function hidden() {
    const el = document.getElementById(selector) as HTMLElement;
    el.style.display = 'none';
  }

  function addEvent(type: keyof HTMLElementEventMap, listener: EventListenerOrEventListenerObject) {
    const el = document.getElementById(selector) as HTMLElement;
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

  type Nillable<Type> = Type extends null | undefined ? Type : never;
  export function isNil<Type>(args: Type): args is Nillable<Type> {
    if (args === null || args === undefined) {
      return true;
    }

    return false;
  }

  export function isNumber(args: unknown): args is number {
    return typeof args === 'number';
  }

  export function isFunction(args: unknown): args is Function {
    return typeof args === 'function';
  }

  export function shuffle(args: any[]): any[] {
    let arr = [];
    let n: number = args.length;
    let i: number;
    while (n) {
      i = Math.floor(Math.random() * n--);
      arr.push(args.splice(i, 1)[0]);
    }

    return arr;
  }

  interface ObjType {
    [props: string]: any;
  }

  export function pick(arr: Array<string>, obj: ObjType): Array<Pick<typeof obj, typeof arr[number]>> {
    return Object.entries(obj)
      .filter(([k, _]) => arr.includes(k))
      .map(([k, v]) => ({ [k]: v }));
  }

  export function omit(arr: Array<string>, obj: ObjType): Array<Omit<typeof obj, typeof arr[number]>> {
    return Object.entries(obj)
      .filter(([k, _]) => !arr.includes(k))
      .map(([k, v]) => ({ [k]: v }));
  }

  const cache = { time: 0, data: [] as any[] };

  export function memoize<T>(func: Function, timer: number = 50000): Function {
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

  export const debounce: DebounceType = {
    flag: '',
    action({ func, args }) {
      if (this.flag) {
        clearTimeout(this.flag);
      }
      this.flag = setTimeout(async () => {
        await func(args && { ...args });
      }, 300);
    },
  };

  interface DebounceActionArgsType {
    func: Function;
    args?: { [props: string]: any };
  }

  interface DebounceType {
    flag: '' | ReturnType<typeof setTimeout>;
    action: ({ func, args }: DebounceActionArgsType) => void;
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
