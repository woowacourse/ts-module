declare namespace _ {
  function isNumber(value: unknown): boolean;
  function isNull(value: unknown): boolean;
  function isNil(value: unknown): boolean;
  function shuffle<T>(arr: T[]): T[];
  function pick<T, P extends keyof T>(obj: T, target: P | P[]): Pick<T, P>;
  function omit<T, P extends keyof T>(obj: T, target: P | P[]): Omit<T, P>;
  function memoize(func: Function): Function;
  function debounce(funct: Function, delay: number): Function;
}

export default _;
