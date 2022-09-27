const pick = <
  Obj extends Record<string | number | symbol, unknown>,
  Key extends keyof Obj
>(
  obj: Obj,
  keys: Array<Key>
): Pick<Obj, Key> => {
  const result = keys.reduce<Pick<Obj, Key>>((acc, key) => {
    if (!obj[key]) throw new Error("객체의 key 배열이 아닙니다.");
    acc[key] = obj[key];
    return acc;
  }, {} as Pick<Obj, Key>);
  return result;
};

export default pick;
