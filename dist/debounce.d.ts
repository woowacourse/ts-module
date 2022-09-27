/**
 * 실행하기 전 정해진 시간을 대기하는 디바운스가 적용된 함수를 반환합니다.
 * 지연 시간을 전달하지 않으면 지연되지 않고 바로 함수가 실행됩니다.
 *
 * @param func 디바운스를 적용할 함수
 * @param wait 함수 실행 지연시간
 * @returns 디바운스가 적용된 함수
 */
export declare const debounce: <T extends unknown[], U>(func: (...args: T) => U, wait?: number) => (...args: T) => U;
export default debounce;
