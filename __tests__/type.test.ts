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

expectType<Promise<string>>(_.fetch("https://github.com/jswith"));

expectType<boolean>(_.isNull(null));
expectType<boolean>(_.isNull(3));

expectType<boolean>(_.isNil(null));
expectType<boolean>(_.isNil(undefined));
expectType<boolean>(_.isNil(NaN));

expectType<boolean>(_.isNumber(2));
expectType<boolean>(_.isNumber(NaN));
expectType<boolean>(_.isNumber("3"));

expectType<boolean>(_.isFunction((a: number, b: number) => a + b));
expectType<boolean>(_.isFunction({ a: 1, b: 2 }));

expectType<Array<string | number>>(_.shuffle([1, "a", 3, 4]));
expectType<Array<string | number | true>>(_.shuffle(["a", "b", 3, true]));

expectType<Record<string | number, unknown>>(
  _.pick({ a: 1, b: 2, c: "g" }, ["a"])
);
expectType<Record<string | number, unknown>>(
  _.pick({ a: 1, b: 2, c: "3", d: "f" }, ["a", "c"])
);
fetch;

expectType<Record<string | number, unknown>>(
  _.omit({ a: 1, b: 2, c: "g" }, ["a"])
);
expectType<Record<string | number, unknown>>(
  _.omit({ a: 1, b: 2, c: "3", d: "f" }, ["a", "c"])
);

expectType<(...args: any) => number>(
  _.memoize((a: number, b: number) => a + b)
);

expectType<(...args: any) => void>(
  _.debounce((a: number, b: number) => a + b, 400)
);

expectType<(...args: any) => void>(
  _.throttle((a: number, b: number) => a + b, 300)
);

expectType<void>(
  _.clickOutside(_(".button") as HTMLElement, (a: number, b: number) => a + b)
);
