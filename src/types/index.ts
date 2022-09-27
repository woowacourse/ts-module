type EventListenerType<K extends keyof HTMLElementEventMap> = (
  this: HTMLElement,
  ev: HTMLElementEventMap[K]
) => any;

export type TQueryType = {
  els: NodeListOf<HTMLElement> | null;
  readonly length: number;
  loop: (callback: (el: HTMLElement) => void) => void;
  show: () => void;
  hidden: () => void;
  addEvent: <K extends keyof HTMLElementEventMap>(
    type: K,
    listener: EventListenerType<K>,
    options?: boolean | AddEventListenerOptions
  ) => void;
};
