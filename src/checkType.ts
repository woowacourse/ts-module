/**
 * null인지 여부를 반환합니다.
 *
 * @param input 검증 대상 값
 * @returns input이 null인지 여부
 */
export function isNull<T>(input: T): T extends null ? true : false;
export function isNull(input: unknown): input is null {
  return input === null;
}

/**
 *  null 혹은 undefined인지 여부를 반환합니다.
 *
 * @param input 검증 대상 값
 * @returns input이 null 혹은 undefined인지 여부
 */
export function isNil<T>(input: T): T extends null | undefined ? true : false;
export function isNil(input: unknown): input is null | undefined {
  return input === null || input === undefined;
}

/**
 * number인지 여부를 반환합니다.
 *
 * @param input 검증 대상 값
 * @returns input이 number인지 여부
 */
export function isNumber<T>(input: T): T extends number ? true : false;
export function isNumber(input: unknown): input is Number {
  return typeof input === "number";
}

/**
 * function인지 여부를 반환합니다.
 *
 * @param input 검증 대상 값
 * @returns input이 function인지 여부
 */
export function isFunction<T>(input: T): T extends Function ? true : false;
export function isFunction(input: unknown): input is Function {
  return typeof input === "function";
}
