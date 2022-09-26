interface CustomElementMethod {
  addEvent<T extends keyof GlobalEventHandlersEventMap>(
    eventType: T,
    handler: (event: GlobalEventHandlersEventMap[T]) => void
  ): void;

  html(): string;
  html(content: string): void;
  html(content?: string): string | void;

  show(): void;
  show(duration: number, complete: Function): void;

  hide(): void;
  hide(duration: number, complete: Function): void;
}

declare global {
  interface HTMLElement extends CustomElementMethod {}
}
/**
 * Document에서 주어진 선택자에 따라 요소를 찾아 유틸리티 매서드와 함께 반환합니다.
 *
 * @param selector 선택할 요소의 css 선택자
 * @returns 선택된 HTML 요소
 */
function _(selector: string) {
  const element = document.querySelector<HTMLElement>(selector);
  if (element === null) throw new Error("요소 없음");

  /**
   * 선택된 요소의 innerHTML 값을 반환하거나 설정합니다.
   * 인자로 전달되는 값이 없으면 innerHTML 값을 반환하고 문자열이 전달되면 요소에 삽입됩니다.
   *
   * @param content 삽입할 html 문자열
   */
  function html(): string;
  function html(content: string): void;
  function html(content?: string): string | void {
    if (element === null) throw new Error("요소 없음");
    if (content) {
      element.innerHTML = content;
      return;
    }

    return element.innerHTML;
  }

  /**
   * 선택된 요소를 화면에 표시합니다. display 스타일을 활용합니다.
   */
  const show = () => {
    if (element === null) throw new Error("요소 없음");
    element.style.display = "block";
  };

  /**
   * 선택된 요소를 화면에서 숨깁니다. display 스타일을 활용합니다.
   */
  const hide = () => {
    if (element === null) throw new Error("요소 없음");
    element.style.display = "hidden";
  };

  /**
   * 선택된 요소에 이벤트 리스너를 추가합니다.
   *
   * @param eventType 이벤트의 종류
   * @param handler 이벤트가 발생한 경우 실행할 콜백 함수
   */
  const addEvent = <T extends keyof GlobalEventHandlersEventMap>(
    eventType: T,
    handler: (event: GlobalEventHandlersEventMap[T]) => void
  ): void => {
    if (element === null) throw new Error("요소 없음");
    element.addEventListener(eventType, handler);
  };

  element.html = html;
  element.show = show;
  element.hide = hide;
  element.addEvent = addEvent;

  return element;
}

module _ {
  /**
   * XMLHttpRequest를 활용해 비동기적으로 서버와 통신합니다.
   *
   * @param url 요청을 받을 서버의 주소
   * @param method 요청 매서드
   * @param payload 요청 body에 추가할 정보
   * @returns 서버로부터 받은 응답
   */
  export function fetch(
    url: string,
    method: string,
    payload?: unknown
  ): Promise<any> {
    const request = new XMLHttpRequest();
    request.open(method, url);
    request.responseType = "json";
    const requestBody = JSON.stringify(payload);

    let resolve: unknown, reject: unknown;

    request.onload = function (this: XMLHttpRequest) {
      if (typeof resolve !== "function")
        throw new Error("잘못 설정된  resolver");
      return resolve(this.response);
    };

    request.onerror = function (this: XMLHttpRequest) {
      if (typeof reject !== "function")
        throw new Error("잘못 설정된  rejecter");
      return reject(this.response);
    };

    request.send(requestBody);

    return new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
  }

  /**
   * null인지 여부를 반환합니다.
   *
   * @param input 검증 대상 값
   * @returns input이 null인지 여부
   */
  export function isNull<T>(input: T): T extends null ? true : false;
  export function isNull(input: unknown): input is null {
    return input === null;
  }

  /**
   *  null 혹은 undefined인지 여부를 반환합니다.
   *
   * @param input 검증 대상 값
   * @returns input이 null 혹은 undefined인지 여부
   */
  export function isNil<T>(input: T): T extends null | undefined ? true : false;
  export function isNil(input: unknown): input is null | undefined {
    return input === null || input === undefined;
  }

  /**
   * number인지 여부를 반환합니다.
   *
   * @param input 검증 대상 값
   * @returns input이 number인지 여부
   */
  export function isNumber<T>(input: T): T extends number ? true : false;
  export function isNumber(input: unknown): input is Number {
    return typeof input === "number";
  }

  /**
   * function인지 여부를 반환합니다.
   *
   * @param input 검증 대상 값
   * @returns input이 function인지 여부
   */
  export function isFunction<T>(input: T): T extends Function ? true : false;
  export function isFunction(input: unknown): input is Function {
    return typeof input === "function";
  }

  /**
   * 배열 혹은 객체의 값의 배열의 순서를 무작위로 섞어 반환합니다.
   *
   * @param collection 섞을 배열 혹은 객체
   * @returns 배열인 경우 섞인 배열, 객체인 경우 객체의 값으로 이루어진 섞인 배열
   */
  export function shuffle<T>(collection: T[]): T[];
  export function shuffle<T>(collection: Record<string, T>): T[];
  export function shuffle<T>(collection: T[] | Record<string, T>) {
    const result =
      collection instanceof Array ? collection : Object.values(collection);

    let currIndex = result.length;
    let randomIndex;

    while (currIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currIndex);
      currIndex -= 1;
      [result[currIndex], result[randomIndex]] = [
        result[randomIndex],
        result[currIndex],
      ];
    }

    return result;
  }

  /**
   * 객체에서 일부 속성 값만 추출해서 만든 새로운 객체를 반환합니다.
   *
   * @param object 대상 객체
   * @param props 선택할 속성의 배열
   * @returns 대상 객체 중 선택한 속성만으로 구성된 새로운 객체
   */
  export function pick<
    T extends Record<string, unknown>,
    U extends Partial<keyof T>
  >(object: T, props: U[]): Pick<T, U> {
    return props.reduce((acc, curr) => {
      acc[curr] = object[curr];
      return acc;
    }, {} as Pick<T, U>);
  }

  /**
   * 객체에서 일부 속성 값만 제거해서 만든 새로운 객체를 반환합니다.
   *
   * @param object 대상 객체
   * @param props 제거할 속성의 배열
   * @returns 대상 객체에서 선택한 속성을 제거한 새로운 객체
   */
  export function omit<
    T extends Record<string, unknown>,
    U extends Partial<keyof T>
  >(object: T, props?: U[]): Omit<T, U> {
    return props === undefined
      ? object
      : props.reduce((acc, curr) => {
          delete acc[curr];
          return acc;
        }, object);
  }

  /**
   * 함수의 연산에 메모이제이션을 적용해, 동일한 인자가 주어졌을 때 반복적인 연산을 생략하고 저장된 값을 반환하는 함수를 반환합니다.
   * resolver 함수를 전달하지 않으면 자동으로 첫 번째 인자를 캐시 키로 활용합니다.
   *
   * @param func 메모이제이션을 적용할 함수
   * @param resolver 캐시 키를 생성하는 함수
   * @returns 메모이제이션이 적용된 함수
   */
  export function memoize<T extends unknown[], U>(
    func: (...args: T) => U,
    resolver?: (...args: T) => string
  ): (...args: T) => U {
    const cache = new Map();
    const memoizedFunction = (...args: T) => {
      const cacheKey = resolver !== undefined ? resolver(...args) : args[0];
      if (cache.has(cacheKey)) return cache.get(cacheKey);

      const result = func(...args);
      cache.set(cacheKey, result);

      return result;
    };
    return memoizedFunction;
  }

  /**
   * 실행하기 전 정해진 시간을 대기하는 디바운스가 적용된 함수를 반환합니다.
   * 지연 시간을 전달하지 않으면 지연되지 않고 바로 함수가 실행됩니다.
   *
   * @param func 디바운스를 적용할 함수
   * @param wait 함수 실행 지연시간
   * @returns 디바운스가 적용된 함수
   */
  export const debounce: <T extends unknown[], U>(
    func: (...args: T) => U,
    wait?: number
  ) => (...args: T) => U = <T extends unknown[], U>(
    func: (...args: T) => U,
    wait = 0
  ) => {
    let timer: NodeJS.Timeout, result: U;

    const debouncedFunction = (...args: T) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        result = func(...args);
      }, wait);

      return result;
    };

    return debouncedFunction;
  };

  /**
   * 일정 시간 동안 함수를 한 번만 실행하는 쓰로틀이 적용된 함수를 반환합니다.
   * 주기를 전달하지 않으면 함수가 호출 될 때마다 실행됩니다.
   *
   * @param func 쓰로틀을 적용할 함수
   * @param wait 함수를 1회 실행할 주기
   * @returns 쓰로틀이 적용된 함수
   */
  export const throttle: <T extends unknown[], U>(
    func: (...args: T) => U,
    wait?: number
  ) => (...args: T) => U | undefined = <T extends unknown[], U>(
    func: (...args: T) => U,
    wait = 0
  ) => {
    let shouldRun = true;
    let result: U;

    const throttledFunction = (...args: T) => {
      if (!shouldRun) return;

      shouldRun = false;
      setTimeout(() => {
        result = func(...args);

        shouldRun = true;
      }, wait);

      return result;
    };

    return throttledFunction;
  };

  /**
   * 전달된 대상 요소가 아닌 다른 요소가 클릭되었을 때 콜백함수를 호출하는 이벤트 리스너를 추가합니다.
   *
   * @param targetElement 대상 요소
   * @param handler 대상 요소가 아닌 곳이 클릭됐을 때 호출할 콜백 함수
   */
  export function clickOutside(
    targetElement: Element,
    handler: (event: MouseEvent) => void
  ): void {
    window.addEventListener("click", (e) => {
      if (e.target === targetElement) return;
      handler(e);
    });
  }
}

export default _;
