/**
 * @jest-environment jsdom
 */
import { expectType } from "tsd";

import _ from "../src";

_(".button").addEvent("click", function (event: MouseEvent) {
  expectType<MouseEvent>(event);
});

expectType<boolean>(_.isNull(null));

expectType<boolean>(_.isNull(null));

expectType<boolean>(_.isNumber(3));

expectType<boolean>(_.isFunction(3));

expectType<string[]>(_.shuffle(["a", "b", "c"]));

const obj = { a: 1, b: 2, c: 3 };

expectType<Pick<typeof obj, "a">>(_.pick(obj, ["a"]));

expectType<Omit<typeof obj, "a">>(_.omit(obj, ["a"]));

const func = () => {};

expectType<typeof func>(_.debounce(func, 1000));

expectType<typeof func>(_.throttle(func, 1000));

expectType<(target: HTMLElement, event: HTMLElement) => boolean>(
  _.clickOutside
);
