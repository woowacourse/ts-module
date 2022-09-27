type Nil = null | undefined;
/**
 * value가 null, undefined 일 경우, true를 반환한다.
 *
 * 그 외의 경우, false를 반환한다.
 *
 * @param {*} value
 *
 * @returns {boolean}
 */
export function isNil<T>(value: T | unknown): value is Nil {
  return value == null;
}
