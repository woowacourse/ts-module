export const HTTP_METHOD = {
  POST: "POST",
  GET: "GET",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
} as const;

export const defaultFetchOptions = {
  method: HTTP_METHOD.GET,
  headers: {},
  body: "",
  credentials: "",
};
