/**
 * 함수의 연산에 메모이제이션을 적용해, 동일한 인자가 주어졌을 때 반복적인 연산을 생략하고 저장된 값을 반환하는 함수를 반환합니다.
 * resolver 함수를 전달하지 않으면 자동으로 첫 번째 인자를 캐시 키로 활용합니다.
 *
 * @param func 메모이제이션을 적용할 함수
 * @param resolver 캐시 키를 생성하는 함수
 * @returns 메모이제이션이 적용된 함수
 */
export default function memoize<T extends unknown[], U>(func: (...args: T) => U, resolver?: (...args: T) => string): (...args: T) => U;
