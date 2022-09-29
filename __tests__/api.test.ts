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

  const buttonElement = _("button.test-btn");
  expect(buttonElement).toBeTruthy();
  divElement.removeChild(buttonElement);
});

test("html() 동작 확인", () => {
  const divElement = document.createElement("div");
  divElement.className = "test-div";
  document.body.appendChild(divElement);

  const targetElement = _(".test-div");
  targetElement.html(`<button class='test-btn'>Continue</button>`);

  const buttonElement = _("button.test-btn");

  expect(buttonElement).toBeTruthy();
  targetElement.removeChild(buttonElement);
});

test("show() 동작 확인", () => {
  const divElement = document.createElement("div");
  divElement.className = "test-div";
  document.body.appendChild(divElement);

  const targetElement = _(".test-div");
  targetElement.style.display = "none";
  targetElement.show();

  expect(targetElement.style.display).toBe("block");
});

test("hide() 동작 확인", () => {
  const divElement = document.createElement("div");
  divElement.className = "test-div";
  document.body.appendChild(divElement);

  const targetElement = _(".test-div");
  targetElement.style.display = "block";
  targetElement.hide();

  expect(targetElement.style.display).toBe("none");
});
