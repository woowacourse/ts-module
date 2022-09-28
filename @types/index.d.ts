declare function _(selector: string): any;
declare module _ {
    export function fetch(path: RequestInfo | URL, config?: RequestInit): Promise<Response>;
    type Nullable<Type> = Type extends null ? Type : never;
    export function isNull<Type>(args: Type): args is Nullable<Type>;
    type Nilable<Type> = Type extends null | undefined ? Type : never;
    export function isNil<Type>(args: Type): args is Nilable<Type>;
    export function isNumber(args: unknown): args is number;
    export function isFunction(args: unknown): args is Function;
    export function shuffle<T>(args: T[]): T[];
    export function pick(arr: Array<string>, obj: Record<string, any>): Array<Pick<typeof obj, typeof arr[number]>>;
    export function omit(arr: Array<string>, obj: Record<string, any>): Array<Omit<typeof obj, typeof arr[number]>>;
    export function memoize<T>(func: (args: any[]) => T[], timer?: number): Function;
    export const debounce: DebounceType;
    interface DebounceActionArgsType<P, R> {
        func: (args?: P) => R;
        args?: P;
    }
    interface DebounceType {
        flag: number | ReturnType<typeof setTimeout>;
        action: <P, R>({ func, args }: DebounceActionArgsType<P, R>) => void;
    }
    export function throttle(func: Function, time: number): void;
    export function clickOutside(): void;
    export {};
}
export default _;
