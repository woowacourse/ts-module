import { expectType } from "tsd";

import _ from "../src";

test("innerHTML 함수 타입을 테스트한다. ", () => {
  expectType<string>(_("button").innerHtml("hello world"));
});

test("show 함수 타입을 테스트한다. ", () => {
  expectType<void>(_("button").show());
});

test("hide 함수 타입을 테스트한다. ", () => {
  expectType<void>(_("button").hide());
});
