const omit = <Obj extends Record<string, unknown>, Key extends keyof Obj>(
  obj: Obj,
  keys: Array<Key>
): Omit<Obj, Key> => {
  const result = { ...obj };
  keys.forEach((key) => {
    if (!obj[key]) throw new Error("객체의 key 배열이 아닙니다.");
    delete result[key];
  });
  return result;
};

export default omit;
