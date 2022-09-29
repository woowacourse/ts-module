function _(selector: string) {
  const element = document.createElement(selector);

  if (element === undefined) {
    throw Error('Element를 생성하는데 실패하였습니다.');
  }

  function getElement(): HTMLElement {
    return element;
  }

  function innerHtml(content?: string): string {
    if (content !== undefined) {
      element.innerHTML = content;
    }

    return element.innerHTML;
  }

  function show() {
    element.style.display = 'block';
  }

  function hide() {
    element.style.display = 'none';
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
  type FetchBodyType =
    | string
    | URLSearchParams
    | FormData
    | Blob
    | ArrayBuffer
    | ArrayBufferView
    | DataView;

  type Url = `http${'' | 's'}://${string}`;

  type FetchOptions = {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: FetchBodyType | null;
    headers?: Record<string, string>;
    credentials?: 'omit' | 'same-origin' | 'include';
  };

  type Response<Data> = {
    status: number;
    ok: boolean;
    statusText: string;
    url?: string;
    headers?: Record<string, string>;
    json: () => Promise<Data>;
  };

  export function fetch<Data>(
    url: Url,
    options?: FetchOptions
  ): Promise<Response<Data>> {
    return new Promise((resolve, reject) => {
      const response: Response<Data> = {
        status: 200,
        ok: true,
        statusText: 'example code',
        json: () => {
          return new Promise((resolve, reject) => {
            resolve('아무튼 데이터임..!' as unknown as Data);
          });
        },
      };

      resolve(response);
    });
  }

  type Nullable<T> = T extends null ? T : never;
  export function isNull<T>(value: T): value is Nullable<T> {
    return value === null;
  }

  type Nilable<T> = T extends null | undefined ? T : never;
  export function isNil<T>(value: T): value is Nilable<T> {
    return isNull(value) || value === undefined;
  }

  type Numberable<T> = T extends number ? T : never;
  export function isNumber<T>(value: T): value is Numberable<T> {
    return typeof value === 'number';
  }

  type Functionable<T> = T extends Function ? T : never;
  export function isFunction<T>(value: T): value is Functionable<T> {
    return typeof value === 'function';
  }

  export function shuffle<T>(value: T[]): T[] {
    const length = value == null ? 0 : value.length;

    if (!length) {
      return [];
    }

    let index = -1;
    const lastIndex = length - 1;
    const result = [...value];

    while (++index < length) {
      const rand = index + Math.floor(Math.random() * (lastIndex - index + 1));
      const value = result[rand];
      result[rand] = result[index];
      result[index] = value;
    }

    return result;
  }

  export function pick<T extends Record<string, unknown>, R extends keyof T>(
    obj: T,
    ...keys: R[]
  ): Pick<T, R> {
    return keys.reduce((acc, key) => {
      acc[key] = obj[key];

      return acc;
    }, {} as Pick<T, R>);
  }

  export function omit<T extends Record<string, unknown>, R extends keyof T>(
    obj: T,
    ...keys: R[]
  ): Omit<T, R> {
    return keys.reduce(
      (acc, key) => {
        delete acc[key];

        return acc;
      },
      { ...obj }
    );
  }

  type Func = (...args: any[]) => any;
  export function memoize<T extends Func>(
    func: T,
    makeKey: (...args: any[]) => string
  ): Func {
    const cache: Record<string, any> = {};

    return (...args: any[]): any => {
      const key = makeKey(args);

      return cache[key] ? cache[key] : (cache[key] = func(...args));
    };
  }

  export function debounce<T extends (...args: any[]) => void>(
    func: T,
    wait: number
  ): (...args: any[]) => void {
    let timer: ReturnType<typeof setTimeout> | null = null;

    return (...args: any[]) => {
      if (timer) clearTimeout(timer);

      timer = setTimeout(() => func(...args), wait);
    };
  }

  type ThrrotleFuncParams = unknown[];
  type VoidFunction = (...args: ThrrotleFuncParams) => void;
  export function throttle<T extends VoidFunction>(
    func: T,
    wait: number
  ): VoidFunction {
    let timer: ReturnType<typeof setTimeout> | null = null;

    return (...args: ThrrotleFuncParams) => {
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          func(...args);
        }, wait);
      }
    };
  }

  export function clickOutside(
    dom: HTMLElement,
    func: (...args: any[]) => void
  ): void {
    window.addEventListener('click', (e, ...args) => {
      if (!(e.target instanceof HTMLElement)) {
        return;
      }
      if (e.target === dom) {
        return;
      }

      func(...args);
    });
  }
}

export default _;
