import _ from '../_';

/**
 * memoize
 *
 * @param {Function} callback
 *
 * @returns {*}
 */
export default function memoize<T extends (...args: unknown[]) => unknown>(
  callback: T
) {
  const cache: { data: unknown | null; args: unknown[] } = {
    data: null,
    args: [],
  };

  return (...args: Parameters<T>) => {
    if (
      !_.isNull(cache.data) &&
      args.length === cache.args.length &&
      args.every((arg, index) => arg === cache.args[index])
    ) {
      return cache.data;
    }

    const result = callback(...args);
    cache.data = result;
    cache.args = args;
    return result;
  };
}
