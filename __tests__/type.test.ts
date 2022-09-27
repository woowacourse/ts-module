/**
 * @jest-environment jsdom
 */
import { expectType } from "tsd";

import _ from "../src/index";

const object = { a: 1, b: 2, c: 3 };

expectType<boolean>(_.isNull(null));
expectType<boolean>(_.isNil(undefined));
expectType<boolean>(_.isFunction(() => {}));
expectType<number[]>(_.shuffle([1, 2, 3, 4]));
expectType<Pick<typeof object, "a" | "c">>(_.pick(object, ["a", "c"]));
expectType<Omit<typeof object, "a" | "c"> | {}>(_.omit(object, ["a", "c"]));
expectType<(eventTarget: HTMLElement, innerElement: HTMLElement) => boolean>(
  _.clickOutside
);
