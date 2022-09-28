/**
 * @jest-environment jsdom
 */
import { expectType } from "tsd";

import _ from "../src";

expectType<Promise<string>>(
  _.fetch<string>("https://example.com", {
    method: "GET",
  }).then((res) => res.json())
);

expectType<boolean>(_.isNull(null));
expectType<boolean>(_.isNull("2"));

expectType<boolean>(_.isNil(undefined));
expectType<boolean>(_.isNil(null));
expectType<boolean>(_.isNil("2"));

expectType<boolean>(_.isNumber(1));
expectType<boolean>(_.isNumber("2"));

expectType<boolean>(_.isFunction(() => {}));
expectType<boolean>(_.isFunction("2"));

expectType<(1 | 2 | 3 | 4)[]>(_.shuffle([4, 2, 3, 1]));

expectType<{ x: number; y: number }>(_.pick({ x: 1, y: 2, z: 3 }, ["x", "y"]));

expectType<{ z: number }>(_.omit({ x: 1, y: 2, z: 3 }, ["x", "y"]));

expectType<(a: number, b: number) => number>(
  _.memoize((a: number, b: number) => {
    return a + b;
  })
);

expectType<(a: number, b: number) => void>(
  _.debounce(
    (a: number, b: number) => {
      console.log(a, b);
    },
    300,
    { leading: true }
  )
);

expectType<(a: number, b: number) => void>(
  _.throttle((a: number, b: number) => {
    console.log(a, b);
  }, 300)
);

const div = document.createElement("div");
expectType<void>(
  _.clickOutside(div, () => {
    console.log("click outside");
  })
);

expectType<void>(
  //@ts-expect-error
  _.clickOutside("div", () => {
    console.log("click outside");
  })
);

//DomUtil

const $Button = _(".button");

if ($Button) {
  $Button.addEvent("click", function (event) {
    expectType<MouseEvent>(event);
  });

  //@ts-expect-error
  $Button.addEvent("test", function (event) {
    console.log(event);
  });

  expectType<void>($Button.setShow());

  expectType<void>($Button.setHidden());

  expectType<void>($Button.setInnerHTML("<div>안녕하세요</div>"));
}
