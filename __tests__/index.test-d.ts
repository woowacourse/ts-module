import { expectType } from "tsd-lite";
import _ from "../lib/index";
import {
	DebouncedFunc,
	DebounceOptions,
	FetchOptions,
	RealFunction,
} from "../src/utils";

test("addEvent 함수의 반환 타입을 확인한다", () => {
	_(".button").addEvent("click", function (event) {
		expectType<MouseEvent>(event);
	});
});

test("isNull 함수의 반환 타입을 확인한다", () => {
	expectType<boolean>(_.isNull(null));
});

test("isNull 함수의 호출 시그니처를 확인한다", () => {
	expectType<(value: any) => value is null>(_.isNull);
});

test("isNil 함수의 반환 타입을 확인한다", () => {
	expectType<boolean>(_.isNil(null));
});

test("isNumber 함수의 반환 타입을 확인한다", () => {
	expectType<boolean>(_.isNumber(null));
	expectType<boolean>(_.isNumber(1));
});

test("isFunction 함수의 반환 타입을 확인한다", () => {
	expectType<boolean>(_.isFunction(() => {}));
});

test("shuffle 함수의 반환 타입을 확인한다", () => {
	expectType<Array<number | string>>(_.shuffle([1, "a", 3]));
});

test("Pick 함수의 반환 타입을 확인한다", () => {
	expectType<Pick<{ a: number; b: number; c: number }, "a" | "c"> | {}>(
		_.pick({ a: 1, b: 2, c: 3 }, ["a", "c"])
	);
});

test("pick 함수의 호출 시그니처를 확인한다", () => {
	type pick = <T extends object, U extends keyof T>(
		object: T,
		targetList: Array<U>
	) => Pick<T, U> | {};
	expectType<pick>(_.pick);
});

test("omit 함수의 반환 타입을 확인한다", () => {
	expectType<Omit<{ a: number; b: number; c: number }, "a" | "c"> | {}>(
		_.omit({ a: 1, b: 2, c: 3 }, ["a", "c"])
	);
});

test("omit 함수의 호출 시그니처를 확인한다", () => {
	type omit = <T extends object, K extends keyof T>(
		object: T,
		targetList: Array<K>
	) => Omit<T, K> | {};
	expectType<omit>(_.omit);
});

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

test("clickOutside 함수의 호출 시그니처를 확인한다", () => {
	type clickOutside = (
		eventTarget: HTMLElement,
		innerElement: HTMLElement
	) => boolean;

	expectType<clickOutside>(_.clickOutside);
});

test("memoize 함수의 호출 시그니처를 확인한다", () => {
	type memoize = (
		func: RealFunction,
		resolver?: RealFunction
	) => RealFunction;

	expectType<memoize>(_.memoize);
});

test("fetch 함수의 호출 시그니처를 확인한다", () => {
	type fetch = (url: string, options?: FetchOptions) => Promise<Response>;

	expectType<fetch>(_.fetch);
});
