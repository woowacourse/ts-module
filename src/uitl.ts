type UniversalIterator<T = unknown> = Iterator<T> | AsyncIterator<T>;

type UniversalIterable<T = unknown> = Iterable<T> | AsyncIterable<T>;

type Iter<T> = UniversalIterator<T> | UniversalIterable<T>;

export function isIterable<T = unknown>(
  a: Iter<T> | unknown
): a is Iterable<T> {
  return typeof (a as any)?.[Symbol.iterator] === 'function';
}
