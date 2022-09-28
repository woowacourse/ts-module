const cache: Record<string, any> = {};

function _(selector: string) {
  const element: HTMLElement =
    document.querySelector(selector) || document.createElement("div");

  function innerHTML(DOMString: string) {
    element.innerHTML = DOMString;
  }

  function show() {
    element.style.display = "block";
  }

  function hidden() {
    element.style.display = "none";
  }

  function addEvent<K extends keyof GlobalEventHandlersEventMap>(
    type: K,
    listener: (event: GlobalEventHandlersEventMap[K]) => void,
    options?: boolean
  ) {
    addEventListener(type, listener, options);
  }

  return { element, innerHTML, show, hidden, addEvent };
}

module _ {
  export function fetch(
    input: RequestInfo | URL,
    init?: RequestInit
  ): Promise<Response> {
    return window.fetch(input, init);
  }

  export function isNull(value: unknown) {
    return value === null;
  }

  export function isNil(value: unknown) {
    return value == null;
  }

  export function isNumber(value: unknown) {
    return typeof value === "number";
  }

  export function isFunction(value: unknown) {
    return typeof value === "function";
  }

  export function shuffle(collection: Array<any>) {
    let shuffledCollection = JSON.parse(JSON.stringify(collection));

    for (let index = shuffledCollection.length - 1; index > 0; index--) {
      const randomPosition = Math.floor(Math.random() * (index + 1));
      const temporary = shuffledCollection[index];
      shuffledCollection[index] = shuffledCollection[randomPosition];
      shuffledCollection[randomPosition] = temporary;
    }

    return shuffledCollection;
  }

  export function pick(
    target: Record<string, any>,
    property: Array<string>
  ): Record<string, any> {
    const newObject = {};
    property.forEach((key) => {
      Object.defineProperty(newObject, key, {
        value: target[key],
        enumerable: true,
      });
    });

    return newObject;
  }

  export function omit(
    target: Record<string, any>,
    property: Array<string>
  ): Record<string, any> {
    const newObject = JSON.parse(JSON.stringify(target));
    property.forEach((key) => {
      Object.defineProperty(newObject, key, {
        enumerable: false,
      });
    });

    return newObject;
  }

  export function memoize(func: Function) {
    const key = func.toString();

    if (!cache[key]) {
      cache[key] = func();
    }

    return cache[key];
  }

  export function debounce(func: Function, wait: number = 0) {
    let timer: NodeJS.Timeout;

    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => func(), wait);
    };
  }

  export function throttle(func: Function, wait: number = 0) {
    let timer: NodeJS.Timeout | null;

    return () => {
      if (timer) return;

      timer = setTimeout(() => {
        timer = null;
        func();
      }, wait);
    };
  }

  export function clickOutside(
    targetElement: HTMLElement,
    clickedElement: HTMLElement
  ) {
    return !targetElement.contains(clickedElement);
  }
}

export default _;
