/**
 * @jest-environment jsdom
 */
import { expectType } from "tsd";

import wtil from "..";
import isFunction from "../isFunction";
import isNil from "../isNil";
import isNull from "../isNull";
import pick from "../pick";
import shuffle from "../shuffle";

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

/* function type test */ {
  expectType<boolean>(isFunction(() => {}));
}

/* shuffle type test */ {
  expectType<Array<number>>(shuffle<number>([]));
}

/* pick type test */ {
  expectType<{ a: string }>(
    pick<{ a: string; b: number }, "a">({ a: "hihi", b: 111 }, ["a"])
  );
}