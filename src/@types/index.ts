export interface CustomNode {
  get: () => Element;
  innerHTML: (value: string) => string;
  show: () => void;
  hidden: () => void;
  addEvent<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any
  ): void;
}

export type HTTPMethod = "GET" | "POST" | "DELETE" | "PATCH" | "PUT";

export type FetchOptions = {
  method?: HTTPMethod;
  headers?: Record<string, unknown>;
  body?: string;
  credentials?: string;
};

export type FetchResponse<T> = {
  status: number;
  statusText: string;
  ok: boolean;
  headers: Record<string, unknown>;
  url: string;
  data: T;
};
