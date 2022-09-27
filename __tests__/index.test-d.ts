/**
 * @jest-environment jsdom
 */
import { expectType } from "tsd";

import tt from "../src/index";

expectType<void>(tt(".button").innerHTML("hihi"));
expectType<void>(tt(".button").show());
expectType<void>(tt(".button").hidden());
tt(".button").addEvent("click", function (event) {
  expectType<MouseEvent>(event);
});

expectType<Promise<Response>>(tt.fetch("https://naver.com"));

expectType<boolean>(tt.isNull("hi"));
expectType<boolean>(tt.isNull(null));

expectType<boolean>(tt.isNil("hi"));
expectType<boolean>(tt.isNil(null));

expectType<boolean>(tt.isNumber("hi"));
expectType<boolean>(tt.isNumber(89));

expectType<boolean>(tt.isFunction(null));
expectType<boolean>(tt.isFunction(() => {}));

expectType<Array<string>>(tt.shuffle(["a", "b"]));

const obj = { a: "hi", b: "sdf" };
expectType<Pick<typeof obj, "a">>(tt.pick(obj, ["a"]));
expectType<Omit<typeof obj, "a">>(tt.omit(obj, ["a"]));

expectType<() => number>(tt.memoize(() => 1));

const func = (hi: string): string => hi;
expectType<typeof func>(tt.debounce(func, 100));
expectType<typeof func>(tt.throttle(func, 100));

const divElement = tt("div");
divElement.element &&
  tt.clickOutside(divElement.element, (event) => {
    expectType<MouseEvent>(event);
  });
