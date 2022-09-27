/**
 * object에서 keys의 인자 key만 제외한 새로운 객체를 반환한다.
 *
 * @param {Object} object
 *
 * @param {string[]} keys
 *
 * @returns {Object}
 */

export function omit<T extends Record<string, unknown>, K extends keyof T>(
  object: T,
  keys: K[]
) {
  if (
    typeof object !== 'object' ||
    Object.prototype.toString.call(object) !== '[object Object]'
  ) {
    throw new Error('omit(object, keys) - object의 타입이 Object가 아닙니다.');
  }
  if (!Array.isArray(keys)) {
    throw new Error('omit(object, keys) - keys의 타입이 Array가 아닙니다.');
  }

  const omitted = <T>{};

  const pickedKeys = (Object.keys(object) as K[]).filter(
    (key) => !keys.includes(key)
  );

  for (const key of pickedKeys) {
    omitted[key] = object[key];
  }

  return omitted;
}
