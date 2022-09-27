/**
 * XMLHttpRequest를 활용해 비동기적으로 서버와 통신합니다.
 *
 * @param url 요청을 받을 서버의 주소
 * @param method 요청 매서드
 * @param payload 요청 body에 추가할 정보
 * @returns 서버로부터 받은 응답
 */

type Method =
  | "GET"
  | "POST"
  | "PATCH"
  | "PUT"
  | "DELETE"
  | "TRACE"
  | "CONNECT"
  | "OPTIONS";

export default function fetch(
  url: string,
  method: Method,
  payload?: unknown
): Promise<any> {
  const request = new XMLHttpRequest();
  request.open(method, url);
  request.responseType = "json";
  const requestBody = JSON.stringify(payload);

  let resolve: unknown, reject: unknown;

  request.onload = function (this: XMLHttpRequest) {
    if (typeof resolve !== "function") throw new Error("잘못 설정된  resolver");
    return resolve(this.response);
  };

  request.onerror = function (this: XMLHttpRequest) {
    if (typeof reject !== "function") throw new Error("잘못 설정된  rejecter");
    return reject(this.response);
  };

  request.send(requestBody);

  return new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
}
