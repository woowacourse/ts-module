export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type Options = {
  method?: Method;
  headers?: {
    "Content-Type": "application/json";
  };
  body?: any;
};
