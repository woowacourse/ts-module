type Nil = null | undefined;
const isNil = (val: unknown): val is Nil => val === null || val === undefined;

export default isNil;
