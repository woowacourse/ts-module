/**
 * @jest-environment jsdom
 */
import { expectType } from "tsd";

import _ from "../../src";

// _(".button").addEvent("click", function (event: any) {
//   expectType<MouseEvent>(event);
// });

expectType<boolean>(_.isNull(undefined));
// expectType<boolean>(_.isNull("string"));

// /** @type {import('ts-jest').JestConfigWithTsJest} */
