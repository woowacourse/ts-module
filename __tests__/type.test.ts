import { expectType } from "tsd";
import _ from "../src";

_(".button").addEvent("click", function (event) {
  expectType<MouseEvent>(event);
});
