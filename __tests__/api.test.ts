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

  const buttonElement = _("button.test-btn").element!;
  expect(buttonElement).toBeTruthy();
  divElement.removeChild(buttonElement);
});

test("innerHTML 동작 확인", () => {
  const divElement = document.createElement("div");
  divElement.id = "target-div";
  document.body.appendChild(divElement);

  const myElement = _("#target-div");
  myElement.innerHTML(`<button class='test-btn'>Continue</button>`);

  const buttonElement = _("button.test-btn").element!;

  expect(buttonElement).toBeTruthy();
  myElement.element!.removeChild(buttonElement);
});

test("show 동작 확인", () => {
  const divElement = document.createElement("div");
  divElement.id = "target-div";
  document.body.appendChild(divElement);

  const myElement = _("#target-div");
  myElement.element!.style.display = "none";
  myElement.show();

  expect(myElement.element!.style.display).toBe("block");
});

test("hide 동작 확인", () => {
  const divElement = document.createElement("div");
  divElement.id = "target-div";
  document.body.appendChild(divElement);

  const myElement = _("#target-div");
  myElement.hide();

  expect(myElement.element!.style.display).toBe("none");
});
