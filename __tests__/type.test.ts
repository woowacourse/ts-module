/**
 * @jest-environment jsdom
 */
import { expectType } from "tsd";
import _ from "../src";

test("모듈에 포함된 innerHTML() 타입 확인", () => {
  expectType<(DOMString: string) => void>(_(".button").innerHTML);
});

test("모듈에 포함된 show() 타입 확인", () => {
  expectType<() => void>(_(".button").show);
});

test("모듈에 포함된 hidden() 타입 확인", () => {
  expectType<() => void>(_(".button").hidden);
});

test("모듈에 포함된 addEvent() 타입 확인", () => {
  _(".button").addEvent("click", function (event) {
    expectType<MouseEvent>(event);
  });
});

test("모듈에 포함된 fetch 타입 확인", () => {
  expectType<
    (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>
  >(_.fetch);
});

test("모듈에 포함된 isNull 타입 확인", () => {
  expectType<(value: unknown) => boolean>(_.isNull);
});

test("모듈에 포함된 isNil 타입 확인", () => {
  expectType<(value: unknown) => boolean>(_.isNil);
});

test("모듈에 포함된 isNumber 타입 확인", () => {
  expectType<(value: unknown) => boolean>(_.isNumber);
});

test("모듈에 포함된 isFunction 타입 확인", () => {
  expectType<(value: unknown) => boolean>(_.isFunction);
});

test("모듈에 포함된 shuffle 타입 확인", () => {
  expectType<(collection: Array<any>) => void>(_.shuffle);
});

test("모듈에 포함된 pick 타입 확인", () => {
  expectType<
    (
      target: Record<string, any>,
      property: Array<string>
    ) => Record<string, any>
  >(_.pick);
});

test("모듈에 포함된 omit 타입 확인", () => {
  expectType<
    (
      target: Record<string, any>,
      property: Array<string>
    ) => Record<string, any>
  >(_.omit);
});

test("모듈에 포함된 memoize 타입 확인", () => {
  expectType<(func: Function) => unknown>(_.memoize);
});

test("모듈에 포함된 debounce 타입 확인", () => {
  expectType<(func: Function, wait: number) => void>(_.debounce);
});

test("모듈에 포함된 throttle 타입 확인", () => {
  expectType<(func: Function, wait: number) => void>(_.throttle);
});

test("모듈에 포함된 clickOutside 타입 확인", () => {
  expectType<
    (targetElement: HTMLElement, clickedElement: HTMLElement) => boolean
  >(_.clickOutside);
});
