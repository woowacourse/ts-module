/// <reference path="global.ts"> />

export interface CustomElement {
  element: HTMLElement;
  innerHTML: (content: string) => void;
  show: () => void;
  hidden: () => void;
  addEvent: <T extends keyof HTMLElementEventMap>(
    type: T,
    listener: (this: HTMLElement, event: HTMLElementEventMap[T]) => any,
    options?: boolean | AddEventListenerOptions,
  ) => void;
}

export type MemoizedFunction<T extends CustomFunction> = (
  key: string,
  ...args: unknown[]
) => ReturnType<T>;
