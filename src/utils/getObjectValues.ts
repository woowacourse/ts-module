export default function getObjectValues<T extends Record<string, any>>(
  object: T
) {
  return Object.values(object);
}
