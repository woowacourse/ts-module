const isFunction = (val: unknown): val is Function => {
  if (typeof val === "function") {
    return true;
  }
  return false;
};

export default isFunction;
