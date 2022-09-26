declare module _ {
  function isNumber(value: unknown): boolean;
  function isNull(value: unknown): boolean;
  function isNil(value: unknown): boolean;
  function shuffle<T>(arr: T[]): T[];
}

export default _;
