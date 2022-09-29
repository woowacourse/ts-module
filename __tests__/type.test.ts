/**
 * @jest-environment jsdom
 */
import { expectType } from "tsd";

import _ from "../src";

_(".button").addEvent("click", function (event) {
  expectType<MouseEvent>(event);
});

expectType<Promise<Response>>(_.fetch("https://test.com"));
expectType<Promise<Response>>(
  _.fetch("https://test.com", {
    method: "GET",
  })
);

expectType<boolean>(_.isNull(null));
expectType<boolean>(_.isNull(0));

expectType<boolean>(_.isNil(undefined));
expectType<boolean>(_.isNil(NaN));

const numberArray = [1, 2, 3, 4];
const stringArray = ["a", "b", "c"];
const complexArray = ["a", 1, "b", 2, "c", 3];

expectType<typeof numberArray>(_.shuffle<number>(numberArray));
expectType<typeof stringArray>(_.shuffle<string>(stringArray));
expectType<typeof complexArray>(_.shuffle(complexArray));

expectType<{ a: number }>(_.pick({ a: 1, b: "c" }, ["a"]));

expectType<{ b: string }>(_.omit({ a: 1, b: "c" }, ["a"]));

expectType<(a: number, b: number) => number>(
  _.memoize((a: number, b: number) => {
    return a + b;
  })
);

expectType<(a: number, b: number) => number>(
  _.memoize(
    (a: number, b: number) => {
      return a + b;
    },
    (a: number) => a.toString()
  )
);

expectType<(str1: string, str2: string) => number>(
  _.memoize((str1: string, str2: string) => str1.length + str2.length)
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

const div = document.createElement("div");
expectType<void>(
  _.clickOutside(div, () => {
    console.log("click outside");
  })
);
