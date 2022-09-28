class _ {
  selector: string;

  constructor(selector: string) {
    this.selector = selector;
  }

  get() {
    return document.querySelector(this.selector) as HTMLElement;
  }

  innerHTML(element: HTMLElement, text: string) {
    element.innerHTML = text;
  }

  show(element: HTMLElement) {
    element.style.display = "";
  }

  hidden(element: HTMLElement) {
    element.style.display = "none";
  }

  addEvent(
    element: HTMLElement,
    eventType: keyof HTMLElementEventMap,
    callback: () => void
  ) {
    element.addEventListener(eventType, callback);
  }
}

module _ {
  export function fetch(
    path: RequestInfo | URL,
    config?: RequestInit
  ): Promise<Response> {
    return window
      .fetch(path, config)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  export function isNull(value: unknown): value is null {
    return value === null;
  }

  export function isNil(value: unknown): value is undefined | null {
    return typeof value === "undefined" || value === null;
  }

  export function isNumber(value: unknown): value is number {
    return typeof value === "number";
  }

  export function isFunction(value: unknown): value is Function {
    return typeof value === "function";
  }

  export function shuffle<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
  }

  export function pick<T, P>(
    obj: Record<string | symbol | number, T> | T[],
    rest: P[]
  ): Record<string | symbol | number, T> | T[] {
    if (Array.isArray(obj)) {
      const pickArray: T[] = [];

      rest.forEach((restItem) => {
        if (typeof restItem !== "number") return [];

        pickArray.push(obj.filter((objItem) => objItem === obj[restItem])[0]);
      });

      return pickArray;
    }

    const pickObject: Record<string | symbol | number, T> = {};
    const objEntires = Object.entries(obj);

    rest.forEach((restItem) => {
      const [key, value] = objEntires.filter(
        (objEntry) => objEntry[0] === restItem
      )[0];

      pickObject[key] = value;
    });

    return pickObject;
  }

  export function omit<T, P>(
    obj: Record<string | symbol | number, T> | T[],
    rest: P[]
  ): Record<string | symbol | number, T> | T[] {
    if (Array.isArray(obj)) {
      const omitArray: T[] = [...obj];
      let idx = 0;

      while (rest.length > idx) {
        const targetItem = rest[idx];
        if (typeof targetItem !== "number") return [];

        omitArray.splice(omitArray.indexOf(obj[targetItem]), 1);

        idx++;
      }

      return omitArray;
    }

    const omitObject: Record<string | symbol | number, T> = {};
    const objEntires = Object.entries(obj);
    let idx = 0;

    while (rest.length > idx) {
      const targetItem = rest[idx];
      objEntires.splice(
        objEntires.findIndex((objEntry) => objEntry[0] === targetItem),
        1
      );

      idx++;
    }

    objEntires.forEach((objEntry) => {
      const [key, value] = objEntry;
      omitObject[key] = value;
    });

    return omitObject;
  }

  export function memoize<T>(func: () => T): () => T {
    const cache: { memoizedData: T | null } = {
      memoizedData: null,
    };

    return function () {
      if (cache.memoizedData) {
        return cache.memoizedData;
      }

      cache.memoizedData = func();

      return cache.memoizedData;
    };
  }

  export function debounce<T, P extends any[]>(
    callback: (...args: P) => T,
    delay: number
  ) {
    let timerId: ReturnType<typeof setTimeout>;

    return function (...args: P) {
      if (timerId) clearTimeout(timerId);

      timerId = setTimeout(() => callback(...args), delay);
    };
  }

  export function throttle<T, P extends any[]>(
    callback: (...args: P) => T,
    delay: number
  ) {
    let timerId: ReturnType<typeof setTimeout> | null;

    return function (...args: P) {
      if (timerId) return;

      timerId = setTimeout(() => {
        callback(...args);
        timerId = null;
      }, delay);
    };
  }

  export function clickOutside(
    parentElement: HTMLElement,
    targetElement: HTMLElement,
    callback: (targetElement: HTMLElement) => void
  ): void {
    parentElement.addEventListener("click", (event: MouseEvent) => {
      if (!targetElement.contains(event.target as HTMLElement)) {
        callback(targetElement);

        return;
      }
    });
  }
}

export default _;
