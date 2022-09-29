export default class Dom {
  #element: HTMLElement | null = null;

  constructor(selector: string) {
    this.#element = document.querySelector(selector);
  }

  get() {
    if (!this.#element) {
      throw new Error('innerHTML 에러: element가 null 입니다.');
    }

    return this.#element;
  }

  innerHTML() {
    if (!this.#element) {
      throw new Error('innerHTML 에러: element가 null 입니다.');
    }
    return this.#element.innerHTML;
  }

  show() {
    if (!this.#element) {
      throw new Error('innerHTML 에러: element가 null 입니다.');
    }
    this.#element.style.visibility = 'visible';
  }

  hidden() {
    if (!this.#element) {
      throw new Error('innerHTML 에러: element가 null 입니다.');
    }
    this.#element.style.visibility = 'hidden';
  }

  addEvent(
    event: keyof HTMLElementEventMap,
    listener: (this: Element, ev: Event) => any,
    options?: boolean | AddEventListenerOptions | undefined
  ) {
    if (!this.#element) {
      throw new Error('addEvent 에러: element가 null 입니다.');
    }
    this.#element.addEventListener(event, listener, options);
  }
}
