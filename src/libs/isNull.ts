/**
 * value가 null 일 경우, true를 반환한다.
 *
 * value가 null이 아닐 경우, false를 반환한다.
 *
 * @param {*} value
 *
 * @returns {boolean}
 */

export function isNull<T>(value: T | unknown): value is null {
  return value === null;
}
