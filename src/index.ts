class ElementUtil {
  element: HTMLElement | null;
  constructor(selector: string) {
    this.element = document.querySelector(selector);
  }

  innerHTML() {
    if (typeof this.element === null) {
      return;
    }
    return this.element?.innerHTML;
  }

  show() {
    if (typeof this.element === null) {
      return;
    }
    this.element!.style.display = "block";
  }

  hidden() {
    if (typeof this.element === null) {
      return;
    }
    this.element!.style.display = "none";
  }

  addEvent<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any
  ) {
    if (typeof this.element === null) {
      return;
    }
    this.element?.addEventListener(type, listener);
  }
}

function _(selector: string): ElementUtil {
  const selectedElement = new ElementUtil(selector);

  return selectedElement;
}

module _ {
  let debounceFunc: NodeJS.Timeout;
  let isThrottle: boolean;

  /**
   * @param {string} resource defines the resource that you wish to fetch.
   * @param {object} object containing any custom settings that you want to apply to the request.
   * @returns {Promise<Response>} A Promise that resolves to a Response object.
   */
  export function fetch(resource: string, object?: object) {
    return window.fetch(resource, object);
  }

  /**
   * Checks if `value` is `null`.
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
   */
  export function isNull(value: unknown): boolean {
    return value === null;
  }

  /**
   * Checks if `value` is `null` or `undefined`.
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
   */
  export function isNil(value: unknown): boolean {
    return isNull(value) || value === undefined;
  }

  /**
   * Checks if `value` is classified as a `Number` primitive or object. To exclude `Infinity`, `-Infinity`, and `NaN`, which are
   * classified as numbers, use the `_.isFinite` method.
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
   */
  export function isNumber(value: unknown): boolean {
    return typeof value == "number" && isFinite(value) && !isNaN(value);
  }

  /**
   * Checks if `value` is classified as a `Function` object.
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
   */
  export function isFunction(value: unknown): boolean {
    return value instanceof Function;
  }

  /**
   * Creates an array of shuffled values
   * @param {Array<T>} collection The collection to shuffle.
   * @returns {Array<T>} Returns the new shuffled array.
   */
  export function shuffle<T>(collection: Array<T>): Array<T> {
    return collection.sort(() => Math.random() - 0.5);
  }

  /**
   * Creates an object composed of the picked `object` properties.
   * @param {object} object The source object.
   * @param {...(string|string[])} [paths] The property paths to pick.
   * @returns {object} Returns the new object.
   */
  export function pick<T extends object, K extends keyof T>(
    object: T,
    paths: K
  ): Pick<T, K>;
  export function pick<T extends object, K extends keyof T>(
    object: T,
    paths: K[]
  ): { [P in K]: T[P] };
  export function pick<T extends object, K extends keyof T>(
    object: T,
    paths: K | K[]
  ) {
    const result = {};

    if (typeof paths === "string") {
      result[String(paths)] = object[paths];
    }

    if (typeof paths === "object") {
      for (let path of paths as K[]) {
        result[String(path)] = object[path];
      }
    }

    return result;
  }

  /**
   * Creates an object composed of the own and inherited enumerable property
   * paths of `object` that are not omitted.
   * @param {object} object The source object.
   * @param {...(string|string[])} [paths] The property paths to omit.
   * @returns {object} Returns the new object.
   */
  export function omit<T extends object, K extends keyof T>(
    object: T,
    paths: K
  ): Omit<T, K>;
  export function omit<T extends object, K extends keyof T>(
    object: T,
    paths: K[]
  ): { [P in Exclude<keyof T, K>]: T[P] };
  export function omit<T extends object, K extends keyof T>(
    object: T,
    paths: K | K[]
  ) {
    const result = Object.assign(object);

    if (typeof paths === "string") {
      delete result[paths];
      return result;
    }

    if (typeof paths === "object") {
      for (let path of paths as K[]) {
        delete result[path];
      }
    }

    return result;
  }

  /**
   * Creates a function that memoizes the result of `func`.
   * @param {Function} func The function to have its output memoized.
   * @returns {Function} Returns the new memoized function.
   */
  export function memoize<T extends unknown, K>(
    func: (...args: Array<T>) => K,
    resolver: (...args: Array<T>) => K
  ): (...args: Array<T>) => K {
    const memoized = function (this: any, args: any) {
      const key = resolver ? resolver.apply(this, args) : args[0];
      const cache = memoized.cache;

      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = func.apply(this, args);
      memoized.cache = cache.set(key, result) || cache;
      return result;
    };
    memoized.cache = new Map();
    return memoized;
  }

  /**
   * Creates a check Func debounce
   * @param {Function} func The function to debounce.
   * @param {number} time is debounce time.
   */
  export function debounce(func: Function, time: number) {
    if (debounceFunc) {
      clearTimeout(debounceFunc);
    }
    debounceFunc = setTimeout(() => {
      func();
    }, time);
  }

  /**
   * Creates a throttled `func`.
   * @param {Function} func The function to throttle.
   * @param {number} time is throttle time.
   */
  export function throttle(func: Function, time: number) {
    if (!isThrottle) {
      isThrottle = true;

      setTimeout(() => {
        isThrottle = false;
      }, time);

      func();
    }
  }

  /**
   * eventTarget이 innerElement에 포함되는지 체크한다.
   * @param {HTMLElement} eventTarget
   * @param {HTMLElement} innerElement
   * @returns {boolean}
   */
  export function clickOutside(
    eventTarget: HTMLElement,
    innerElement: HTMLElement
  ): boolean {
    return !innerElement.contains(eventTarget);
  }
}

export default _;
