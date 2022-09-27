import axios from "axios";

function _(selector: string) {
  const selectedNode =
    document.querySelector(selector);
  if (!selectedNode) {
    throw new Error(
      "존재하지 않는 노드 입니다"
    );
  }
  function innerHTML(
    value: string
  ): void {
    const newDiv =
      document.createElement("div");
    newDiv.append(value);
    if (!newDiv || !selectedNode) {
      throw new Error(
        "div 가 존재하지 않습니다"
      );
    }
    selectedNode.appendChild(newDiv);
  }

  function show(): void {
    if (!selectedNode) {
      throw new Error(
        "div 가 존재하지 않습니다"
      );
    }
    selectedNode.classList.remove(
      "hide"
    );
    selectedNode.classList.add(
      "active"
    );
  }

  function hidden(): void {
    if (!selectedNode) {
      throw new Error(
        "div 가 존재하지 않습니다"
      );
    }
    selectedNode.classList.remove(
      "active"
    );
    selectedNode.classList.add("hide");
  }

  function addEvent(
    eventType: keyof HTMLElementEventMap,
    func: (
      this: Element,
      event: Event
    ) => void
  ): void {
    if (!selectedNode) {
      throw new Error(
        "div 가 존재하지 않습니다"
      );
    }
    selectedNode.addEventListener(
      eventType,
      func
    );
  }
  return {
    innerHTML,
    show,
    hidden,
    addEvent,
  };
}

module _ {
  export function fetch<T>(
    url: string,
    options: FetchOption
  ): Promise<FetchResponse<T>> {
    return axios.get(url);
  }

  export function isNull(
    arg: unknown
  ): arg is null {
    return arg === null;
  }

  export function isNil(
    arg: unknown
  ): arg is null | undefined {
    return (
      arg === null || arg === undefined
    );
  }

  export function isNumber(
    arg: unknown
  ): arg is number {
    return typeof arg === "number";
  }

  export function isFunction(
    arg: unknown
  ): arg is Function {
    return typeof arg === "function";
  }

  export function shuffle(
    collection: string[]
  ): string[] | [] {
    if (
      !collection ||
      !collection.length
    ) {
      return [];
    }
    let index = -1;
    const lastIndex =
      collection.length - 1;
    const result = [...collection];
    while (
      ++index < collection.length
    ) {
      const prIndex =
        index +
        Math.floor(
          Math.random() *
            (lastIndex - index + 1)
        );
      const value = result[prIndex];
      result[prIndex] = result[index];
      result[index] = value;
    }
    return result;
  }

  export function pick(
    object: PickObject<string>,
    paths: PickPaths
  ): PickObject<string> | null {
    if (!object || !paths) {
      throw new Error(
        "존재하지 않습니다"
      );
    }
    let result: Record<string, string> =
      {};

    Object.entries(object).forEach(
      (item) => {
        if (
          typeof paths != "string" &&
          paths.includes(
            String(item[0])
          )
        ) {
          result[item[0]] = item[1];
        }
        if (
          typeof paths === "string" &&
          paths === String(item[0])
        ) {
          result[item[0]] = item[1];
        }
        return;
      }
    );

    return result;
  }

  export function omit(
    object: Record<string, string>,
    paths: PickPaths
  ): Record<string, string> | null {
    if (!object || !paths) {
      throw new Error(
        "존재하지 않습니다"
      );
    }
    let result: Record<string, string> =
      {};

    Object.entries(object).forEach(
      (item) => {
        if (
          typeof paths != "string" &&
          !paths.includes(
            String(item[0])
          )
        ) {
          result[item[0]] = item[1];
        }
        if (
          typeof paths === "string" &&
          paths !== String(item[0])
        ) {
          result[item[0]] = item[1];
        }
        return;
      }
    );

    return result;
  }

  export function memoize(
    func: () => string,
    resolver: (
      args: Record<string, string>
    ) => string[]
  ): () => string | null {
    if (
      typeof func !== "function" ||
      typeof resolver !== "function"
    ) {
      throw new Error(
        "인자가 존재하지 않습니다"
      );
    }
    let result = func();
    return function showResult() {
      return result;
    };
  }

  export function debounce(
    func: (args: string) => void,
    wait: number,
    options?: DebounceThrottleOption
  ): () => void | null {
    if (
      typeof func !== "function" ||
      typeof wait !== "number"
    ) {
      throw new Error(
        "인자가 존재하지 않습니다"
      );
    }
    let timer: null | number = null;
    return function () {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(func, wait);
    };
  }

  export function throttle(
    func: (args: string) => void,
    wait: number,
    options?: DebounceThrottleOption
  ): () => void | null {
    if (
      typeof func !== "function" ||
      typeof wait !== "number"
    ) {
      throw new Error(
        "인자가 존재하지 않습니다"
      );
    }
    let timer: null | number = null;
    return function () {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(func, wait);
    };
  }
  // 밖의 요소를 클릭하면 인자로 넘겨진 이벤트를 실행한다
  export function clickOutside(
    target: HTMLElement,
    func: (e: HTMLElement) => void
  ): void {
    if (!target) {
      throw new Error(
        "인자가 존재하지 않습니다"
      );
    }
    const parentNode =
      target.parentElement;
    if (!parentNode) {
      throw new Error(
        "parent가 존재하지 않습니다"
      );
    }
    parentNode.addEventListener(
      "click",
      () => func(parentNode)
    );
  }
}

interface FetchOption {
  method:
    | "GET"
    | "POST"
    | "DELETE"
    | "PUT";
  mode?:
    | "no-cors"
    | "cors"
    | "same-origin"
    | "cors";
  cache?:
    | "no-cache"
    | "reload"
    | "force-cache"
    | "only-if-cached";
  credentials?: "same-origin" | "omit";
  headers?: {
    "Content-Type": "application/json";
  };
  redirect?:
    | "follow"
    | "error"
    | "manual";
  referrerPolicy?:
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "origin";
  body?: "application/json";
}

interface FetchResponse<T> {
  status:
    | 200
    | 201
    | 202
    | 204
    | 400
    | 401
    | 403
    | 404
    | 500;
  ok: boolean;
  statusText: string;
  headers: Record<string, string>;
  json: () => Promise<T>;
}

type PickObject<T> = {
  [key: string]: T;
};
type PickPaths = string | string[];

export interface DebounceThrottleOption {
  leading?: boolean;
  maxWait?: number;
  trailing?: boolean;
}

export default _;
