export function isIterable<T = unknown>(
  a: Iter<T> | unknown
): a is Iterable<T> {
  return typeof (a as any)?.[Symbol.iterator] === 'function';
}
