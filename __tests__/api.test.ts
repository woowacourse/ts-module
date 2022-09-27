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
  expect(typeof _.pick).toBe("function");
});

test("모듈에 포함된 함수 확인", () => {
  expect(typeof _.omit).toBe("function");
});

test("Selector 동작 확인", () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
  document.body.appendChild(divElement);

  const buttonElement = _("button.test-btn").get();
  expect(buttonElement).toBeTruthy();

  divElement.removeChild(buttonElement);
});

test("innerHTML 동작 확인", () => {
  const buttonElement = document.createElement("button");
  buttonElement.setAttribute("id", "test-innerHTML");

  document.body.appendChild(buttonElement);

  const editStr = "edit innerHTML";
  _("#test-innerHTML").innerHTML(editStr);

  expect(buttonElement.innerHTML).toBe(editStr);
});

test("show 동작 확인", () => {
  const buttonElement = document.createElement("button");
  buttonElement.setAttribute("id", "test-display-block");

  document.body.appendChild(buttonElement);

  _("#test-display-block").show();

  expect(buttonElement.style.display).toBe("block");
});

test("hidden 동작 확인", () => {
  const buttonElement = document.createElement("button");
  buttonElement.setAttribute("id", "test-display-none");

  document.body.appendChild(buttonElement);

  _("#test-display-none").hidden();

  expect(buttonElement.style.display).toBe("none");
});

test("addEvent 동작 확인", () => {
  const buttonElement = document.createElement("button");
  buttonElement.setAttribute("id", "test-addEvent");

  document.body.appendChild(buttonElement);

  const mockCallBack = jest.fn();

  _("#test-addEvent").addEvent("click", mockCallBack);

  buttonElement.click();

  expect(mockCallBack.mock.calls.length).toEqual(1);
});
