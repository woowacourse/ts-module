/**
 * value의 타입이 number 일 경우, true를 반환한다.
 *
 * 그 외의 경우, false를 반환한다.
 *
 * @param {*} value
 *
 * @returns {boolean}
 */
export default function isNumber<T>(value: T | unknown): value is Number {
  return typeof value === 'number';
}
