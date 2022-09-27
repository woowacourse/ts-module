// node v18 부터 native fetch를 지원합니다
const fetch = (input: RequestInfo | URL, init?: RequestInit) => {
  return globalThis.fetch(input, init);
};

export default fetch;
