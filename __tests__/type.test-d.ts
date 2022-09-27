/**
 * @jest-environment jsdom
 */
import { expectType } from "tsd";
import _ from "../dist/index";

test("isNull 함수 타입 체크", () => {
  expectType<boolean>(_.isNull(""));
  expectType<boolean>(_.isNull(3));
  expectType<boolean>(_.isNull(undefined));
  expectType<boolean>(_.isNull(null));
});

test("isNil 함수 타입 체크", () => {
  expectType<boolean>(_.isNil("not null"));
  expectType<boolean>(_.isNil(""));
  expectType<boolean>(_.isNil(undefined));
  expectType<boolean>(_.isNil(null));
});

test("isNumber 함수 타입 체크", () => {
  expectType<boolean>(_.isNumber(1));
  expectType<boolean>(_.isNumber("not number"));
  expectType<boolean>(_.isNumber(undefined));
  expectType<boolean>(_.isNumber(null));
});

test("isFunction 함수 타입 체크", () => {
  expectType<boolean>(_.isFunction(""));
  expectType<boolean>(
    _.isFunction(() => {
      console.log("this is function");
    })
  );
  expectType<boolean>(_.isFunction(undefined));
  expectType<boolean>(_.isFunction(null));
});

test("shuffle 함수 타입 체크", () => {
  expectType<string[]>(_.shuffle(["1", "2", "3"]));
  expectType<number[]>(_.shuffle([1, 2, 3]));
  expectType<(string | number)[]>(_.shuffle(["1", 2, "3"]));
  expectType<string[][]>(
    _.shuffle([
      ["1", "2"],
      ["2", "3"],
      ["3", "4"],
    ])
  );
});

test("pick 함수 타입 체크", () => {
  expectType<Record<string | symbol | number, number> | number[]>(
    _.pick([1, 2, 3, 4])
  );
  expectType<Record<string | symbol | number, number> | number[]>(
    _.pick({ a: 1, b: 2, c: 3 })
  );
});

test("omit 함수 타입 체크", () => {
  expectType<Record<string | symbol | number, number> | number[]>(
    _.omit([1, 2, 3, 4])
  );
  expectType<Record<string | symbol | number, number> | number[]>(
    _.omit({ a: 1, b: 2, c: 3 })
  );
});

test("memoize 함수 타입 체크", () => {
  expectType<() => number[]>(_.memoize(() => [1, 2, 3]));
  expectType<() => { a: 1; b: 2; c: 3 }>(
    _.memoize(() => ({ a: 1, b: 2, c: 3 }))
  );
});

test("debounce 함수 타입 체크", () => {
  expectType<() => void>(_.debounce(() => console.log("debounce"), 3000));
});

test("throttle 함수 타입 체크", () => {
  expectType<() => void>(_.throttle(() => console.log("throttle"), 3000));
});

const divElement = document.createElement("div");
divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
document.body.appendChild(divElement);

test("_ class get 메서드 함수 타입 체크", () => {
  const _instance = new _(".test-btn");

  expectType<HTMLElement>(_instance.get());
});
