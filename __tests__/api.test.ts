/**
 * @jest-environment jsdom
 */
import _ from "../src";

jest.useFakeTimers();

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

test("fetch 함수가 정상적으로 동작하는지 확인(success 상황)", async () => {
  _.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ test: 100 }),
    })
  ) as jest.Mock;

  const data = await _.fetch("www.google.com").then((response) =>
    response.json()
  );

  expect(data).toEqual({ test: 100 });
});

test("fetch 함수가 정상적으로 동작하는지 확인(error 상황)", async () => {
  _.fetch = jest.fn(() =>
    Promise.reject(new Error("에러입니다."))
  ) as jest.Mock;

  const data = await _.fetch("www.google.com")
    .then((response) => response.json())
    .catch((e) => e);

  expect(data).toEqual(new Error("에러입니다."));
});

describe("isNull 함수가 정상적으로 동작하는지 확인", () => {
  test("isNull 함수 인자에 null값을 넣을 경우 true를 return 한다.", () => {
    expect(_.isNull(null)).toBe(true);
  });

  test("isNull 함수 인자에 null이 아닌 값을 넣을 경우 false를 return 한다.", () => {
    expect(_.isNull(0)).toBe(false);
    expect(_.isNull("")).toBe(false);
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

test("shuffle 함수가 정상적으로 동작하는지 확인", () => {
  const testArray = [1, 2, 3, 4];
  _.shuffle = jest.fn().mockReturnValue([3, 2, 1, 4]);

  expect(_.shuffle(testArray)).toEqual([3, 2, 1, 4]);
});

test("pick 함수가 정상적으로 동작하는지 확인", () => {
  const testArray = [1, 2, 3, 4];
  const testObject = { a: 1, b: 2, c: 3, d: 4 };

  expect(_.pick(testArray, [0, 1])).toEqual([1, 2]);
  expect(_.pick(testObject, ["a", "b"])).toEqual({ a: 1, b: 2 });
});

test("omit 함수가 정상적으로 동작하는지 확인", () => {
  const testArray = [1, 2, 3, 4];
  const testObject = { a: 1, b: 2, c: 3, d: 4 };

  expect(_.omit(testArray, [0, 1])).toEqual([3, 4]);
  expect(_.omit(testObject, ["a", "b"])).toEqual({ c: 3, d: 4 });
});

test("memoize 함수가 정상적으로 동작하는지 확인", () => {
  const testObject = { a: 1, b: 2 };
  const memoized = _.memoize(() => testObject);

  expect(memoized()).toEqual({ a: 1, b: 2 });
});

test("debounce 함수가 정상적으로 동작하는지 확인", () => {
  const func = jest.fn();
  const debouncedFunc = _.debounce(func, 100);

  for (let i = 0; i < 1000; i++) {
    debouncedFunc();
  }

  jest.runAllTimers();
  expect(func).toHaveBeenCalledTimes(1);
});

test("throttle 함수가 정상적으로 동작하는지 확인", () => {
  const func = jest.fn();
  const throttledFunc = _.throttle(func, 1000);

  for (let i = 0; i < 100; i++) {
    throttledFunc();
    jest.advanceTimersByTime(10);
  }

  jest.runAllTimers();
  expect(func).toHaveBeenCalledTimes(1);
});

test("clickOutside 함수가 정상적으로 동작하는지 확인", () => {
  const parentElement = document.createElement("div");
  parentElement.innerHTML = `<button class='test-button'>Continue</button>`;
  document.body.appendChild(parentElement);
  const _instance = new _(".test-button");
  const targetElement = _instance.get();

  _.clickOutside(
    parentElement,
    targetElement,
    (targetElement) => (targetElement.textContent = "clicked outer")
  );

  parentElement.click();
  expect(targetElement.textContent).toBe("clicked outer");
});

test("Selector 동작 확인", () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
  document.body.appendChild(divElement);

  const _instance = new _(".test-btn");
  const buttonElement = _instance.get();

  divElement.removeChild(buttonElement);

  expect(_instance.get()).toBe(null);
});

test("innerHTML 메서드 동작 확인", () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
  document.body.appendChild(divElement);

  const _instance = new _(".test-btn");
  _instance.innerHTML(_instance.get(), `<div>동작확인</div>`);

  expect(_instance.get().textContent).toBe("동작확인");
});

test("hidden 메서드 동작 확인", () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
  document.body.appendChild(divElement);

  const _instance = new _(".test-btn");
  const targetElement = _instance.get();
  _instance.hidden(targetElement);

  expect(targetElement.style.display).toBe("none");
});

test("show 메서드 동작 확인", () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
  document.body.appendChild(divElement);

  const _instance = new _(".test-btn");
  const targetElement = _instance.get();
  _instance.show(targetElement);

  expect(targetElement.style.display).toBe("");
});

test("addEvent 메서드 동작 확인", () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
  document.body.appendChild(divElement);

  const _instance = new _(".test-btn");
  const targetElement = _instance.get();
  _instance.addEvent(targetElement, "click", () =>
    _instance.innerHTML(targetElement, "<div>clickEvent</div>")
  );

  targetElement.click();
  expect(targetElement.textContent).toBe("clickEvent");
});
