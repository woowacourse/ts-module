/**
 * @jest-environment jsdom
 */
import { expectType } from "tsd";

import _ from "../src";

expectType<Promise<Response>>(_.fetch("url"));

expectType<boolean>(_.isNull(null));
expectType<boolean>(_.isNull([1, 2, 3, 4, 5]));

expectType<boolean>(_.isNil([1, 2, 3, 4, 5]));
expectType<boolean>(_.isNil(1));
expectType<boolean>(_.isNil(null));
expectType<boolean>(_.isNil(undefined));

expectType<boolean>(_.isNumber(1));
expectType<boolean>(_.isNumber("1"));

expectType<boolean>(_.isFunction(() => {}));
expectType<boolean>(_.isFunction("1"));

expectType<number[]>(_.shuffle([1, 2, 3, 4, 5]));
expectType<(string | number)[]>(_.shuffle([1, "2", 3, "4", 5]));

expectType<{ a: number }>(_.pick({ a: 123, b: "a" }, ["a"]));

expectType<{ b: string }>(_.omit({ a: 123, b: "a" }, ["a"]));

expectType<(a: number) => number>(_.memoize((a: number) => a * 2));
expectType<(a: number) => string>(
  _.memoize(
    (a: number) => a.toString(),
    (a: number) => a.toString()
  )
);

expectType<(a: number) => void>(_.debounce((a: number) => a * 2));
expectType<(a: number) => void>(_.debounce((a: number) => a * 2, 2000));
expectType<(a: number) => void>(
  _.debounce((a: number) => a * 2, 2000, { leading: true })
);

expectType<(a: number) => void>(_.throttle((a: number) => a * 2));
expectType<(a: number) => void>(_.throttle((a: number) => a * 2, 2000));
expectType<(a: number) => void>(
  _.throttle((a: number) => a * 2, 2000, { leading: true })
);

const $button = _(".button");

if ($button) {
  $button.addEvent("click", function (event) {
    expectType<MouseEvent>(event);
  });

  expectType<void>(_.clickOutside($button, (a: number) => a * 2));

  expectType<void>($button.setInnerHTML("<h1>setInnerHTML 테스트<h1>"));
  expectType<void>($button.setShow());
  expectType<void>($button.setHidden());
  expectType<void>($button.addEvent("click", (event) => {}));
  //@ts-expect-error
  expectType<void>($button.addEvent("test", (event) => {}));
}
