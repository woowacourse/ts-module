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

expectType<true>(_.isNull(null));
expectType<false>(_.isNull("2"));

expectType<true>(_.isNil(undefined));
expectType<true>(_.isNil(null));
expectType<false>(_.isNil("2"));

expectType<true>(_.isNumber(1));
expectType<false>(_.isNumber("2"));

expectType<true>(_.isFunction(() => {}));
expectType<false>(_.isFunction("2"));

expectType<(1 | 2 | 3 | 4)[]>(_.shuffle([4, 2, 3, 1]));

expectType<{ x: number; y: number }>(_.pick({ x: 1, y: 2, z: 3 }, ["x", "y"]));
expectType<{ x: number; y: number }>(
  //@ts-expect-error
  _.pick({ x: 1, y: 2, z: 3 }, ["t", "y"])
);

expectType<{ z: number }>(_.omit({ x: 1, y: 2, z: 3 }, ["x", "y"]));
expectType<{ x: number; y: number }>(
  //@ts-expect-error
  _.omit({ x: 1, y: 2, z: 3 }, ["t", "y"])
);

expectType<(a: number, b: number) => number>(
  _.memoize((a: number, b: number) => {
    return a + b;
  })
);

expectType<(a: number, b: number) => void>(
  _.debounce(
    (a: number, b: number) => {
      console.log(a, b);
    },
    300,
    { leading: true }
  )
);
