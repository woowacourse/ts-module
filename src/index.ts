function _(selector: string) {
  const element = document.createElement(selector);

  if (element === undefined) {
    throw Error("Element를 생성하는데 실패하였습니다.");
  }

  function getElement(): HTMLElement {
    return element;
  }

  function innerHtml(content?: string): string {
    if (content) {
      element.innerHTML = content;
    }

    return element.innerHTML;
  }

  function show() {
    element.style.display = "block";
  }

  function hide() {
    element.style.display = "none";
  }

  function addEvent<T extends keyof GlobalEventHandlersEventMap>(
    type: T,
    listener: (e: GlobalEventHandlersEventMap[T]) => void
  ) {
    element.addEventListener(type, listener);
  }

  return {
    getElement,
    innerHtml,
    show,
    hide,
    addEvent,
  };
}

module _ {
  export function fetch(url: string, options?: Options): Promise<unknown> {
    return new Promise((resolve, reject) => {
      resolve("server api response data");
    });
  }

  export function isNull<T>(value: T): T extends null ? true : false;
  export function isNull(value: unknown): value is null {
    return value === null;
  }

  export function isNil<T>(value: T): T extends null | undefined ? true : false;
  export function isNil(value: unknown): value is null | undefined {
    return value === null || value === undefined;
  }

  export function isNumber<T>(value: T): T extends number ? true : false;
  export function isNumber(value: unknown): value is number {
    return typeof value === "number";
  }

  export function isFunction<T>(value: T): T extends Function ? true : false;
  export function isFunction(value: unknown): value is Function {
    return typeof value === "function";
  }

  export function shuffle<T>(array: T[]): T[] {
    const newArray = [...array];
    const length = newArray.length;

    for (let start = 0; start < length; start++) {
      const randomPosition = Math.floor((length - start) * Math.random());
      const randomItem = newArray.splice(randomPosition, 1);

      newArray.push(...randomItem);
    }

    return newArray;
  }

  export function pick<T extends Record<string, unknown>, U extends keyof T>(
    object: T,
    selectedItems: U[]
  ): Pick<T, U> {
    return selectedItems.reduce((result, selectedItem) => {
      result[selectedItem] = object[selectedItem];
      return result;
    }, {} as Pick<T, U>);
  }

  export function omit<T extends Record<string, unknown>, U extends keyof T>(
    object: T,
    selectedItems: U[]
  ): Omit<T, U> {
    return selectedItems.reduce((result, selectedItem) => {
      delete object[selectedItem];
      return result;
    }, object);
  }

  export function memoize<T extends unknown[], U extends unknown>(
    callback: (...args: T) => U,
    generateKeyFunction: (...args: T) => string
  ): (...args: T) => U {
    const cacheStorage = {} as Record<string, U>;

    return function (...args: T) {
      const key = generateKeyFunction(...args);

      if (cacheStorage[key]) {
        return cacheStorage[key];
      }

      const result = callback(...args);
      cacheStorage[key] = result;

      return result;
    };
  }
}

export default _;
