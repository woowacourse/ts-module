class Tt {
  selector = "";
  element: HTMLElement | null;
  constructor(selector: string) {
    this.selector = selector;
    this.element = document.querySelector(selector);
  }

  innerHTML(innerStr: string): void {
    if (!this.element) throw new Error("선택된 요소 없음");
    this.element.innerHTML = innerStr;
  }
  show(): void {
    if (!this.element) throw new Error("선택된 요소 없음");
    this.element.className = "show";
  }
  hidden(): void {
    if (!this.element) throw new Error("선택된 요소 없음");
    this.element.className = "hidden";
    console.log(this.element.className);
  }
  addEvent<K extends keyof HTMLElementEventMap>(
    eventName: K,
    listener: (event: HTMLElementEventMap[K]) => void
  ): void {
    if (!this.element) throw new Error("선택된 요소 없음");
    this.element.addEventListener(eventName, listener);
  }
}

function tt(selector: string) {
  return new Tt(selector);
}

module tt {
  export function fetch(url: string): Promise<Response> {
    return globalThis.fetch(url); // node v17부터 node 환경 fetch가 가능해졌다고 합니다.
  }

  export function isNull(value: unknown): value is null {
    return value === null;
  }

  // null or undefined
  export function isNil(value: unknown): value is null | undefined {
    return value === null || value === undefined;
  }

  export function isNumber(value: unknown): value is number {
    return typeof value === "number";
  }

  export function isFunction(value: unknown): value is (...args: any[]) => any {
    return typeof value === "function";
  }

  export function shuffle<T>(array: Array<T>): Array<T> {
    let result = array.slice();

    for (let index = array.length - 1; index > 0; index--) {
      const selectedIndex = Math.floor(Math.random() * (index + 1));
      [result[index], result[selectedIndex]] = [
        result[selectedIndex],
        result[index],
      ];
    }
    return result;
  }

  export function pick<
    Obj extends Record<string, unknown>,
    Key extends keyof Obj
  >(obj: Obj, keys: Array<Key>): Pick<Obj, Key> {
    const result = keys.reduce<Pick<Obj, Key>>((acc, key) => {
      if (!obj[key]) throw new Error("객체의 key 배열이 아닙니다.");

      acc[key] = obj[key];
      return acc;
    }, {} as Pick<Obj, Key>);

    return result;
  }

  export function omit<
    Obj extends Record<string, unknown>,
    Key extends keyof Obj
  >(obj: Obj, keys: Array<Key>): Omit<Obj, Key> {
    const result = { ...obj };
    keys.forEach((key) => {
      if (!obj[key]) throw new Error("객체의 key 배열이 아닙니다.");
      delete result[key];
    });

    return result;
  }

  // Creates a function that memoizes the result of func
  export function memoize<ReturnValue>(
    func: () => ReturnValue
  ): () => ReturnValue {
    const result = func();

    return () => {
      return result;
    };
  }

  export function debounce(
    func: () => void,
    timeInterval: number
  ): typeof func {
    let timer: NodeJS.Timeout | null = null;

    return () => {
      timer && clearTimeout(timer);
      timer = setTimeout(() => {
        func();
      }, timeInterval);
    };
  }

  export function throttle(
    func: () => void,
    timeInterval: number
  ): typeof func {
    let timer: NodeJS.Timeout | null = null;

    return () => {
      if (timer) return;
      timer = setTimeout(() => {
        timer = null;
        func();
      }, timeInterval);
    };
  }

  export function clickOutside(
    target: EventTarget,
    handler: (e: HTMLElementEventMap["click"]) => void
  ): void {
    window.addEventListener("click", (e) => {
      const composedPath = e.composedPath();
      const isTargetClicked = composedPath.some((el) => el === target);
      if (isTargetClicked) return;
      handler(e);
    });
  }
}

export default tt;
