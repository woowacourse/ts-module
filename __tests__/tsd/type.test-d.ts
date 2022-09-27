/**
 * @jest-environment jsdom
 */
import { expectType } from "tsd";

import _ from "../../src";

expectType<boolean>(_.isNull(undefined));
expectType<boolean>(_.isNull("string"));

expectType<{ a: "123" }>(_.pick({ a: "123", b: "bb" }, "a"));
expectType<{ a: "123"; b: "bb" }>(
  _.pick({ a: "123", b: "bb", c: 1 }, "a", "b")
);
expectType<{ a: 1 }>(_.pick({ a: 1, b: "bb" }, "a"));
