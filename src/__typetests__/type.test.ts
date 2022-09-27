/**
 * @jest-environment jsdom
 */
import { expectType } from "tsd";

import wtil from "..";
import isNull from "../isNull";

wtil(".button").addEvent("click", function (event: MouseEvent) {
  expectType<MouseEvent>(event);
});

/* isNull type test */ {
  expectType<boolean>(isNull(null));
}
