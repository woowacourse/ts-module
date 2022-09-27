type Nil = null | undefined;
const isNil = (val: unknown): val is Nil => {
  if (val === null || val === undefined) {
    return true;
  }
  return false;
};

export default isNil;
