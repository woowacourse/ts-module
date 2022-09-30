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

describe("Selector 및 메서드 동작 확인", () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
  document.body.appendChild(divElement);
  const buttonElement = _("button.test-btn");

  test("Selector 동작 확인", () => {
    expect(buttonElement).toBeTruthy();
  });

  test("innerHTML 동작 확인", () => {
    expect(buttonElement.innerHTML).toBe("Continue");
  });

  test("show() 동작 확인", () => {
    buttonElement.style.display = "none";
    buttonElement.show();
    expect(buttonElement.style.display).toBe("block");
  });

  test("hidden() 동작 확인", () => {
    buttonElement.style.display = "block";
    buttonElement.hide();
    expect(buttonElement.style.display).toBe("none");
  });

  test("addEvent() 동작 확인", () => {
    const mockEventCallback = jest.fn();

    buttonElement.addEvent("click", mockEventCallback);
    buttonElement.click();

    expect(mockEventCallback).toBeCalled();
  });
});
