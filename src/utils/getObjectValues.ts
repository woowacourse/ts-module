export default function getObjectValues<T extends Record<string, T[keyof T]>>(
  object: T
) {
  return Object.values(object);
}
