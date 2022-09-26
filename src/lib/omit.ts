function omit<T extends Object, K extends keyof T>(object: T, ...keys: K[]): Omit<T, K> {
  const duplicatedObject = { ...object };

  keys.forEach((key) => delete duplicatedObject[key]);
  return duplicatedObject;
}

export default omit;
