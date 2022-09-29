/**
 * value가 function 일 경우, true를 반환한다.
 *
 * 그 외의 경우, false를 반환한다.
 *
 * @param {*} value
 *
 * @returns {boolean}
 */
export default function isFunction<T>(value: T | unknown): value is Function {
  return typeof value === 'function';
}
