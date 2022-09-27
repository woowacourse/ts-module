/**
 * object의 프로퍼티의 key와 keys의 인자 key가 일치하는 프로퍼티만 포함하는 새로운 객체를 반환한다.
 *
 * @param {Object} object
 *
 * @param {string[]} keys
 *
 * @returns {Object}
 */
export default function pick<
  T extends Record<string, unknown>,
  K extends keyof T
>(object: T, keys: K[]) {
  if (
    typeof object !== 'object' ||
    Object.prototype.toString.call(object) !== '[object Object]'
  ) {
    throw new Error('pick(object, keys) - object의 타입이 Object가 아닙니다.');
  }
  if (!Array.isArray(keys)) {
    throw new Error('pick(object, keys) - keys의 타입이 Array가 아닙니다.');
  }

  const picked = {} as T;

  for (const key of keys) {
    picked[key] = object[key];
  }

  return picked;
}
