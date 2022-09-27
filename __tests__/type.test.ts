/**
 * @jest-environment jsdom
 */
import { expectType } from "tsd";
import { FetchOptions, FetchResponse } from "types";

import _ from "../src";

// _(".button").addEvent("click", function (event) {
//   expectType<MouseEvent>(event);
// });

describe("module _ type test", () => {
  test("fetch test", () => {
    type TestData = {
      id: number;
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

  test("isNull Test", () => {
    expectType<boolean>(_.isNull(null));
    expectType<boolean>(_.isNull("hello"));
  });

  test("isNil Test", () => {
    expectType<boolean>(_.isNil(null));
    expectType<boolean>(_.isNil(undefined));
    expectType<boolean>(_.isNil("hello"));
  });

  test("isNumber Test", () => {
    expectType<boolean>(_.isNumber(2));
    expectType<boolean>(_.isNumber("hello"));
  });

  test("isFunction Test", () => {
    expectType<boolean>(_.isFunction(() => console.log("hi")));
    expectType<boolean>(_.isFunction("hello"));
  });

  test("shuffle Test", () => {
    const a = [1, "string", false];

    type AType = typeof a;

    expectType<AType>(_.shuffle(a));
  });

  test("pick Test", () => {
    const a = {
      name: "dom",
      age: 30,
      married: false,
    };

    const result = {
      name: "dom",
    };

    type ResultType = typeof result;

    expectType<ResultType>(_.pick(a, "name"));
  });

  test("omit Test", () => {
    const a = {
      name: "dom",
      age: 30,
      married: false,
    };

    const result = {
      age: 30,
      married: false,
    };

    type ResultType = typeof result;

    expectType<ResultType>(_.omit(a, "name"));
  });

  test("memoize Test", () => {
    const func = (a: number) => console.log("hi");
    const resolver = (a: number) => false;

    type FuncType = typeof func;

    expectType<FuncType>(_.memoize(func));
    expectType<FuncType>(_.memoize(func, resolver));
  });

  test("debounce Test", () => {
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

  test("throttle Test", () => {
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

  test("clickOutside Test", () => {
    expectType<
      (eventTarget: HTMLElement, innerElement: HTMLElement) => boolean
    >(_.clickOutside);
  });
});
