function _(
  selector: string
): void | Error {
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
    selectedNode.appendChild(newDiv);
  }

  function show(): void {
    selectedNode.classList.remove(
      "hide"
    );
    selectedNode.classList.add(
      "active"
    );
  }

  function hidden(): void {
    selectedNode.classList.remove(
      "active"
    );
    selectedNode.classList.add("hide");
  }

  function addEvent(
    eventType: keyof ElementEventMap,
    func: (
      this: Element,
      event: Event
    ) => void
  ): void {
    selectedNode.addEventListener(
      eventType,
      func
    );
  }
}

module _ {
  // export function fetch<T>(
  //   url: string,
  //   options: FetchOption
  // ): Promise<FetchResponse<T>> {
  //   const response = new Promise();
  // }

  export function isNull<T>(
    arg: T
  ): boolean {
    return arg === null;
  }

  export function isNil<T>(
    arg: T
  ): boolean {
    return arg === null ||
      arg === undefined
      ? true
      : false;
  }

  export function isNumber<T>(
    arg: T
  ): boolean {
    return typeof arg === "number";
  }

  export function isFunction<T>(
    arg: T
  ): boolean {
    return typeof arg === "function";
  }

  export function shuffle<T>(
    collection: T[]
  ): T[] | [] {
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

  export function pick<T>(
    object: PickObject<T>,
    paths: PickPaths
  ): PickObject<T> | null {
    if (!object || !paths) {
      return;
    }
    const result = Object.fromEntries(
      Object.entries(object).map(
        (item) => {
          if (
            typeof paths != "string" &&
            paths.includes(
              String(item[0])
            )
          ) {
            return item;
          }
          if (
            typeof paths === "string" &&
            paths === String(item[0])
          ) {
            return item;
          }
          return;
        }
      )
    );

    return result;
  }

  export function omit<T>(
    object: Record<string, T>,
    paths: PickPaths
  ): Record<string, T> | null {
    if (!object || !paths) {
      return;
    }
    const result = Object.fromEntries(
      Object.entries(object).map(
        (item) => {
          if (
            typeof paths != "string" &&
            !paths.includes(
              String(item[0])
            )
          ) {
            return item;
          }
          if (
            typeof paths === "string" &&
            paths !== String(item[0])
          ) {
            return item;
          }
          return;
        }
      )
    );

    return result;
  }

  // export function memoize() {}

  export function debounce<T>(
    func: (args: T) => void,
    wait: number,
    options?: DebounceThrottleOption
  ):
    | ((
        args: T
      ) => void | boolean | Function)
    | null {
    if (
      typeof func !== "function" ||
      typeof wait !== "number"
    ) {
      return;
    }
  }

  export function throttle<T>(
    func: (args: T) => void,
    wait: number,
    options?: DebounceThrottleOption
  ) {
    if (
      typeof func !== "function" ||
      typeof wait !== "number"
    ) {
      return;
    }
  }
  // 밖의 요소를 클릭하면 인자로 넘겨진 이벤트를 실행한다
  export function clickOutside(
    target: HTMLElement,
    func: (e: HTMLElement) => void
  ): void | null {
    if (!target) {
      return;
    }
    target.parentElement.addEventListener(
      "click",
      () => func(target.parentElement)
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

interface DebounceThrottleOption {
  leading?: boolean;
  maxWait?: number;
  trailing?: boolean;
}

export default _;
