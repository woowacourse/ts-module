type Options = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: unknown;
  body?: unknown;
};

declare namespace _ {
  function fetch(url: string, options?: Options): Promise<unknown>;
  function isNumber(value: unknown): boolean;
  function isFunction(value: unknown): boolean;
  function isNull(value: unknown): boolean;
  function isNil(value: unknown): boolean;
  function shuffle<T>(arr: T[]): T[];
  function pick<T, P extends keyof T>(obj: T, target: P | P[]): Pick<T, P>;
  function omit<T, P extends keyof T>(obj: T, target: P | P[]): Omit<T, P>;
  function memoize(func: Function): Function;
  function debounce(func: Function, delay: number): Function;
  function throttle(func: Function, delay: number): Function;
  function clickOutside(
    element: HTMLElement,
    func: Function
  ): (event: MouseEvent) => void;
  function customElement<T extends keyof HTMLElementEventMap>(
    selector: string
  ): {
    get(): HTMLElement | null;
    innerHTML(value: string): void;
    show(): void;
    hidden(): void;
    addEvent(
      event: T,
      eventHandler: (event: HTMLElementEventMap[T]) => void
    ): void;
  };
}

export default _;
