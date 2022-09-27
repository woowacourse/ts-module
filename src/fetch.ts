const fetch = (input: RequestInfo | URL, init?: RequestInit) => {
  return globalThis.fetch(input, init);
};

export default fetch;
