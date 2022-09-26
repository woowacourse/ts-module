import { expectType } from "tsd-lite";
import _ from "../dist/index";
import { DebouncedFunc, DebounceOptions, RealFunction } from "../src/utils";

_(".button").addEvent("click", function (event) {
	expectType<MouseEvent>(event);
});

expectType<boolean>(_.isNull(null));
expectType<boolean>(_.isNil(null));
expectType<boolean>(_.isNumber(1));
expectType<boolean>(_.isFunction(() => {}));
expectType<Array<number | string>>(_.shuffle([1, "a", 3]));
expectType<Pick<{ a: number; b: number; c: number }, "a" | "c"> | {}>(
	_.pick({ a: 1, b: 2, c: 3 }, ["a", "c"])
);
expectType<Omit<{ a: number; b: number; c: number }, "a" | "c"> | {}>(
	_.omit({ a: 1, b: 2, c: 3 }, ["a", "c"])
);

expectType<(value: any) => value is null>(_.isNull);

type pick = <T extends object, U extends keyof T>(
	object: T,
	targetList: Array<U>
) => Pick<T, U> | {};
expectType<pick>(_.pick);

type omit = <T extends object, K extends keyof T>(
	object: T,
	targetList: Array<K>
) => Omit<T, K> | {};
expectType<omit>(_.omit);

test("debounce 함수의 반환 타입을 확인한다", () => {
	const testFunc = () => {};
	expectType<DebouncedFunc<typeof testFunc>>(_.debounce(testFunc, 1000));
});

test("debounce 함수의 호출 시그니처를 확인한다", () => {
	type debounce = <T extends RealFunction>(
		func: T,
		wait: number,
		options?: DebounceOptions
	) => DebouncedFunc<T>;
	expectType<debounce>(_.debounce);
});

test("throttle 함수의 반환 타입을 확인한다", () => {
	const testFunc = () => {};

	expectType<DebouncedFunc<typeof testFunc>>(_.throttle(testFunc, 1000));
});

test("throttle 함수의 호출 시그니처를 확인한다", () => {
	type throttle = <T extends RealFunction>(
		func: T,
		wait: number,
		options?: Omit<DebounceOptions, "maxWait">
	) => DebouncedFunc<T>;

	expectType<throttle>(_.throttle);
});
