import { TQueryType } from "./types/index";

class TQuery implements TQueryType {
  els: NodeListOf<HTMLElement> | null = null;
  get length() {
    return 0;
  }

  constructor(selector: string) {
    const elements = document.querySelectorAll<HTMLElement>(selector);
    if (!elements) return;
    this.els = elements;
  }

  loop = (callback: (el: HTMLElement) => void) => () => {};

  [Symbol.iterator]() {
    return {
      next: () => {
        return { value: new HTMLElement(), done: true };
      },
    };
  }

  show() {
    return "show";
  }

  hidden() {
    return "hidden";
  }

  addEvent<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ) {
    return "addEvent";
  }

  get(index: number) {
    if (!this.els) return null;
    return this.els[index];
  }
}

export default TQuery;
