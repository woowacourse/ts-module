function _(selector: string) {
  const element = document.createElement(selector);

  if (element === undefined) {
    throw Error("Element를 생성하는데 실패하였습니다.");
  }

  function getElement(): HTMLElement {
    return element;
  }

  function innerHtml(content?: string): string {
    if (content) {
      element.innerHTML = content;
    }

    return element.innerHTML;
  }

  function show() {
    element.style.display = "block";
  }

  function hide() {
    element.style.display = "none";
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
  export function fetch(url: string, options?: Options): Promise<unknown> {
    return new Promise((resolve, reject) => {
      resolve("server api response data");
    });
  }

  export function isNull<T>(value: T): T extends null ? true : false;
  export function isNull(value: unknown): value is null {
    return value === null;
  }
}

export default _;
