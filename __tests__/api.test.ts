/**
 * @jest-environment jsdom
 */
import _ from "../src";

describe("기본 모듈 테스트", () => {
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
});

describe("Selector 및 Element 메서드 테스트", () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
  document.body.appendChild(divElement);
  const buttonElement = _("button.test-btn");
  test("Selector 동작 확인", () => {
    expect(buttonElement).toBeTruthy();

    document.body.childNodes[0].removeChild(buttonElement);
  });

  test("html 요소 매서드 동작 확인", () => {
    expect(buttonElement.html()).toEqual("Continue");
    buttonElement.html("stop");
    expect(buttonElement.html()).toEqual("stop");
  });

  test("show/hide 매서드 동작 확인", () => {
    buttonElement.hide();

    expect(buttonElement.style.display).toEqual("hidden");
    buttonElement.show();

    expect(buttonElement.style.display).toEqual("block");
  });

  test("addEvent 매서드 동작 확인", () => {
    const mockCallback = jest.fn();

    buttonElement.addEvent("click", mockCallback);
    buttonElement.click();

    expect(mockCallback).toBeCalled();
  });
});

describe("모듈 함수 동작 확인", () => {
  test("isNull 함수 동작 확인", () => {
    expect(_.isNull(null)).toEqual(true);
    expect(_.isNull(undefined)).toEqual(false);
    expect(_.isNull(1)).toEqual(false);
    expect(_.isNull("one")).toEqual(false);
    expect(_.isNull(() => {})).toEqual(false);
  });

  test("isNil 함수 동작 확인", () => {
    expect(_.isNil(null)).toEqual(true);
    expect(_.isNil(undefined)).toEqual(true);
    expect(_.isNil(1)).toEqual(false);
    expect(_.isNil("one")).toEqual(false);
    expect(_.isNil(() => {})).toEqual(false);
  });

  test("isNumber 함수 동작 확인", () => {
    expect(_.isNumber(null)).toEqual(false);
    expect(_.isNumber(undefined)).toEqual(false);
    expect(_.isNumber(1)).toEqual(true);
    expect(_.isNumber("one")).toEqual(false);
    expect(_.isNumber(() => {})).toEqual(false);
  });

  test("isFunction 함수 동작 확인", () => {
    expect(_.isFunction(null)).toEqual(false);
    expect(_.isFunction(undefined)).toEqual(false);
    expect(_.isFunction(1)).toEqual(false);
    expect(_.isFunction("one")).toEqual(false);
    expect(_.isFunction(() => {})).toEqual(true);
  });

  test("shuffle 함수 테스트", () => {
    const testArray = [1, 2, 3, 4, 5];
    const testObject = { a: 1, b: 2, c: "3" };

    const shuffledArray = _.shuffle(testArray);
    expect(shuffledArray).toEqual(expect.arrayContaining(testArray));
    expect(testArray).toEqual(expect.arrayContaining(shuffledArray));

    const shuffledObject = _.shuffle(testObject);
    expect(shuffledObject).toEqual(
      expect.arrayContaining(Object.values(testObject))
    );
    expect(Object.values(testObject)).toEqual(
      expect.arrayContaining(shuffledObject)
    );
  });

  test("pick 함수 테스트", () => {
    const testObject = { a: 1, b: 2, c: 2 };
    const testProps: Partial<keyof typeof testObject>[] = ["a", "b"];

    expect(_.pick(testObject, testProps)).toEqual({ a: 1, b: 2 });
  });
  test("omit 함수 테스트", () => {
    const testObject = { a: 1, b: 2, c: 2 };
    const testProps: Partial<keyof typeof testObject>[] = ["a", "b"];

    expect(_.omit(testObject, testProps)).toEqual({ c: 2 });
  });

  test("memoize 함수 테스트, resolver 없음", () => {
    const testObject = { a: 1, b: 2 };

    const memoizedValue = _.memoize((obj: Record<string, unknown>) =>
      Object.values(obj)
    );

    const initial = memoizedValue(testObject);
    testObject.a = 3;

    expect(memoizedValue(testObject)).toStrictEqual(initial);
  });

  test("memoize 함수 테스트, resolver 있음", () => {
    const testObject = { a: 1, b: 2 };

    const memoizedValue = _.memoize(
      (obj: Record<string, unknown>) => Object.values(obj),
      (obj) => JSON.stringify(obj)
    );

    const initial = memoizedValue(testObject);
    testObject.a = 3;

    expect(memoizedValue(testObject)).not.toStrictEqual(initial);
  });

  jest.useFakeTimers();
  test("debounce 함수 테스트", () => {
    const result: unknown[] = [];
    const debouncedPush = _.debounce((input) => {
      result.push(input);
    }, 1000);

    setTimeout(() => {
      debouncedPush("a");
    }, 200);
    setTimeout(() => {
      debouncedPush("b");
    }, 400);
    setTimeout(() => {
      debouncedPush("c");
    }, 600);
    setTimeout(() => {
      debouncedPush("d");
    }, 1300);

    jest.runAllTimers();

    expect(result).toStrictEqual(["d"]);
  });

  test("throttle 함수 테스트", () => {
    const result: unknown[] = [];
    const throttledPush = _.throttle((input) => {
      result.push(input);
    }, 1000);

    setTimeout(() => {
      throttledPush("a");
    }, 200);
    setTimeout(() => {
      throttledPush("b");
    }, 400);
    setTimeout(() => {
      throttledPush("c");
    }, 600);
    setTimeout(() => {
      throttledPush("d");
    }, 1300);

    jest.runAllTimers();

    expect(result).toStrictEqual(["a", "d"]);
  });

  test("clickOutside 함수 테스트", () => {
    const targetElement = document.createElement("button");
    const outsideElement = document.createElement("button");
    document.body.append(targetElement, outsideElement);

    const mockCallback = jest.fn();
    _.clickOutside(targetElement, mockCallback);

    targetElement.click();
    expect(mockCallback).not.toBeCalled();

    outsideElement.click();
    expect(mockCallback).toBeCalled();
  });
});
