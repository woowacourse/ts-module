/**
 * XMLHttpRequest를 활용해 비동기적으로 서버와 통신합니다.
 *
 * @param url 요청을 받을 서버의 주소
 * @param method 요청 매서드
 * @param payload 요청 body에 추가할 정보
 * @returns 서버로부터 받은 응답
 */
declare type Method = "GET" | "POST" | "PATCH" | "PUT" | "DELETE" | "TRACE" | "CONNECT" | "OPTIONS";
export default function fetch(url: string, method: Method, payload?: unknown): Promise<any>;
export {};
