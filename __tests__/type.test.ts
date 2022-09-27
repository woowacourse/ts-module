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

test("addEvent 함수 타입을 테스트한다. ", () => {
  _("button").addEvent("click", function (event) {
    expectType<MouseEvent>(event);
  });

  _("button").addEvent("blur", function (event) {
    expectType<FocusEvent>(event);
  });
});

test("fetch 함수 타입을 테스트한다. ", () => {
  const options = {
    method: "GET" as Method,
  };

  expectType<Promise<unknown>>(_.fetch("https://ternoko.site", options));
});

test("isNull 함수 타입을 테스트한다. ", () => {
  expectType<true>(_.isNull(null));
  expectType<false>(_.isNull(undefined));
  expectType<false>(_.isNull(1));
});
