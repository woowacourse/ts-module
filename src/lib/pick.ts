function pick<T extends Object, K extends keyof T>(object: T, ...keys: K[]): Pick<T, K> {
  return keys.reduce((previous, key) => {
    previous[key] = object[key];

    return previous;
  }, {} as Pick<T, K>);
}

export default pick;
