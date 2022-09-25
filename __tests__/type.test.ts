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

expectType<{ a: 1 }>(_.pick({ a: 1, b: "c" }, ["a"]));

expectType<{ b: "c" }>(_.omit({ a: 1, b: "c" }, ["a"]));
