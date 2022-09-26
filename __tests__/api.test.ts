/**
 * @jest-environment jsdom
 */
import _ from "../src";

afterEach(() => {
  document.body.innerHTML = "";
});

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
  const divElement: HTMLElement = document.createElement("div");
  divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
  document.body.appendChild(divElement);
  const buttonElement = _("button.test-btn");
  expect(buttonElement).toBeTruthy();
  if (buttonElement) {
    document.body.removeChild(buttonElement.parentNode as Node);
  }
  const removedButtonElement = _("button.test-btn");
  expect(removedButtonElement).toBeFalsy();
});

test('_("").setInnerHTML() 동작 확인', () => {
  const divElement: HTMLElement = document.createElement("div");
  divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
  document.body.appendChild(divElement);
  const buttonElement = _("button.test-btn");
  buttonElement?.setInnerHTML("안녕");
  expect(buttonElement?.textContent).toEqual("안녕");
});
