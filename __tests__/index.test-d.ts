import { expectType } from "tsd";
import _ from "../dist/index";

_(".button").addEvent("click", function (event) {
	expectType<MouseEvent>(event);
});

expectType<boolean>(_.isNull(null));
expectType<boolean>(_.isNil(null));
expectType<boolean>(_.isNumber(1));
expectType<boolean>(_.isFunction(() => {}));
expectType<Array<number | string>>(_.shuffle([1, "a", 3]));
expectType<Pick<{ a: 1; b: 2; c: 3 }, "a" | "c"> | {}>(
	_.pick({ a: 1, b: 2, c: 3 }, ["a", "c"])
);

expectType<(value: any) => value is null>(_.isNull);
type pick = <T extends object, U extends keyof T>(
	object: T,
	targetList: Array<U>
) => Pick<T, U> | {};
expectType<pick>(_.pick);
// 모든 타입 테스트
// omit, memoize, debounce, throttle,  debounce, clickOutside...
