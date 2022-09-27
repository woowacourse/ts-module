/**
 * @jest-environment jsdom
 */
import { expectType } from "tsd";

import _ from "../src";

_(".button").addEvent("click", function (event) {
  expectType<MouseEvent>(event);
});

// fetch
expectType<Promise<Response>>(
  _.fetch("https://winnie.com", { method: "GET" }).then((data) => data.json())
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

// pick (다시)
expectType<{ a: number; c: number }>(
  _.pick({ a: 1, b: "2", c: 3 }, ["a", "c"])
);
expectType<{ a: number; b: string }>(
  _.pick({ a: 1, b: "2", c: 3 }, ["a", "b"])
);
expectType<{}>(_.pick({ a: 1, b: "2", c: 3 })); // {}

// omit
expectType<{ b: string }>(_.omit({ a: 1, b: "2", c: 3 }, ["a", "c"]));
expectType<{ b: string; c: number }>(_.omit({ a: 1, b: "2", c: 3 }, ["a"])); // TODO b, c 하나 빼도 됨

// memoize
// expectType<Function>(
//   _.memoize(() => {
//     return `test`;
//   })
// );

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
