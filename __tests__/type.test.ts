/**
 * @jest-environment jsdom
 */
import { expectType } from "tsd";

import _ from "..";

const button = document.createElement("button");
button.className = "button";
document.body.appendChild(button);

_(".button").addEvent("click", function (event) {
  expectType<MouseEvent>(event);
});

expectType<boolean>(_.isNumber(3));
expectType<boolean>(_.isNull(null));
