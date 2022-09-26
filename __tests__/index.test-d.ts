import { expectType } from "tsd";
import _ from "../dist/index";
import { FetchOptions, FetchResponse } from "../dist/util";

// fetch 함수에 대한 타입을 체크한다.

// given
type TestData = {
  id: number;
  name: string;
  age: number;
};

expectType<
  (url: string, options?: FetchOptions) => Promise<FetchResponse<TestData[]>>
>(_.fetch<TestData[]>);

// isNull 함수에 대한 타입을 체크한다.
expectType<(value: any) => value is null>(_.isNull);

// isNill 함수에 대한 타입을 체크한다.
expectType<(value: any) => value is null | undefined>(_.isNil);

// isNumber 함수에 대한 타입을 체크한다.
expectType<(value: any) => value is number>(_.isNumber);

// isFunction 함수에 대한 타입을 체크한다.
expectType<(value: any) => value is (...args: any[]) => any>(_.isFunction);

// shuffle 함수에 대한 타입을 체크한다.
expectType<(array: number[]) => number[]>(_.shuffle<number>);

// given
type testObj = { a: 1; b: 2; c: 3 };
type testPath = ["a", "b"];

type pickResultObj = { a: 1; b: 2 };
type OmitResultObj = { c: 3 };

// pick 함수에 대한 타입을 체크한다.
expectType<(object: testObj, path: testPath) => pickResultObj>(
  _.pick<testObj, testPath>
);

// omit 함수에 대한 타입을 체크한다.
expectType<(object: testObj, path: testPath) => OmitResultObj>(
  _.omit<testObj, testPath>
);
