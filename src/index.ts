function _(selector: string) {
  const element = document.createElement(selector);

  if (element === undefined) {
    throw Error("Element를 생성하는데 실패하였습니다.");
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
    innerHtml,
    show,
    hide,
    addEvent,
  };
}
