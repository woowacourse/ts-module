declare module _ {
  function isNumber(value: unknown): boolean;
  function isNull(value: unknown): boolean;
  function isNil(value: unknown): boolean;
  function shuffle<T>(arr: T[]): T[];
  function pick<T, P extends keyof T>(obj: T, target: P | P[]): Pick<T, P>;
}

export default _;
