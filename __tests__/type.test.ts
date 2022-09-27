import { expectType } from "tsd";

import _ from "../src";

test("innerHTML 함수 타입을 테스트한다. ", () => {
  expectType<string>(_("button").innerHtml("hello world"));
});

test("show 함수 타입을 테스트한다. ", () => {
  expectType<void>(_("button").show());
});

test("hide 함수 타입을 테스트한다. ", () => {
  expectType<void>(_("button").hide());
});

test("addEvent 함수 타입을 테스트한다. ", () => {
  _("button").addEvent("click", function (event) {
    expectType<MouseEvent>(event);
  });

  _("button").addEvent("blur", function (event) {
    expectType<FocusEvent>(event);
  });
});

test("fetch 함수 타입을 테스트한다. ", () => {
  const options = {
    method: "GET" as Method,
  };

  expectType<Promise<unknown>>(_.fetch("https://ternoko.site", options));
});

test("isNull 함수 타입을 테스트한다. ", () => {
  expectType<true>(_.isNull(null));
  expectType<false>(_.isNull(undefined));
  expectType<false>(_.isNull(1));
});

test("isNil 함수 타입을 테스트한다. ", () => {
  expectType<true>(_.isNil(null));
  expectType<true>(_.isNil(undefined));
  expectType<false>(_.isNil(1));
});

test("isNumber 함수의 타입을 테스트한다. ", () => {
  expectType<false>(_.isNumber(null));
  expectType<false>(_.isNumber(undefined));
  expectType<true>(_.isNumber(1));
});

test("isFunction 함수 타입을 테스트한다. ", () => {
  expectType<false>(_.isFunction(null));
  expectType<false>(_.isFunction(undefined));
  expectType<false>(_.isFunction(1));
  expectType<true>(_.isFunction(() => {}));
});

test("shuffle 함수 타입을 테스트한다. ", () => {
  const array_1 = [1, 2, 3, 4, 5];
  expectType<number[]>(_.shuffle(array_1));

  const array_2 = [1, 2, 3, 4, "5"];
  expectType<(number | string)[]>(_.shuffle(array_2));
});

test("pick 함수 타입을 테스트한다. ", () => {
  const object = { a: 1, b: 2 };

  expectType<Pick<typeof object, "a">>(_.pick(object, ["a"]));
  expectType<Pick<typeof object, "a" | "b">>(_.pick(object, ["a", "b"]));
});

test("omit 함수 타입을 테스트한다. ", () => {
  const object = { a: 1, b: 2 };

  expectType<Omit<typeof object, "a">>(_.omit(object, ["a"]));
  expectType<Omit<typeof object, "a" | "b">>(_.omit(object, ["a", "b"]));
});

test("memoize 함수 타입을 테스트한다. ", () => {
  const callbackFunction = (a: number, b: number) => {};
  const generateKeyFunction = (a: number, b: number) => `${a}${b}`;

  expectType<typeof callbackFunction>(
    _.memoize(callbackFunction, generateKeyFunction)
  );
});
