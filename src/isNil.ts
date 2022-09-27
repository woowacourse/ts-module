type Nil = null | undefined;
const isNil = (val: unknown): val is Nil => {};

export default isNil;
