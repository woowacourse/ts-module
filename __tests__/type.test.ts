/**
 * @jest-environment jsdom
 */
import { expectType } from "tsd";
import { FetchOptions, FetchResponse } from "types";

import _ from "../src";

describe("function _ type test", () => {
  test('_("").addEvent type test', () => {
    const button = document.createElement("button");
    button.setAttribute("class", "button");
    document.body.appendChild(button);

    _(".button").addEvent("click", function (this, event) {
      expectType<MouseEvent>(event);
    });

    button.remove();
  });
});

describe("module _ type test", () => {
  test("fetch test", () => {
    type TestData = {
      name: string;
      age: number;
    };

    expectType<
      (
        entry: string,
        options?: FetchOptions
      ) => Promise<FetchResponse<TestData[]>>
    >(_.fetch<TestData[]>);
  });

  test("isNull test", () => {
    expectType<boolean>(_.isNull(null));
    expectType<boolean>(_.isNull("hello"));
  });

  test("isNil test", () => {
    expectType<boolean>(_.isNil(null));
    expectType<boolean>(_.isNil(undefined));
    expectType<boolean>(_.isNil("hello"));
  });

  test("isNumber test", () => {
    expectType<boolean>(_.isNumber(2));
    expectType<boolean>(_.isNumber("hello"));
  });

  test("isFunction test", () => {
    expectType<boolean>(_.isFunction(() => console.log("hi")));
    expectType<boolean>(_.isFunction("hello"));
  });

  test("shuffle test", () => {
    const a = [1, "string", false];

    type AType = typeof a;

    expectType<AType>(_.shuffle(a));
  });

  test("pick test", () => {
    const a = {
      name: "dom",
      age: 30,
      married: false,
    };

    expectType<Pick<typeof a, "name">>(_.pick(a, "name"));
  });

  test("omit test", () => {
    const a = {
      name: "dom",
      age: 30,
      married: false,
    };

    expectType<Omit<typeof a, "name">>(_.omit(a, "name"));
  });

  test("memoize test", () => {
    const func = (a: number) => console.log("hi");
    const resolver = (a: number) => false;

    type FuncType = typeof func;

    expectType<FuncType>(_.memoize(func));
    expectType<FuncType>(_.memoize(func, resolver));
  });

  test("debounce test", () => {
    const func = (a: number) => 500;
    const wait = 2000;
    const options = {
      leading: true,
      maxWait: 1000,
      trailing: false,
    };

    expectType<_.DebouncedFunctionType<[a: number]>>(
      _.debounce(func, wait, options)
    );
  });

  test("throttle test", () => {
    const func = (a: number) => 500;
    const wait = 2000;
    const options = {
      leading: true,
      maxWait: 1000,
      trailing: false,
    };

    expectType<_.DebouncedFunctionType<[a: number]>>(
      _.throttle(func, wait, options)
    );
  });

  test("clickOutside test", () => {
    expectType<
      (eventTarget: HTMLElement, innerElement: HTMLElement) => boolean
    >(_.clickOutside);
  });
});
