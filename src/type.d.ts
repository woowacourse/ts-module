interface SelectedElement extends HTMLElement {
  _innerHTML: () => string;
  show: () => void;
  _hidden: () => void;
  addEvent: <T extends keyof HTMLElementEventMap>(
    event: T,
    eventHandler: (event: HTMLElementEventMap[T]) => void
  ) => void;
}

interface DebounceOptions {
  leading: boolean;
  trailing: boolean;
  maxWait: number;
}

interface ThrottleOptions extends DebounceOptions {}
