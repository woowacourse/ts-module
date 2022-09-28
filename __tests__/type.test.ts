import { expectType } from "tsd";
import _ from "../src";

_(".button").addEvent("click", function (event) {
  expectType<MouseEvent>(event);
});

expectType<boolean>(_.isNull(null));
expectType<boolean>(_.isNull("ahn"));

expectType<boolean>(_.isNil(null));
expectType<boolean>(_.isNil(undefined));
expectType<boolean>(_.isNil("ahn"));

expectType<boolean>(_.isNumber(123));
expectType<boolean>(_.isNumber("ahn"));

expectType<boolean>(_.isFunction(() => {}));
expectType<boolean>(_.isFunction("ahn"));

expectType<(1 | 2 | 3 | 4)[]>(_.shuffle([1, 2, 3, 4]));

expectType<{ a: number }>(_.pick({ a: 1, b: "c" }, ["a"]));

expectType<{ b: string }>(_.omit({ a: 1, b: "c" }, ["a"]));

expectType<(a: number, b: number) => void>(
  _.debounce((a: number, b: number) => {
    console.log(a, b);
  }, 100)
);

expectType<(a: number, b: number) => void>(
  _.throttle((a: number, b: number) => {
    console.log(a, b);
  }, 100)
);
