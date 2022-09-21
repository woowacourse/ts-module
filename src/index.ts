class DomUtils {
  #element:
    | (Element & {
        innerHTML: () => string;
        show: () => void;
        hidden: () => void;
        addEvent: () => void;
      })
    | null = null;

  constructor(selector: string) {
    this.#element = document.querySelector(selector);
  }

  getElement() {
    return this.#element;
  }

  innerHTML() {
    if (!this.#element) {
      throw new Error('innerHTML 에러: element가 null 입니다.');
    }
    return this.#element.innerHTML;
  }

  show() {}

  hidden() {}

  addEvent(
    event: string,
    listener: (this: Element, ev: Event) => any,
    options?: boolean | AddEventListenerOptions | undefined
  ) {
    if (!this.#element) {
      throw new Error('addEvent 에러: element가 null 입니다.');
    }
    this.#element.addEventListener(event, listener, options);
  }
}

function _(selector: string) {
  const domUtils = new DomUtils(selector);

  const element = domUtils.getElement();

  if (!element) {
    throw new Error('_() 에러: element가 null 입니다.');
  }

  // element.innerHTML = () => alert(true);

  return element;
}

// type isNull = (value: any) => boolean;

module _ {
  export function fetch() {
    return {};
  }

  /**
   * @param {*} value
   * @returns {boolean}
   */
  export function isNull(value: unknown) {
    return value === null;
  }

  /**
   * @param {*} value
   * @returns {boolean}
   */
  export function isNil(value: unknown) {
    return value == null;
  }

  /**
   * @param {*} value
   * @returns {boolean}
   */
  export function isNumber(value: unknown) {
    return typeof value === 'number';
  }

  /**
   * @param {*} value
   * @returns {boolean}
   */
  export function isFunction(value: unknown) {
    return typeof value === 'function';
  }

  /**
   * 배열의 인자의 순서를 무작위로 섞은 새로운 배열을 반환하는 함수
   * @param {Array} array
   * @returns {Array}
   */
  export function shuffle(array: []) {
    if (!array.length) {
      return [];
    }
    const shuffled = new Array(...array);
    return shuffled.sort(() => Math.random() - 0.5);
  }

  /**
   * 객체에서 키가 일치하는 프로퍼티만 포함한 새로운 객체를 반환하는 함수
   * @param {Object} object
   * @param {string[]} keys
   * @returns {Object}
   */
  export function pick(object: Object, keys: []) {
    const picked = {};

    for (const key of keys) {
      picked[key] = object[key];
    }

    return picked;
  }

  // 객체에서 키가 일치하는 프로퍼티를 제외한 새로운 객체를 반환하는 함수
  export function omit(object: any, keys: any) {
    const omitted: any = {};

    const pickedKeys = Object.keys(object).filter((key) => !keys.includes(key));

    for (const key of pickedKeys) {
      omitted[key] = object[key];
    }

    return omitted;
  }

  export function memoize() {}

  export function debounce() {}

  export function throttle() {}

  export function clickOutside() {}
}

export default _;
