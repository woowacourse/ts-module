/**
 * null인지 여부를 반환합니다.
 *
 * @param input 검증 대상 값
 * @returns input이 null인지 여부
 */
export declare function isNull<T>(input: T): T extends null ? true : false;
/**
 *  null 혹은 undefined인지 여부를 반환합니다.
 *
 * @param input 검증 대상 값
 * @returns input이 null 혹은 undefined인지 여부
 */
export declare function isNil<T>(input: T): T extends null | undefined ? true : false;
/**
 * number인지 여부를 반환합니다.
 *
 * @param input 검증 대상 값
 * @returns input이 number인지 여부
 */
export declare function isNumber<T>(input: T): T extends number ? true : false;
/**
 * function인지 여부를 반환합니다.
 *
 * @param input 검증 대상 값
 * @returns input이 function인지 여부
 */
export declare function isFunction<T>(input: T): T extends Function ? true : false;
