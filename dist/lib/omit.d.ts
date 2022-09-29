declare function omit<T extends Object, K extends keyof T>(object: T, ...keys: K[]): Omit<T, K>;
export default omit;
