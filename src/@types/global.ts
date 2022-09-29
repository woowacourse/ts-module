declare global {
  type ObjectKeyType<T extends Object> = keyof T;

  type CustomObject<T> = Record<string, T>;
  type CustomFunction = (...args: any) => any;
}

export {};
