/**
 * @jest-environment jsdom
 */
import _ from "../src";

jest.useFakeTimers();

test("모듈에 포함된 함수 확인", () => {
  expect(typeof _.fetch).toBe("function");
  jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ data: "coke" }),
    })
  );
});

test("isNull 함수 확인", () => {
  expect(typeof _.isNull).toBe("function");

  expect(_.isNull(undefined)).toBe(false);
  expect(_.isNull("string")).toBe(false);
  expect(_.isNull("")).toBe(false);
  expect(_.isNull(0)).toBe(false);
  expect(_.isNull(1)).toBe(false);
  expect(_.isNull(NaN)).toBe(false);
  expect(_.isNull(new Object())).toBe(false);
  expect(_.isNull(new Function())).toBe(false);
  expect(_.isNull(new Error())).toBe(false);
  expect(_.isNull(new Date())).toBe(false);
  expect(_.isNull(false)).toBe(false);
  expect(_.isNull(true)).toBe(false);

  expect(_.isNull(null)).toBe(true);
});

test("isNil 함수 확인", () => {
  expect(typeof _.isNil).toBe("function");
  const a = "a";

  a.toUpperCase();

  expect(_.isNil("string")).toBe(false);
  expect(_.isNil("")).toBe(false);
  expect(_.isNil(0)).toBe(false);
  expect(_.isNil(1)).toBe(false);
  expect(_.isNil(NaN)).toBe(false);
  expect(_.isNil(new Object())).toBe(false);
  expect(_.isNil(new Function())).toBe(false);
  expect(_.isNil(new Error())).toBe(false);
  expect(_.isNil(new Date())).toBe(false);
  expect(_.isNil(false)).toBe(false);
  expect(_.isNil(true)).toBe(false);

  expect(_.isNil(null)).toBe(true);
  expect(_.isNil(undefined)).toBe(true);
});

test("isNumber 함수 확인", () => {
  expect(typeof _.isNumber).toBe("function");

  expect(_.isNumber("string")).toBe(false);
  expect(_.isNumber("")).toBe(false);
  expect(_.isNumber(new Object())).toBe(false);
  expect(_.isNumber(new Function())).toBe(false);
  expect(_.isNumber(new Error())).toBe(false);
  expect(_.isNumber(new Date())).toBe(false);
  expect(_.isNumber(false)).toBe(false);
  expect(_.isNumber(true)).toBe(false);
  expect(_.isNumber(null)).toBe(false);
  expect(_.isNumber(undefined)).toBe(false);

  expect(_.isNumber(NaN)).toBe(true);
  expect(_.isNumber(0)).toBe(true);
  expect(_.isNumber(1)).toBe(true);
  expect(_.isNumber(1.2)).toBe(true);
  expect(_.isNumber(-1)).toBe(true);
  expect(_.isNumber(Infinity)).toBe(true);
  expect(_.isNumber(-Infinity)).toBe(true);
  expect(_.isNumber(new Number())).toBe(true);
  expect(_.isNumber(Object(0))).toBe(true);
});

test("isFunction 함수 확인", () => {
  const testFunc = () => {};
  function testFunc2() {}

  expect(typeof _.isFunction).toBe("function");

  expect(_.isFunction("string")).toBe(false);
  expect(_.isFunction("")).toBe(false);
  expect(_.isFunction(new Object())).toBe(false);
  expect(_.isFunction(new Error())).toBe(false);
  expect(_.isFunction(new Date())).toBe(false);
  expect(_.isFunction(false)).toBe(false);
  expect(_.isFunction(true)).toBe(false);
  expect(_.isFunction(null)).toBe(false);
  expect(_.isFunction(undefined)).toBe(false);

  expect(_.isFunction(new Function())).toBe(true);
  expect(_.isFunction(testFunc)).toBe(true);
  expect(_.isFunction(testFunc2)).toBe(true);
});

test("shuffle 함수 확인", () => {
  const originalList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const shuffledList = _.shuffle(originalList);

  expect(typeof _.shuffle).toBe("function");
});

test("pick 함수 확인", () => {
  const object = {
    a: "123",
    b: 12,
    c: "1d2d3d",
  };

  const result = _.pick(object, "a", "b");
  const matchResult = { a: object.a, b: object.b };
  const notMatchResult = { a: object.a, b: "coke" };

  expect(typeof _.pick).toBe("function");
  expect(result).toMatchObject(matchResult);
  expect(result).not.toMatchObject(notMatchResult);
});

test("omit 함수 확인", () => {
  const object = {
    a: "123",
    b: 12,
    c: "1d2d3d",
  };

  const result = _.omit(object, "a", "b");
  const matchResult = { c: object.c };
  const notMatchResult = { a: object.a, b: "coke" };

  expect(typeof _.omit).toBe("function");
  expect(result).toMatchObject(matchResult);
  expect(result).not.toMatchObject(notMatchResult);
});

test("memoize 함수 확인", () => {
  expect(typeof _.memoize).toBe("function");

  const key1 = 1;
  const key2 = 2;
  let func: jest.Mock;
  func = jest.fn();

  const getNumber = (num: number) => {
    for (let i = 0; i < 100000000; i++) {
      num++;
    }
    func();
    return num;
  };
  const result = _.memoize(getNumber);

  result(key1);
  result(key1);
  result(key1);
  result(key1);

  result(key2);
  result(key2);
  result(key2);

  expect(func).toHaveBeenCalledTimes(2);
});

test("debounce 함수 확인", () => {
  expect(typeof _.debounce).toBe("function");

  let func: jest.Mock;
  let debouncedFunc: Function;

  func = jest.fn();
  debouncedFunc = _.debounce(func, 100);

  for (let i = 0; i < 1000; i++) {
    debouncedFunc();
    jest.advanceTimersByTime(50);
  }

  jest.runAllTimers();
  expect(func).toHaveBeenCalledTimes(1);
});

test("throttle 함수 확인", () => {
  expect(typeof _.throttle).toBe("function");

  let func: jest.Mock;
  let throttledFunc: Function;

  func = jest.fn();
  throttledFunc = _.throttle(func, 100);

  for (let i = 0; i < 100; i++) {
    jest.advanceTimersByTime(10);
    throttledFunc();
  }

  jest.runAllTimers();
  expect(func).toHaveBeenCalledTimes(10);
});

test("clickOutside 함수 확인", () => {
  expect(typeof _.clickOutside).toBe("function");
});

test("Selector 동작 확인", () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
  document.body.appendChild(divElement);
  // console.log(document.body);

  const buttonElement = _("button.test-btn");
  // console.log(buttonElement);
  // expect(buttonElement).toBeTruthy();

  // document.body.removeChild(buttonElement);
});

// test('`_("").innerHTML()`~~~~', () => {});

// test('`_("").show()`~~~~', () => {});

// test('`_("").hidden()`~~~~', () => {});

// test('`_("").addEvent()`~~~~', () => {});

// https://haeguri.github.io/2020/01/12/jest-mock-timer/
