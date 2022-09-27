import { TQueryType } from "./types/index";

class TQuery implements TQueryType {
  els: NodeListOf<HTMLElement> | null = null;
  get length() {
    if (this.els === null) return 0;
    return this.els.length;
  }

  constructor(selector: string) {
    const elements = document.querySelectorAll<HTMLElement>(selector);
    if (elements === null) return;
    this.els = elements;
  }

  loop = (callback: (el: HTMLElement) => void) => () => {
    if (this.els === null) return;
    this.els.forEach((element: HTMLElement) => {
      callback(element);
    });
  };

  [Symbol.iterator]() {
    const elements = this.els ?? [];
    let count = 0;
    return {
      next: () => {
        if (elements.length === 0) {
          return {
            done: true,
          };
        }
        if (count === 0) {
          count += 1;
          return {
            value: elements[0],
            done: elements.length === count,
          };
        }
        return {
          value: elements[count++],
          done: elements.length === count,
        };
      },
    };
  }

  show() {
    return this.loop((el) => (el.hidden = false));
  }

  hidden() {
    return this.loop((el) => (el.hidden = true));
  }

  addEvent<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ) {
    return this.loop((el) => el.addEventListener(type, listener, options))();
  }

  get(index: number) {
    if (this.els === null) return null;
    return this.els[index];
  }
}

export default TQuery;
