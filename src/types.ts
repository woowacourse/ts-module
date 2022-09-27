export interface FetchOptions {
  method?: "POST" | "GET" | "PUT" | "PATCH" | "DELETE";
  body?: string;
  credentials?: string;
}

export interface FetchResponse<T> {
  status: number;
  statusText: string;
  ok: boolean;
  headers: Headers;
  url: string;
  data: T;
}
