export const allTypes = {
  null: null,
  undefined: undefined,
  Object: new Object(),
  number: Number(),
  Number: new Number(),
  string: String(),
  String: new String(),
  boolean: Boolean(),
  Boolean: new Boolean(),
  Array: new Array(),
  Error: new Error(),
  Function: function () {},
  Date: new Date(),
  symbol: Symbol(),
  bigInt: BigInt(Number()),
  Map: new Map(),
};
