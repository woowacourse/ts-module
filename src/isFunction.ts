const isFunction = (val: unknown): val is Function => typeof val === "function";

export default isFunction;
