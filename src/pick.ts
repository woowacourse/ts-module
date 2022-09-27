const pick = <
  Obj extends Record<string | number | symbol, unknown>,
  Key extends keyof Obj
>(
  obj: Obj,
  keys: Array<Key>
): Pick<Obj, Key> => {};

export default pick;
