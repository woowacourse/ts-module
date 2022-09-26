/**
 * @jest-environment jsdom
 */
import { expectType } from "tsd";

import _ from "../src";

_(".button").addEvent("click", function (event) {
  expectType<MouseEvent>(event);
});

expectType<Promise<Response>>(_.fetch("url"));

expectType<true>(_.isNull(null));
expectType<false>(_.isNull([1, 2, 3, 4, 5]));

expectType<false>(_.isNil([1, 2, 3, 4, 5]));
expectType<false>(_.isNil(1));
expectType<true>(_.isNil(null));
expectType<true>(_.isNil(undefined));

expectType<true>(_.isNumber(1));
expectType<false>(_.isNumber("1"));

expectType<true>(_.isFunction(() => {}));
expectType<false>(_.isFunction("1"));

expectType<number[]>(_.shuffle([1, 2, 3, 4, 5]));
expectType<(string | number)[]>(_.shuffle([1, "2", 3, "4", 5]));

expectType<{ a: number }>(_.pick({ a: 123, b: "a" }, ["a"]));

expectType<{ b: string }>(_.omit({ a: 123, b: "a" }, ["a"]));

expectType<(a: number) => number>(_.memoize((a: number) => a * 2));
expectType<(a: number) => string>(
  _.memoize(
    (a: number) => a.toString(),
    (a: number) => a.toString()
  )
);

expectType<(a: number) => void>(_.debounce((a: number) => a * 2));
expectType<(a: number) => void>(_.debounce((a: number) => a * 2, 2000));
expectType<(a: number) => void>(
  _.debounce((a: number) => a * 2, 2000, { leading: true })
);

expectType<(a: number) => void>(_.throttle((a: number) => a * 2));
expectType<(a: number) => void>(_.throttle((a: number) => a * 2, 2000));
expectType<(a: number) => void>(
  _.throttle((a: number) => a * 2, 2000, { leading: true })
);

expectType<void>(_.clickOutside(_(".button"), (a: number) => a * 2));

expectType<void>(_(".button").setInnerHTML("<h1>setInnerHTML 테스트<h1>"));
expectType<void>(_(".button").setShow());
expectType<void>(_(".button").setHidden());
expectType<void>(_(".button").addEvent("click", (event) => {}));
//@ts-expect-error
expectType<void>(_(".button").addEvent("test", (event) => {}));
