/**
 * @jest-environment jsdom
 */
import { expectType } from "tsd";

import _ from "../dist";

const button = document.createElement("button");
button.className = "button";
document.body.appendChild(button);

_(".button").addEvent("click", function (event) {
  expectType<MouseEvent>(event);
});

_(".button").addEvent("mouseover", function (event) {
  expectType<MouseEvent>(event);
});

_("body").addEvent("resize", function (event) {
  expectType<UIEvent>(event);
});

expectType<string>(_("body").html());
expectType<void>(_("body").html("<div>reset"));

expectType<void>(_(".button").show());
expectType<void>(_(".button").show(500, () => {}));

expectType<void>(_(".button").hide());
expectType<void>(_(".button").hide(500, () => {}));

expectType<Promise<any>>(_.fetch("test.com", "get"));

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

const sampleFunc = (arg1: string, arg2: number) => `${arg1}, ${arg2}`;

expectType<typeof sampleFunc>(_.memoize(sampleFunc));
expectType<typeof sampleFunc>(_.debounce(sampleFunc, 100));
expectType<typeof sampleFunc>(_.throttle(sampleFunc, 100));

expectType<void>(
  _.clickOutside(button, (e) => {
    console.log(e);
  })
);
