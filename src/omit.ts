const omit = <Obj extends Record<string, unknown>, Key extends keyof Obj>(
  obj: Obj,
  keys: Array<Key>
): Omit<Obj, Key> => {};

export default omit;
