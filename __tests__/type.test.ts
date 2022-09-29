/**
 * @jest-environment jsdom
 */
import { expectType } from "tsd";

import _ from "../dist";

const button = document.createElement("button");
button.className = "button";
document.body.appendChild(button);

// 이벤트의 종류에 따라 콜백 함수로 전달되는 이벤트의 타입이 구분되는 것에 대한 테스트
_(".button").addEvent("click", function (event) {
  expectType<MouseEvent>(event);
});
_(".button").addEvent("mouseover", function (event) {
  expectType<MouseEvent>(event);
});
_("body").addEvent("resize", function (event) {
  expectType<UIEvent>(event);
});

// html 매서드의 인자의 타입에 따라 반환하는 타입이 다른 것 테스트
expectType<string>(_("body").html());
expectType<void>(_("body").html("<div>reset"));

// show/hide 매서드의 인자로 여러 타입이 들어올 수 있는 것 테스트
expectType<void>(_(".button").show());
expectType<void>(_(".button").show(500, () => {}));

expectType<void>(_(".button").hide());
expectType<void>(_(".button").hide(500, () => {}));

// fetch 매서드의 반환값 테스트
expectType<Promise<any>>(_.fetch("test.com", "GET"));

// 타입 확인 함수들이 인자에 따라 true/false를 반환하는 지 테스트
expectType<true>(_.isNull(null));
expectType<false>(_.isNull(undefined));
expectType<false>(_.isNull(1));

expectType<true>(_.isNil(null));
expectType<true>(_.isNil(undefined));
expectType<false>(_.isNil(1));

expectType<true>(_.isNumber(3));
expectType<false>(_.isNumber("3"));

expectType<true>(_.isFunction(() => {}));
expectType<true>(_.isFunction(console.log));
expectType<false>(_.isFunction("3"));

// shuffle, pick, omit 테스트
const sampleObject = { a: 1, b: 2 };
expectType<string[]>(_.shuffle(["3"]));
expectType<number[]>(_.shuffle(sampleObject));

expectType<Pick<typeof sampleObject, "a">>(_.pick(sampleObject, ["a"]));
expectType<Pick<typeof sampleObject, "a" | "b">>(
  _.pick(sampleObject, ["a", "b"])
);

expectType<Omit<typeof sampleObject, "a">>(_.omit(sampleObject, ["a"]));
expectType<Omit<typeof sampleObject, "a" | "b">>(
  _.omit(sampleObject, ["a", "b"])
);

// 임시 함수로 memoize, debounce, throttle의 반환 타입 테스트
const sampleFunc = (arg1: string, arg2: number) => `${arg1}, ${arg2}`;

expectType<typeof sampleFunc>(_.memoize(sampleFunc));
expectType<typeof sampleFunc>(_.debounce(sampleFunc, 100));
expectType<(arg1: string, arg2: number) => string>(_.throttle(sampleFunc, 100));

// clickOutside 함수 반환 값 테스트
expectType<void>(
  _.clickOutside(button, (e) => {
    console.log(e);
  })
);
