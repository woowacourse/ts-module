export interface NewElement extends HTMLElement {
  innerHTML: string;
  show(): void;
  hide(): void;
  addEvent<C extends keyof HTMLElementEventMap>(
    cmd: C,
    callback: (event: HTMLElementEventMap[C]) => void
  ): void;
}

export type Function = (...args: unknown[]) => unknown;

export interface MapCache {
  delete(key: string): boolean;
  get(key: string): unknown;
  has(key: string): boolean;
  set(key: string, value: unknown): { [index: string]: unknown };
}

export interface MemoizedFunction extends Function {
  cache: MapCache;
}

export interface Memoize {
  <T extends Function>(func: T, resolver?: Function): T & MemoizedFunction;
  Cache: MapCache;
}
