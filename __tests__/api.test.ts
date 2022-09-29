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

  if (divElement) {
    document.body.removeChild(divElement);
  }
});

describe("DOM 동작 확인", () => {
  const newDivElement = document.createElement("div");
  document.body.appendChild(newDivElement);
  const divElement = _("div");

  if (!divElement) {
    return;
  }

  test("setInnerHTML()", () => {
    divElement.setInnerHTML(`testInnerHTML`);
    expect(divElement.innerHTML).toEqual("testInnerHTML");
  });

  test("setShow()", () => {
    divElement.setShow();
    expect(divElement.style.display).toEqual("block");
  });

  test("setHidden()", () => {
    divElement.setHidden();
    expect(divElement.style.display).toEqual("none");
  });

  test("addEvent()", () => {
    const mockCallback = jest.fn();

    divElement.addEvent("click", mockCallback);
    divElement.click();

    expect(mockCallback).toBeCalled();
  });
});
