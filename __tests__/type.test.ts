/**
 * @jest-environment jsdom
 */
import { expectType } from "tsd";
import _ from "../src";

_(".button").addEvent("click", function (event) {
  expectType<MouseEvent>(event);
});

expectType<void>(_(".divElement").showElement());

expectType<void>(_(".divElement").hideElement());

expectType<void>(_(".divElement").setInnerHTML());

expectType<void>(
  _(".divElement").setInnerHTML("안녕하세요. 문장 넣기 테스트입니다.")
);
