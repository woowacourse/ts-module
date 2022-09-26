/**
 * @jest-environment jsdom
 */
import { expectType } from "tsd";

import wtil from "../../src";

wtil(".button").addEvent("click", function (event: MouseEvent) {
  expectType<MouseEvent>(event);
});
