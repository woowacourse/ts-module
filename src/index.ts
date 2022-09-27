function _(selector: string): any {
  const el = document.querySelector(selector) as HTMLElement;

  const get = () => el;
  const innerHTML = () => el.innerHTML;
  const show = () => (el.style.display = "block");
  const hidden = () => (el.style.display = "none");
  const addEvent = (type: string, listener: EventListenerObject) =>
    el.addEventListener(type, listener);

  return {
    get,
    innerHTML,
    show,
    hidden,
    addEvent,
  };
}

module _ {
  export function fetch(
    path: RequestInfo | URL,
    config?: RequestInit
  ): Promise<Response> {
    return global.fetch(path, config).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
  }

  /**
   * parameter가 null인지 판별한다.
   * @param {*} value
   * @return {boolean} false or true
   */
  export function isNull(value: unknown): boolean {
    return value === null;
  }

  /**
   * parameter가 null혹은 undefined인지 판별한다.
   * @param {*} value
   * @return {boolean} false or true
   */
  export function isNil(value: any): value is boolean {
    return value === null || value === undefined;
  }

  /**
   * parameter의 타입이 number인지 판별한다.
   * @param {*} value
   * @return {boolean} false or true
   */
  export function isNumber(value: any): value is boolean {
    return (
      typeof value === "number" ||
      Object.prototype.toString.call(value) === "[object Number]"
    );
  }

  /**
   * parameter가 Function인지 판별한다.
   * @param {*} value
   * @return {boolean} false or true
   */
  export function isFunction(value: any): value is boolean {
    return (
      typeof value === "function" ||
      Object.prototype.toString.call(value) === "[object Function]"
    );
  }

  /**
   * parameter 배열을 무작위로 섞어 반환한다.
   * @param {Array} Array
   * @return {Array} Array
   */
  export function shuffle<T>([...array]: T[]): T[] {
    let m = array.length;

    while (m) {
      const i = Math.floor(Math.random() * m--);
      [array[m], array[i]] = [array[i], array[m]];
    }

    return array;
  }

  /**
   * object에서 keys의 요소만 골라 새로운 객체로 반환한다.
   * @param {Object} object
   * @param {...(string| string[])} keys rest parameter는 object의 key값이다.
   * @return {Object} keys로만 포함된 새로운 객체를 반환한다.
   */
  export function pick<T, K extends keyof T>(
    object: T,
    ...keys: K[]
  ): Pick<T, K> {
    const newObject: any = {};

    keys.forEach((key) => {
      newObject[key] = object[key];
    });

    return newObject;
  }

  /**
   *
   * @param {Object} object
   * @param {...(string| string[])} keys rest parameter는 object의 key값이다.
   * * @return {Object} keys 제거된 새로운 객체를 반환한다.
   */
  export function omit<T extends { [key: string]: any }, K extends keyof T>(
    object: T,
    ...keys: K[]
  ): Omit<T, K> {
    const newObject: any = {};

    const OriginalKeys = Object.keys(object);

    const newKeys = OriginalKeys.filter(
      (key) => !(keys as string[]).includes(key)
    );

    newKeys.forEach((key) => {
      newObject[key] = object[key];
    });

    return newObject;
  }

  /**
   * cache에 함수의 결과값이 저장되어 있으면 cache에 저장된 값을 반환한다.
   * @param func 실행시킬 함수
   * @returns 캐시에 저장된 함수의 결과값
   */
  export function memoize(func: Function): Function {
    const cache: any = {};

    return function (n: string) {
      if (cache[n]) return cache[n];

      cache[n] = func(n);
      return cache[n];
    };
  }

  /**
   * 디바운스 함수
   * @param func 함수 실행 체크
   * @param wait 타이머 시간
   */
  export function debounce(func: Function, wait: number) {
    let timer: ReturnType<typeof setTimeout> | undefined = undefined;

    return () => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        func();
        clearTimeout(timer);
      }, wait);
    };
  }

  /**
   * 쓰로틀링 함수
   * @param func 함수 실행 체크
   * @param wait 타이머 시간
   */
  export function throttle(func: Function, wait: number) {
    let timer: ReturnType<typeof setTimeout> | null = null;

    return () => {
      if (!timer) {
        timer = setTimeout(() => {
          func();
          timer = null;
        }, wait);
      }
    };
  }

  /**
   * 두 Element 비교
   * @param outerElement
   * @param innerElement
   */
  export function clickOutside(
    outerElement: HTMLElement,
    innerElement: HTMLElement
  ): boolean {
    return outerElement.contains(innerElement);
  }
}

export default _;
