interface ALL_TYPE {
  null: null;
  undefined: undefined;
  Object: Object;
  number: number;
  Number: Number;
  string: string;
  String: String;
  boolean: boolean;
  Boolean: Boolean;
  Array: Array<any>;
  Error: Error;
  Function: Function;
  Date: Date;
  symbol: Symbol;
  bigInt: BigInt;
  Map: Map<any, any>;
}

const ALL_TYPES: ALL_TYPE & Record<string, unknown> = {
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

export const omitTypesValues = (keys: string[]) => {
  return Object.keys(ALL_TYPES)
    .filter((type) => !keys.includes(type))
    .map((value) => ALL_TYPES[value]);
};

export const getAllTypesValues = () => {
  return Object.values(ALL_TYPES);
};
