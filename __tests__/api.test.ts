/**
 * @jest-environment jsdom
 */
import _ from "../src";

test("모듈은 기본 내보내기", () => {
  expect(_).toBeTruthy();
});

test("모듈에 포함된 함수 확인", () => {
  expect(typeof _.fetch).toBe("function");
});

test("모듈에 포함된 함수 확인", () => {
  expect(typeof _.isNull).toBe("function");
});

test("모듈에 포함된 함수 확인", () => {
  expect(typeof _.isNil).toBe("function");
});

test("모듈에 포함된 함수 확인", () => {
  expect(typeof _.isNumber).toBe("function");
});

test("모듈에 포함된 함수 확인", () => {
  expect(typeof _.isFunction).toBe("function");
});

test("모듈에 포함된 함수 확인", () => {
  expect(typeof _.shuffle).toBe("function");
});

test("모듈에 포함된 함수 확인", () => {
  expect(typeof _.pick).toBe("function");
});

test("모듈에 포함된 함수 확인", () => {
  expect(typeof _.omit).toBe("function");
});

test("모듈에 포함된 함수 확인", () => {
  expect(typeof _.memoize).toBe("function");
});

test("모듈에 포함된 함수 확인", () => {
  expect(typeof _.debounce).toBe("function");
});

test("모듈에 포함된 함수 확인", () => {
  expect(typeof _.throttle).toBe("function");
});

test("모듈에 포함된 함수 확인", () => {
  expect(typeof _.clickOutside).toBe("function");
});

test("Selector 동작 확인", () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
  document.body.appendChild(divElement);

  const buttonElement = _("button.test-btn");
  expect(buttonElement).toBeTruthy();

  document.body.removeChild(buttonElement as Element);
});

test('`_("").innerHTML()`~~~~', () => {});

test('`_("").show()`~~~~', () => {});

test('`_("").hidden()`~~~~', () => {});

test('`_("").addEvent()`~~~~', () => {});
