/**
 * @jest-environment jsdom
 */
import { expectType } from "tsd";

import _ from "../src";

// _(".button").addEvent("click", function (event) {
//   expectType<MouseEvent>(event);
// });

// isNull
expectType<true>(_.isNull(null));
expectType<false>(_.isNull("winnie"));

// isNil
expectType<true>(_.isNil(null));
expectType<true>(_.isNil(undefined));
expectType<false>(_.isNil("winnie"));
