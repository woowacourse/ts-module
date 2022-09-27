/**
 * 배열 혹은 객체의 값의 배열의 순서를 무작위로 섞어 반환합니다.
 *
 * @param collection 섞을 배열 혹은 객체
 * @returns 배열인 경우 섞인 배열, 객체인 경우 객체의 값으로 이루어진 섞인 배열
 */
export declare function shuffle<T>(collection: T[]): T[];
export declare function shuffle<T>(collection: Record<string, T>): T[];
export default shuffle;
