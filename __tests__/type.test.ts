/**
 * @jest-environment jsdom
 */
import { expectType } from "tsd";

import _ from "../dist";
import { Response } from "../dist";

const button = document.createElement("button");
button.className = "button";
document.body.appendChild(button);

_(".button").addEvent("click", function (event) {
  expectType<MouseEvent>(event);
});

expectType<void>(_(".button").show());

expectType<void>(_(".button").hide());

expectType<void>(_(".button").html(`<div class='test-div'>test</div>`));

type TestData = {
  id: 1;
  name: "iAmTest";
};

expectType<Promise<Response<TestData[]>>>(_.fetch("test.com"));

expectType<boolean>(_.isNull(null));

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

const div = document.createElement("div");
expectType<void>(
  _.clickOutside(div, () => {
    console.log("click outside");
  })
);
