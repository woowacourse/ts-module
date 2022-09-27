/**
 * @jest-environment jsdom
 */
import wtil from "../";

test("모듈은 기본 내보내기", () => {
  expect(wtil).toBeTruthy();
});

test("isNull 기본 동작 확인", () => {
  expect(wtil.isNull(null)).toBe(true);
  expect(wtil.isNull("a")).toBe(false);
});

test("isNil 기본 동작 확인", () => {
  expect(wtil.isNil(null)).toBe(true);
  expect(wtil.isNil(undefined)).toBe(true);
});

test("isFunction 기본 동작 확인", () => {
  expect(wtil.isFunction("hello")).toBe(false);
  expect(wtil.isFunction(() => {})).toBe(true);
});

test("throttle 기본 동작 확인", () => {
  jest.useFakeTimers();

  let calledCount = 0;
  const throttler = wtil.throttle(100);
  const interval = setInterval(() => {
    throttler(() => {
      calledCount += 1;
    });
  }, 4);
  setTimeout(() => {
    clearInterval(interval);
  }, 200);

  jest.runAllTimers();

  expect(calledCount).toBe(200 / 100);
});

test("debounce 기본 동작 확인", () => {
  jest.useFakeTimers();

  let calledCount = 0;
  const debouncer = wtil.debounce(100);
  const interval = setInterval(() => {
    debouncer(() => {
      calledCount += 1;
    });
  }, 30);
  setTimeout(() => {
    clearInterval(interval);
  }, 200);

  jest.runAllTimers();

  expect(calledCount).toBe(1);
});

test("memoize 기본 동작 확인", () => {
  let calledCount = 0;
  const val1 = wtil.memoize(() => {
    calledCount += 1;
    return "aaa";
  }, [1, "a"]);
  const val2 = wtil.memoize(() => {
    calledCount += 1;
    return "bbb";
  }, [1, "a"]);

  expect(val2).toEqual(val1);
  expect(calledCount).toEqual(1);
});

test("Selector 동작 확인", () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
  document.body.appendChild(divElement);

  const $button = wtil("button.test-btn");
  expect($button).toBeTruthy();
  const buttonElement = $button.get(0);
  if (buttonElement) {
    divElement.removeChild(buttonElement);
  }
});

test('`wtil("").innerHTML()`~~~~', () => {});

test('`wtil("").show()`~~~~', () => {});

test('`wtil("").hidden()`~~~~', () => {});

test('`wtil("").addEvent()`~~~~', () => {});
