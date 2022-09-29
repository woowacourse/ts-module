declare function pick<T extends Object, K extends keyof T>(object: T, ...keys: K[]): Pick<T, K>;
export default pick;
