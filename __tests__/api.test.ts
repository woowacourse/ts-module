/**
 * @jest-environment jsdom
 */
import _ from "../src";

test("모듈은 기본 내보내기", () => {
  expect(_).toBeTruthy();
});

describe("모듈에 포함된 함수 확인", () => {
  test("fetch 함수가 모듈에 포함되어 있는지 확인", () => {
    expect(typeof _.fetch).toBe("function");
  });

  test("isNull 함수가 모듈에 포함되어 있는지 확인", () => {
    expect(typeof _.isNull).toBe("function");
  });

  test("isNil 함수가 모듈에 포함되어 있는지 확인", () => {
    expect(typeof _.isNil).toBe("function");
  });

  test("isNumber 함수가 모듈에 포함되어 있는지 확인", () => {
    expect(typeof _.isNumber).toBe("function");
  });

  test("isFunction 함수가 모듈에 포함되어 있는지 확인", () => {
    expect(typeof _.isFunction).toBe("function");
  });

  test("shuffle 함수가 모듈에 포함되어 있는지 확인", () => {
    expect(typeof _.shuffle).toBe("function");
  });

  test("pick 함수가 모듈에 포함되어 있는지 확인", () => {
    expect(typeof _.pick).toBe("function");
  });

  test("omit 함수가 모듈에 포함되어 있는지 확인", () => {
    expect(typeof _.omit).toBe("function");
  });

  test("memoize 함수가 모듈에 포함되어 있는지 확인", () => {
    expect(typeof _.memoize).toBe("function");
  });

  test("debounce 함수가 모듈에 포함되어 있는지 확인", () => {
    expect(typeof _.debounce).toBe("function");
  });

  test("throttle 함수가 모듈에 포함되어 있는지 확인", () => {
    expect(typeof _.throttle).toBe("function");
  });

  test("clickOutside 함수가 모듈에 포함되어 있는지 확인", () => {
    expect(typeof _.clickOutside).toBe("function");
  });
});

describe("isNull 함수가 정상적으로 동작하는지 확인", () => {
  test("isNull 함수 인자에 null값을 넣을 경우 true를 return 한다.", () => {
    expect(_.isNull(null)).toBe(true);
  });

  test("isNull 함수 인자에 null이 아닌 값을 넣을 경우 false를 return 한다.", () => {
    expect(_.isNull(2)).toBe(false);
  });
});

describe("isNil 함수가 정상적으로 동작하는지 확인", () => {
  test("isNil 함수 인자에 null 또는 undefined 값을 넣을 경우 true를 return 한다.", () => {
    expect(_.isNil(null)).toBe(true);
    expect(_.isNil(undefined)).toBe(true);
  });

  test("isNull 함수 인자에 null 또는 undefined 가 아닌 값을 넣을 경우 false를 return 한다.", () => {
    expect(_.isNil(2)).toBe(false);
  });
});

describe("isNumber 함수가 정상적으로 동작하는지 확인", () => {
  test("isNumber 함수 인자에 type이 number인 값이 들어갈 경우 true를 return 한다.", () => {
    expect(_.isNumber(2)).toBe(true);
  });

  test("isNumber 함수 인자에 type이 number가 아닌 값이 들어갈 경우 false를 return 한다.", () => {
    expect(_.isNumber("2")).toBe(false);
  });
});

describe("isFunction 함수가 정상적으로 동작하는지 확인", () => {
  test("isFunction 함수 인자에 type이 function인 값이 들어갈 경우 true를 return 한다.", () => {
    const testFunc = () => {};

    expect(_.isFunction(testFunc)).toBe(true);
  });

  test("isFunction 함수 인자에 type이 function인 값이 들어갈 경우 true를 return 한다.", () => {
    expect(_.isFunction(2)).toBe(false);
  });
});

// test("Selector 동작 확인", () => {
//   const divElement = document.createElement("div");
//   divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
//   document.body.appendChild(divElement);

//   const buttonElement = _("button.test-btn");
//   expect(buttonElement).toBeTruthy();

//   document.body.removeChild(buttonElement);
// });

// test('`_("").innerHTML()`~~~~', () => {});

// test('`_("").show()`~~~~', () => {});

// test('`_("").hidden()`~~~~', () => {});

// test('`_("").addEvent()`~~~~', () => {});
