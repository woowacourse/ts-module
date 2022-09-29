/**
 * @jest-environment jsdom
 */
import { expectType } from "tsd";
import _ from "../../dist";

const divElement = document.createElement("div");

_(".button").addEvent("click", function (event: MouseEvent) {
  expectType<MouseEvent>(event);
});

expectType<string>(_("div").innerHTML("typing innerHTML"));

expectType<void>(_("div").show());

expectType<void>(_("div").hidden());

expectType<boolean>(_.isNull(null));

expectType<boolean>(_.isNil(null));

expectType<boolean>(_.isNumber(1));
