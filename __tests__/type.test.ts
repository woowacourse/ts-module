/**
 * @jest-environment jsdom
 */
import { expectType } from "tsd";

import _ from "../src";

_(".button").addEvent("click", function (event) {
  expectType<MouseEvent>(event);
});

expectType<Promise<{ name: string }>>(
  _.fetch<{ name: string }>("https://example.com", {
    method: "GET",
  }).then((res) => res.json())
);

expectType<boolean>(_.isNull(null));
expectType<boolean>(_.isNull(0));

expectType<boolean>(_.isNil(undefined));
expectType<boolean>(_.isNil(NaN));

expectType<number[]>(_.shuffle([1, 2, 3, 4]));
expectType<string[]>(_.shuffle(["a", "b", "c"]));
expectType<object>(_.shuffle([]));

expectType<{ a: number }>(_.pick({ a: 1, b: "c" }, ["a"]));

expectType<{ b: string }>(_.omit({ a: 1, b: "c" }, ["a"]));

expectType<(a: number, b: number) => number>(
  _.memoize((a: number, b: number) => {
    return a + b;
  })
);

expectType<(a: number, b: number) => void>(
  _.debounce((a: number, b: number) => {
    console.log(a, b);
  }, 500)
);

expectType<(a: number, b: number) => void>(
  _.throttle((a: number, b: number) => {
    console.log(a, b);
  }, 500)
);
