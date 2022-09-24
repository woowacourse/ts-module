/**
 * @jest-environment jsdom
 */
import { expectType } from "tsd";

import _ from "../src";

_(".button").addEvent("click", function (event) {
  expectType<MouseEvent>(event);
});

expectType<Promise<{ name: string }>>(
  _.fetch<{ name: string }>("https://example.com", {
    method: "GET",
  }).then((res) => res.json())
);

expectType<true>(_.isNull(null));
expectType<false>(_.isNull("2"));

expectType<true>(_.isNil(undefined));
expectType<true>(_.isNil(null));
expectType<false>(_.isNil("2"));
