const isNumber = (val: unknown): val is number => {
  if (typeof val === "number") {
    return true;
  }
  return false;
};

export default isNumber;
