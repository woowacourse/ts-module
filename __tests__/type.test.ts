/**
 * @jest-environment jsdom
 */
import { expectType, expectNotType } from "tsd";

import _ from "../src";

// fetch
expectType<Promise<Response>>(
  _.fetchData("https://winnie.com", { method: "GET" })
);

// isNull
expectType<true>(_.isNull(null));
expectType<false>(_.isNull("winnie"));

// isNil
expectType<true>(_.isNil(null));
expectType<true>(_.isNil(undefined));
expectType<false>(_.isNil("winnie"));

// isNumber
expectType<true>(_.isNumber(1));
expectType<true>(_.isNumber(Number.MIN_VALUE));
expectType<true>(_.isNumber(Infinity));
expectType<false>(_.isNumber("winnie"));

// isFunction
expectType<true>(_.isFunction(_));
expectType<false>(_.isFunction(/abc/));

// shuffle
expectType<number[]>(_.shuffle([1, 2, 3, 4]));
expectType<string[]>(_.shuffle(["a", "b", "c", "d"]));

// pick
const obj = { a: 1, b: "2", c: 3 };
expectType<Pick<typeof obj, "a" | "b">>(_.pick(obj, ["a", "b"]));
expectNotType<Pick<typeof obj, "b">>(_.pick(obj, ["a", "b"]));

// omit
expectType<{ b: string; c: number }>(_.omit({ a: 1, b: "2", c: 3 }, ["a"])); // TODO b, c 하나 빼도 됨

// memoize
expectType<() => void>(
  _.memoize(() => {
    return `test`;
  })
);

// debounce
expectType<Function>(
  _.debounce(function () {
    console.log("winnie");
  }, 500)
);

// throttle
expectType<Function>(
  _.throttle(function () {
    console.log("winnie");
  }, 500)
);

// clickOutside
const $element = document.createElement("div");

expectType<void>(
  _.clickOutside($element, function () {
    console.log("you click outside");
  })
);
