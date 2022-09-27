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

  const test = document.querySelector("button.test-btn");

  expect(test).toBe(null);
});

test("shuffle 기본 동작 확인", () => {
  const arr = [1, 2, 3];
  expect(wtil.shuffle(arr)).toEqual(expect.arrayContaining(arr));
});

test("pick 기본 동작 확인", () => {
  const obj = { 1: 1, 2: 2 };
  expect(wtil.pick(obj, [1])).toEqual(expect.objectContaining({ 1: 1 }));
});

test('`wtil("div").innerHTML()`~~~~', () => {
  const divElement = document.createElement("div");
  document.body.appendChild(divElement);

  const $div = wtil("div");
  $div.innerHTML("aaa");
  expect($div.get(0)?.innerHTML).toBe("aaa");
});

test('`wtil("div").show()`~~~~', () => {
  const divElement = document.createElement("div");
  document.body.appendChild(divElement);

  const $div = wtil("div");
  $div.show();
  expect($div.get(0)?.hidden).toBe(false);
});

test('`wtil("div").hidden()`~~~~', () => {
  const divElement = document.createElement("div");
  document.body.appendChild(divElement);

  const $div = wtil("div");
  $div.hidden();
  expect($div.get(0)?.hidden).toBe(true);
});
