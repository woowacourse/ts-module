/**
 * @jest-environment jsdom
 */
import { expectType } from "tsd";

import _ from "../src";

_(".button").addEvent("click", function (event) {
  expectType<MouseEvent>(event);
});

expectType<boolean>(_.isNull(null));
expectType<boolean>(_.isNull(0));

expectType<boolean>(_.isNil(undefined));
expectType<boolean>(_.isNil(NaN));
