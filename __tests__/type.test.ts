/**
 * @jest-environment jsdom
 */
import { expectType } from "tsd";
import _ from "../src";

(_(".button") as HTMLElement).addEvent("click", function (event) {
  expectType<MouseEvent>(event);
});
expectType<void>((_(".divElement") as HTMLElement).showElement());
expectType<void>((_(".divElement") as HTMLElement).hideElement());
expectType<void>((_(".divElement") as HTMLElement).setInnerHTML());
expectType<void>(
  (_(".divElement") as HTMLElement).setInnerHTML(
    "안녕하세요. 문장 넣기 테스트입니다."
  )
);

expectType<Promise<Response>>(_.fetch("https://github.com/jswith"));

expectType<true>(_.isNull(null));
expectType<false>(_.isNull(3));

expectType<true>(_.isNil(null));
expectType<true>(_.isNil(undefined));
expectType<false>(_.isNil(NaN));

expectType<true>(_.isNumber(2));
expectType<true>(_.isNumber(NaN));
expectType<false>(_.isNumber("3"));

expectType<true>(_.isFunction((a: number, b: number) => a + b));
expectType<false>(_.isFunction({ a: 1, b: 2 }));

expectType<Array<string | number>>(_.shuffle([1, "a", 3, 4]));
expectType<Array<string | number | true>>(_.shuffle(["a", "b", 3, true]));

expectType<Record<string | number, unknown>>(
  _.pick({ a: 1, b: 2, c: "g" }, ["a"])
);
expectType<Record<string | number, unknown>>(
  _.pick({ a: 1, b: 2, c: "3", d: "f" }, ["a", "c"])
);

expectType<Record<string | number, unknown>>(
  _.omit({ a: 1, b: 2, c: "g" }, ["a"])
);
expectType<Record<string | number, unknown>>(
  _.omit({ a: 1, b: 2, c: "3", d: "f" }, ["a", "c"])
);

expectType<unknown>(_.memoize((a: number, b: number) => a + b));

expectType<Function>(_.debounce((a: number, b: number) => a + b, 400));

expectType<Function>(_.throttle((a: number, b: number) => a + b, 300));

expectType<void>(_.clickOutside(_(".button") as HTMLElement));
