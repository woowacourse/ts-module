import { expectType } from "tsd";
import _ from "../dist/index";

_(".button").addEvent("click", function (event) {
  expectType<MouseEvent>(event);
});

// 함수 자체 타입 테스트
expectType<(value: any) => value is null>(_.isNull);
expectType<(value: any) => value is null | undefined>(_.isNil);
expectType<(value: any) => value is number>(_.isNumber);
expectType<(value: any) => value is (...args: any[]) => any>(_.isFunction);
expectType<(array: number[]) => number[]>(_.shuffle);
expectType<(object: { a: 1; b: 2; c: 3 }, path: ["a", "b"]) => { a: 1; b: 2 }>(
  _.pick
);
expectType<(object: { a: 1; b: 2; c: 3 }, path: ["a", "b"]) => { c: 3 }>(
  _.omit
);

// 결과값에 대한 테스트
expectType<boolean>(_.isNull(null));
expectType<boolean>(_.isNil(null));
expectType<boolean>(_.isNumber(1));
expectType<boolean>(_.isFunction(() => {}));
expectType<Array<number | string>>(_.shuffle([1, "a", 3]));

expectType<() => void>(_.fetch);
