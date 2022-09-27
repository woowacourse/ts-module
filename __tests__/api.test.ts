/**
 * @jest-environment jsdom
 */
import _ from "../src";

test("모듈은 기본 내보내기", () => {
  expect(_).toBeTruthy();
});

test("모듈에 포함된 fetch 함수 확인", () => {
  expect(typeof _.fetch).toBe("function");
});

test("모듈에 포함된 isNull 함수 확인", () => {
  expect(typeof _.isNull).toBe("function");
  expect(_.isNull(null)).toBeTruthy();
  expect(_.isNull("123")).toBeFalsy();
});

test("모듈에 포함된 isNil 함수 확인", () => {
  expect(typeof _.isNil).toBe("function");
  expect(_.isNil(null)).toBeTruthy();
  expect(_.isNil(undefined)).toBeTruthy();
  expect(_.isNil("123")).toBeFalsy();
});

test("모듈에 포함된 isNumber 함수 확인", () => {
  expect(typeof _.isNumber).toBe("function");
  expect(_.isNumber(123)).toBeTruthy();
  expect(_.isNumber("123")).toBeFalsy();
  expect(_.isNumber("")).toBeFalsy();
  expect(_.isNumber(null)).toBeFalsy();
});

test("모듈에 포함된 isFunction 함수 확인", () => {
  expect(typeof _.isFunction).toBe("function");
  expect(_.isFunction(function () {})).toBeTruthy();
  expect(_.isFunction(() => {})).toBeTruthy();
  expect(_.isFunction("")).toBeFalsy();
  expect(_.isFunction(null)).toBeFalsy();
});

test("모듈에 포함된 shuffle 함수 확인 (실패 가능성이 있는 테스트)", () => {
  // given
  const testCollection = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // when & then
  expect(typeof _.shuffle).toBe("function");
  expect(_.shuffle(testCollection)).not.toEqual(testCollection);
});

test("모듈에 포함된 pick 함수 확인", () => {
  // given
  const targetObject = { a: 1, b: 2 };

  // when & then
  expect(typeof _.pick).toBe("function");
  expect(_.pick(targetObject, ["a"])).toStrictEqual({ a: 1 });
});

test("모듈에 포함된 omit 함수 확인", () => {
  // given
  const targetObject = { a: 1, b: 2, c: 3 };

  // when & then
  expect(typeof _.omit).toBe("function");
  expect(_.omit(targetObject, ["a", "b"])).toStrictEqual({ c: 3 });
});

test("모듈에 포함된 memoize 함수 확인", () => {
  // given
  const memoizeFunc = () => 3;

  // when & then
  expect(typeof _.memoize).toBe("function");
  expect(_.memoize(memoizeFunc)).toEqual(3);
});

test("모듈에 포함된 debounce 함수 확인", () => {
  expect(typeof _.debounce).toBe("function");
});

test("모듈에 포함된 throttle 함수 확인", () => {
  expect(typeof _.debounce).toBe("function");
});

test("모듈에 포함된 clickOutside 함수 확인", () => {
  // given
  const divElement = document.createElement("div");
  divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
  document.body.appendChild(divElement);
  const buttonElement = _("button.test-btn").element;

  // when & then
  expect(typeof _.clickOutside).toBe("function");
  expect(_.clickOutside(divElement, buttonElement)).toBeFalsy();
  expect(_.clickOutside(buttonElement, divElement)).toBeTruthy();

  document.body.removeChild(divElement);
});

test("Selector 동작 확인", () => {
  // given
  const divElement = document.createElement("div");
  divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
  document.body.appendChild(divElement);

  // when
  const buttonElement = _("button.test-btn").element;

  // then
  expect(buttonElement).toBeTruthy();

  document.body.removeChild(divElement);
});

test("innerHTML() 동작 확인", () => {
  // given
  const divElement = document.createElement("div");
  document.body.appendChild(divElement);

  // when
  _("div").innerHTML("<button class='test-btn'>Continue</button>");
  const buttonElement = _("button.test-btn").element;

  // then
  expect(buttonElement).toBeTruthy();

  document.body.removeChild(divElement);
});

test("show() 동작 확인", () => {
  // given
  const divElement = document.createElement("div");
  divElement.style.display = "hidden";
  document.body.appendChild(divElement);

  // when
  _("div").show();

  // then
  expect(divElement.style.display).toBe("block");

  document.body.removeChild(divElement);
});

test("hidden() 동작 확인", () => {
  // given
  const divElement = document.createElement("div");
  document.body.appendChild(divElement);

  // when
  _("div").hidden();

  // then
  expect(divElement.style.display).toBe("none");

  document.body.removeChild(divElement);
});

test("addEvent() 동작 확인", () => {
  // given
  const divElement = document.createElement("div");
  const hidden = () => {
    divElement.style.display = "none";
  };
  document.body.appendChild(divElement);

  // when
  _("div").addEvent("click", hidden);
  divElement.click();

  // then
  expect(divElement.style.display).toBe("none");

  divElement.removeEventListener("click", hidden);
  document.body.removeChild(divElement);
});
