import _ from '..';

/**
 * memoize
 *
 * @param {Function} callback
 *
 * @returns {*}
 */
export default function memoize<T extends (...args: any[]) => unknown>(
  callback: T
) {
  const cache: { data: unknown | null; args: any[] } = {
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
