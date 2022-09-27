import { expectType } from "tsd";
import _ from "../src";

// _(".button").addEvent("click", function (event) {
//   expectType<MouseEvent>(event);
// });

// expectType<boolean>(_.isNull(null));
// expectType<boolean>(_.isNull("ahn"));

// expectType<boolean>(_.isNil(null));
// expectType<boolean>(_.isNil(undefined));
// expectType<boolean>(_.isNil("ahn"));

// expectType<boolean>(_.isNumber(123));
// expectType<boolean>(_.isNumber("ahn"));

// expectType<boolean>(_.isFunction(() => {}));
// expectType<boolean>(_.isFunction("ahn"));

// expectType<(1 | 2 | 3 | 4)[]>(_.shuffle([1, 2, 3, 4]));

test("isNill 함수에 대한 타입을 체크한다.", () => {
  expectType<(value: any) => boolean>(_.isNil);
});

test("isFunction 함수에 대한 타입을 체크한다.", () => {
  expectType<(value: any) => boolean>(_.isFunction);
});

test("shuffle 함수에 대한 타입을 체크한다.", () => {
  expectType<(array: number[]) => number[]>(_.shuffle<number>);
});
