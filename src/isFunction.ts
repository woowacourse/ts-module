export type TFunction = (...args: Array<any>) => void;
const isFunction = (val: unknown): val is TFunction => {
  if (typeof val === "function") {
    return true;
  }
  return false;
};

export default isFunction;
