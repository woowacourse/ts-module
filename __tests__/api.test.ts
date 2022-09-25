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
  test("Selector 동작 확인", () => {
    const divElement = document.createElement("div");
    divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
    document.body.appendChild(divElement);

    const buttonElement = _("button.test-btn");
    expect(buttonElement).toBeTruthy();

    document.body.childNodes[0].removeChild(buttonElement);
  });

  // test('`_("").innerHTML()`~~~~', () => {});

  // test('`_("").show()`~~~~', () => {});

  // test('`_("").hidden()`~~~~', () => {});

  // test('`_("").addEvent()`~~~~', () => {});
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
});
