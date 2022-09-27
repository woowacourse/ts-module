/**
 * @jest-environment jsdom
 */
import _ from "../src";

describe("1. 모듈의 기본 구성을 테스트한다.", () => {
  test("모듈이 존재한다.", () => {
    expect(_).toBeTruthy();
  });

  test("모듈에 포함된 함수에 접근할 수 있다.", () => {
    expect(typeof _.fetch).toBe("function");
    expect(typeof _.pick).toBe("function");
    expect(typeof _.omit).toBe("function");
  });
});

describe("2. Selector 및 Element의 확장된 메서드를 테스트한다.", () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
  document.body.appendChild(divElement);
  const buttonElement = _("button.test-btn");

  test("Selector로 요소를 선택하고 삭제할 수 있다.", () => {
    expect(buttonElement).toBeTruthy();

    document.body.childNodes[0].removeChild(buttonElement);
  });

  test("html 매서드로 요소의 innerHTML에 접근하고 수정할 수 있다.", () => {
    expect(buttonElement.html()).toEqual("Continue");
    buttonElement.html("stop");
    expect(buttonElement.html()).toEqual("stop");
  });

  test("show/hide 매서드로 요소를 숨기고 표시할 수 있다.", () => {
    buttonElement.hide();

    expect(buttonElement.style.display).toEqual("hidden");
    buttonElement.show();

    expect(buttonElement.style.display).toEqual("block");
  });

  test("addEvent 매서드로 이벤트 리스너를 부착할 수 있다.", () => {
    const mockCallback = jest.fn();

    buttonElement.addEvent("click", mockCallback);
    buttonElement.click();

    expect(mockCallback).toBeCalled();
  });
});

describe("3. 모듈에 포함된 함수의 동작을 테스트한다.", () => {
  test("fetch 함수로 비동기 통신을 통해 데이터를 받을 수 있다.", async () => {
    const response = await _.fetch(
      "https://jsonplaceholder.typicode.com/posts/1",
      "GET"
    );
    expect(response).not.toEqual(undefined);
    expect(response).not.toEqual(null);
  });

  test("isNull 함수로 인자가 null인지 파악할 수 있다.", () => {
    expect(_.isNull(null)).toEqual(true);
    expect(_.isNull(undefined)).toEqual(false);
    expect(_.isNull(1)).toEqual(false);
    expect(_.isNull("one")).toEqual(false);
    expect(_.isNull(() => {})).toEqual(false);
  });

  test("isNil 함수로 인자가 null 혹은 undefined인지 파악할 수 있다.", () => {
    expect(_.isNil(null)).toEqual(true);
    expect(_.isNil(undefined)).toEqual(true);
    expect(_.isNil(1)).toEqual(false);
    expect(_.isNil("one")).toEqual(false);
    expect(_.isNil(() => {})).toEqual(false);
  });

  test("isNumber 함수로 인자가 number인지 파악할 수 있다.", () => {
    expect(_.isNumber(null)).toEqual(false);
    expect(_.isNumber(undefined)).toEqual(false);
    expect(_.isNumber(1)).toEqual(true);
    expect(_.isNumber("one")).toEqual(false);
    expect(_.isNumber(() => {})).toEqual(false);
  });

  test("isFunction 함수로 인자가 function인지 파악할 수 있다.", () => {
    expect(_.isFunction(null)).toEqual(false);
    expect(_.isFunction(undefined)).toEqual(false);
    expect(_.isFunction(1)).toEqual(false);
    expect(_.isFunction("one")).toEqual(false);
    expect(_.isFunction(() => {})).toEqual(true);
  });

  test("shuffle 함수로 배열 혹은 객체의 요소를 섞을 수 있다.", () => {
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

  test("pick 함수로 객체에서 선택한 요소만 추출해 새로운 객체를 만들 수 있다.", () => {
    const testObject = { a: 1, b: 2, c: 2 };
    const testProps: Partial<keyof typeof testObject>[] = ["a", "b"];

    expect(_.pick(testObject, testProps)).toEqual({ a: 1, b: 2 });
  });
  test("omit 함수로 객체에서 선택한 요소만 제거한 새로운 객체를 만들 수 있다.", () => {
    const testObject = { a: 1, b: 2, c: 2 };
    const testProps: Partial<keyof typeof testObject>[] = ["a", "b"];

    expect(_.omit(testObject, testProps)).toEqual({ c: 2 });
  });

  test("memoize 함수로 resolver가 없을 때 함수의 반환 결과를 캐시할 수 있다.", () => {
    const testObject = { a: 1, b: 2 };

    const memoizedValue = _.memoize((obj: Record<string, unknown>) =>
      Object.values(obj)
    );

    const initial = memoizedValue(testObject);
    testObject.a = 3;

    expect(memoizedValue(testObject)).toStrictEqual(initial);
  });

  test("memoize 함수로 resolver가 있을 때 함수의 반환 결과를 캐시할 수 있다.", () => {
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
  test("debounce 함수로 함수의 실행을 debounce 할 수 있다.", () => {
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

  test("throttle 함수로 함수의 실행을 throttle 할 수 있다.", () => {
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

  test("clickOutside 함수로 대상 요소가 아닌 요소를 클릭했을 때 콜백함수를 작동시킬 수 있다.", () => {
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
