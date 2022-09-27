/**
 * 일정 시간 동안 함수를 한 번만 실행하는 쓰로틀이 적용된 함수를 반환합니다.
 * 주기를 전달하지 않으면 함수가 호출 될 때마다 실행됩니다.
 *
 * @param func 쓰로틀을 적용할 함수
 * @param wait 함수를 1회 실행할 주기
 * @returns 쓰로틀이 적용된 함수
 */
export declare const throttle: <T extends unknown[], U>(func: (...args: T) => U, wait?: number) => (...args: T) => U | undefined;
export default throttle;
