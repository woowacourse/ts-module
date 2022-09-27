declare global {
  interface HTMLElement extends CustomElement {}
}

interface CustomElement {
  insertHTML: (value: string) => void;
  hide: () => void;
  show: () => void;
  addEvent: <K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any
  ) => void;
}

function _(selector: string) {
  const $elem = document.querySelector<HTMLElement>(selector);
  if ($elem === null) return;

  const insertHTML = (value: string) => {
    $elem.innerHTML = value;
  };

  const hide = () => {
    $elem.style.display = "none";
  };

  const show = () => {
    $elem.style.display = "block";
  };

  const addEvent = <K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any
  ) => {
    $elem.addEventListener(type, listener);
  };

  $elem.insertHTML = insertHTML;
  $elem.show = show;
  $elem.hide = hide;
  $elem.addEvent = addEvent;

  return $elem;
}

module _ {
  // fetch
  export function fetch(
    input: RequestInfo | URL,
    init?: RequestInit
  ): Promise<Response> {
    return fetch(input, init);
  }

  // input이 null인지 확인하여 boolean값을 반환
  export function isNull<T>(value: T): T extends null ? true : false;
  export function isNull(value: unknown): boolean {
    return value === null;
  }

  // input이 null이나 undefined인지 확인 후 boolean값을 반환
  export function isNil<T>(value: T): T extends null | undefined ? true : false;
  export function isNil(value: unknown): boolean {
    return value === null || value === undefined;
  }

  // input이 숫자인지 확인하여 boolean값을 반환
  export function isNumber<T>(value: T): T extends number ? true : false;
  export function isNumber(value: unknown): boolean {
    return typeof value === "number";
  }

  // input이 함수인지 확인하여 boolean값을 반환
  export function isFunction<T>(value: T): T extends Function ? true : false;
  export function isFunction(value: unknown): boolean {
    return typeof value === "function";
  }

  // 배열을 섞어서 새로운 배열으로 반환
  export function shuffle<T>(value: Array<T>): Array<T> {
    const copyArray = [...value];
    for (let i = copyArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [copyArray[i], copyArray[j]] = [copyArray[j], copyArray[i]];
    }
    return copyArray;
  }

  // obj에 대한 keys만 뽑은 새로운 obj를 반환
  // 아무런 keys도 넣지 않았을 때는 빈 객체를 return해줌
  export function pick<T extends Record<string, unknown>, K extends keyof T>(
    obj: T,
    keys?: Array<K>
  ): Pick<T, K> | {} {
    if (keys === undefined) {
      return obj;
    }

    const ret: any = {}; // TODO
    for (const key of keys) {
      ret[key] = obj[key];
    }
    return ret;
  }

  // obj에 대한 keys를 제거한 새로운 obj를 반환
  // 아무런 keys도 넣지 않았을 때는 obj를 반환
  export function omit<T extends Record<string, unknown>, K extends keyof T>(
    obj: T,
    keys?: Array<K>
  ): Omit<T, K> {
    if (keys === undefined) {
      return obj;
    }

    const result = { ...obj };
    keys.forEach((key) => {
      delete result[key];
    });

    return result;
  }

  // TODO
  // export function memoize(func: Function, resolver?: Function): Function;

  // wait로 설정한 시간을 대기한 이후에 로직을 실행하도록 디바운싱 된 func 함수 리턴
  // 설정한 시간 이전에 로직을 실행하면, wait가 리셋된다
  export function debounce<Params extends unknown[]>(
    func: (...args: Params) => unknown,
    wait: number
  ): (...args: Params) => unknown {
    let timer: NodeJS.Timeout;

    return (...args: Params) => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        func(...args);
      }, wait);
    };
  }

  // wait로 설정한 시간 함수를 한번만 실행하는 쓰로틀링 된 func 함수 리턴
  export function throttle<Params extends unknown[]>(
    func: (...args: Params) => unknown,
    wait: number
  ): (...args: Params) => unknown {
    let timer: NodeJS.Timeout;

    return (...args: Params) => {
      timer = setTimeout(() => {
        func(...args);
      }, wait);
    };
  }

  // 엘리먼트 밖을 클릭했을 때 실행 할 함수를 등록 (elem 밖을 클릭했을 때 func를 실행할 수 있도록 이벤트 리스너를 등록한다.)
  export function clickOutside(elem: HTMLElement, func: Function): void {
    document.addEventListener("click", (event) => {
      if (event.target === elem) return;
      func();
    });
  }
}

export default _;
