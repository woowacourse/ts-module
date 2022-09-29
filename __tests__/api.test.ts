import _ from "../src";

test("모듈은 기본 내보내기를 테스트한다.", () => {
  expect(_).toBeTruthy();
});

test("모듈에 포함된 함수를 확인한다.", () => {
  expect(typeof _.fetch).toBe("function");
});

test("모듈에 포함된 함수를 확인한다.", () => {
  expect(typeof _.pick).toBe("function");
});

test("모듈에 포함된 함수를 확인한다.", () => {
  expect(typeof _.omit).toBe("function");
});

test("Selector 동작을 확인한다.", () => {
  const buttonElement = _("button.test-btn");

  expect(buttonElement).toBeTruthy();
});

test("innerHtml 동작을 확인한다.", () => {
  const buttonElement = _("button.test-btn");

  expect(buttonElement.innerHtml()).toBe("");
});

test("show 동작을 확인한다.", () => {
  const buttonElement = _("button.test-btn");
  buttonElement.show();

  expect(buttonElement.getElement().style.display).toBe("block");
});

test("hide 동작을 확인한다.", () => {
  const buttonElement = _("button.test-btn");
  buttonElement.hide();

  expect(buttonElement.getElement().style.display).toBe("none");
});

test("addEvent 동작을 확인한다.", () => {
  const buttonElement = _("button.test-btn");
  const listener = jest.fn();

  buttonElement.addEvent("click", listener);
  buttonElement.getElement().click();

  expect(listener).toBeCalled();
});
