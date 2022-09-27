import _ from "../src";
import { expectType } from "tsd";
import {
  DebouncedFunction,
  DebounceThrottleOptions,
  SoundFunction,
  FetchOptions,
  FetchResponse,
} from "../src/util";

test("fetch 함수에 대한 타입을 체크한다.", () => {
  // given
  type TestData = {
    id: number;
    name: string;
    age: number;
  };

  expectType<
    (url: string, options?: FetchOptions) => Promise<FetchResponse<TestData[]>>
  >(_.fetch<TestData[]>);
});

test("isNull 함수에 대한 타입을 체크한다.", () => {
  expectType<(value: any) => value is null>(_.isNull);
});

test("isNill 함수에 대한 타입을 체크한다.", () => {
  expectType<(value: any) => value is null | undefined>(_.isNil);
});

test("isFunction 함수에 대한 타입을 체크한다.", () => {
  expectType<(value: any) => value is (...args: any[]) => any>(_.isFunction);
});

test("shuffle 함수에 대한 타입을 체크한다.", () => {
  expectType<(array: number[]) => number[]>(_.shuffle<number>);
});

test("pick 함수에 대한 타입을 체크한다.", () => {
  // given
  type testObj = { a: 1; b: 2; c: 3 };
  type testPath = ["a", "b"];
  type pickResultObj = { a: 1; b: 2 };

  // then
  expectType<(object: testObj, path: testPath) => pickResultObj>(
    _.pick<testObj, testPath>
  );
});

test("omit 함수에 대한 타입을 체크한다.", () => {
  // given
  type testObj = { a: 1; b: 2; c: 3 };
  type testPath = ["a", "b"];
  type OmitResultObj = { c: 3 };

  // then
  expectType<(object: testObj, path: testPath) => OmitResultObj>(
    _.omit<testObj, testPath>
  );
});

test("debounce 함수에 대한 타입을 체크한다.", () => {
  // given
  type testFun = SoundFunction<number>;

  expectType<
    (
      func: testFun,
      wait: 100,
      options: DebounceThrottleOptions
    ) => DebouncedFunction<testFun>
  >(_.debounce<testFun>);
});

test("throttle 함수에 대한 타입을 체크한다.", () => {
  // given
  type testFun = SoundFunction<number>;

  expectType<
    (
      func: testFun,
      wait: 100,
      options: DebounceThrottleOptions
    ) => DebouncedFunction<testFun>
  >(_.throttle<testFun>);
});

test("clickOutside 함수에 대한 타입을 체크한다.", () => {
  expectType<(eventTarget: HTMLElement, innerElement: HTMLElement) => boolean>(
    _.clickOutside
  );
});
