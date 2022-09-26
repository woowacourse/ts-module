class Tt {
  selector = "";
  element: Element | null;
  constructor(selector: string) {
    this.selector = selector;
    this.element = document.querySelector(selector);
  }

  innerHTML(innerStr: string): void {}
  show(): void {}
  hidden(): void {}
  addEvent<K extends keyof GlobalEventHandlersEventMap>(
    eventName: K,
    listener: (event: GlobalEventHandlersEventMap[K]) => void
  ): void {}
}

function tt(selector: string) {
  return new Tt(selector);
}

module tt {
  export function fetch(url: string): Promise<Response> {}

  export function isNull(value: unknown): value is null {}

  // null or undefined
  export function isNil(value: unknown): value is null | undefined {}

  export function isNumber(value: unknown): value is number {}

  export function isFunction(
    value: unknown
  ): value is (...args: any[]) => any {}

  export function shuffle<T>(array: Array<T>): Array<T> {}

  export function pick<Obj extends Object, Key extends keyof Obj>(
    obj: Obj,
    keys: Array<Key>
  ): Pick<Obj, Key> {}

  export function omit<Obj extends Object, Key extends keyof Obj>(
    obj: Obj,
    keys: Array<Key>
  ): Omit<Obj, Key> {}

  // Creates a function that memoizes the result of func
  export function memoize<ReturnValue>(
    func: (...args: any) => ReturnValue
  ): () => ReturnValue {}

  export function debounce<Params extends any[], ReturnValue>(
    func: (...params: Params) => ReturnValue,
    timeInterval: number
  ): typeof func {}

  export function throttle<Params extends any[], ReturnValue>(
    func: (...params: Params) => ReturnValue,
    timeInterval: number
  ): typeof func {}

  export function clickOutside(
    target: EventTarget,
    handler: (event: GlobalEventHandlersEventMap["click"]) => void
  ): void {}
}

export default tt;
