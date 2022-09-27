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

test('`_("").innerHTML()`~~~~', () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
  document.body.appendChild(divElement);

  const buttonElementObject = _("button.test-btn");

  buttonElementObject.innerHTML('<div id="test-div"></div>');

  const testDivElement = _("#test-div");
  expect(testDivElement).toBeTruthy();
});

test('`_("").show()`~~~~', () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = `<button class='test-btn' style="display:none">Continue</button>`;
  document.body.appendChild(divElement);

  const buttonElementObject = _("button.test-btn");
  const buttonElement = _("button.test-btn").get();

  buttonElementObject.show();

  expect(buttonElement.style.display).toBe("");
});

test('`_("").hidden()`~~~~', () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = `<button class='test-btn' style="display:""">Continue</button>`;
  document.body.appendChild(divElement);

  const buttonElementObject = _("button.test-btn");
  const buttonElement = _("button.test-btn").get();

  buttonElementObject.hidden();

  expect(buttonElement.style.display).toBe("none");
});

test('`_("").addEvent()`~~~~', () => {
  const clickEventHandler = jest.fn();

  const divElement = document.createElement("div");
  divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
  document.body.appendChild(divElement);

  const buttonElementObject = _("button.test-btn");
  const buttonElement = buttonElementObject.get();
  buttonElementObject.addEvent("click", clickEventHandler);

  buttonElement.click();
  expect(clickEventHandler).toBeCalledTimes(1);
});

test("_.pick 동작 테스트", () => {
  const condition = {
    a: 10,
    b: 10,
  };

  const result = _.pick(condition, "a");

  expect(result["b"]).toBe(undefined);
});

test("_.omit 동작 테스트", () => {
  const condition = {
    a: 10,
    b: 10,
  };

  const result = _.omit(condition, "a");

  expect(result["a"]).toBe(undefined);
});

test("debounce 함수 확인", () => {
  const mockedFunction = jest.fn();
  const debouncedFunction = _.debounce(mockedFunction, 100);

  for (let i = 0; i < 1000; i++) {
    debouncedFunction();
    jest.advanceTimersByTime(50);
  }

  jest.runAllTimers();
  expect(mockedFunction).toHaveBeenCalledTimes(1);
});

test("throttle 함수 확인", () => {
  const mockedFunction: jest.Mock = jest.fn();
  const throttledFunction = _.throttle(mockedFunction, 1000);

  for (let i = 0; i < 1000; i++) {
    throttledFunction();
    jest.advanceTimersByTime(10);
  }

  expect(mockedFunction).toHaveBeenCalledTimes(10);
});

test("memoize 함수 확인", () => {
  const memoizedFunction = _.memoize(() => {
    return { a: 10, b: 10 };
  });

  const firstCallResult = memoizedFunction();
  const secondCallResult = memoizedFunction();

  expect(firstCallResult === secondCallResult).toBeTruthy();
});

test("isFunction 함수 확인 (정상 동작)", () => {
  const condition = () => {
    return 10;
  };

  const result = _.isFunction(condition);

  expect(result).toBeTruthy();
});

test("isFunction 함수 확인 (비정상 동작)", () => {
  const condition = 10;

  const result = _.isFunction(condition);

  expect(result).toBeFalsy();
});
