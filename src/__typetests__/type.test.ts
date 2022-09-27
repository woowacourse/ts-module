/**
 * @jest-environment jsdom
 */
import { expectType } from "tsd";

import wtil from "..";
import isNil from "../isNil";
import isNull from "../isNull";

wtil(".button").addEvent("click", function (event: MouseEvent) {
  expectType<MouseEvent>(event);
});

/* isNull type test */ {
  expectType<boolean>(isNull(null));
}

/* isNil type test */ {
  expectType<boolean>(isNil(null));
  expectType<boolean>(isNil(undefined));
}
