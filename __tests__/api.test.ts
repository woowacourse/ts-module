/**
 * @jest-environment jsdom
 */
import tt from "../src";

describe("기본 모듈 정의 테스트", () => {
  test("모듈은 기본 내보내기", () => {
    expect(tt).toBeTruthy();
  });

  test("모듈에 포함된 함수 확인", () => {
    expect(typeof tt.fetch).toBe("function");
    expect(typeof tt.isNull).toBe("function");
    expect(typeof tt.isNil).toBe("function");
    expect(typeof tt.isNumber).toBe("function");
    expect(typeof tt.isFunction).toBe("function");
    expect(typeof tt.shuffle).toBe("function");
    expect(typeof tt.pick).toBe("function");
    expect(typeof tt.omit).toBe("function");
    expect(typeof tt.memoize).toBe("function");
    expect(typeof tt.debounce).toBe("function");
    expect(typeof tt.throttle).toBe("function");
    expect(typeof tt.clickOutside).toBe("function");
  });

  test("모듈 호출시 포함된 메서드 확인", () => {
    const calledTt = tt("div");
    expect(typeof calledTt.innerHTML).toBe("function");
    expect(typeof calledTt.show).toBe("function");
    expect(typeof calledTt.hidden).toBe("function");
    expect(typeof calledTt.addEvent).toBe("function");
  });
});

describe("모듈 호출(selector) 동작 테스트", () => {
  const divElement = document.createElement("div");
  const selector = "button";

  beforeAll(() => {
    divElement.innerHTML = `<button>Continue</button>`;
    document.body.appendChild(divElement);
  });

  afterAll(() => {
    document.body.removeChild(divElement);
  });

  test("selector로 호출했을 때 element에 요소가 담겨야 한다.", () => {
    const buttonTt = tt(selector);
    expect(buttonTt.element).toBeTruthy();
  });

  test("innerHTML 메서드를 호출했을 때 element의 innerHTML이 바뀌어야 한다.", () => {
    const str = "hihi";
    const buttonTt = tt(selector);
    buttonTt.innerHTML(str);

    expect(buttonTt.element?.innerHTML).toBe(str);
  });

  test("show 메서드를 호출했을 때 element의 className이 show여야 한다.", () => {
    const buttonTt = tt(selector);
    buttonTt.show();

    expect(buttonTt.element?.className).toBe("show");
  });

  test("hidden 메서드를 호출했을 때 element의 className이 hidden이어야 한다.", () => {
    const buttonTt = tt(selector);
    buttonTt.hidden();

    expect(buttonTt.element?.className).toBe("hidden");
  });
});

describe("모듈 메서드 테스트", () => {
  test("isNull ", () => {
    expect(tt.isNull(null)).toBe(true);
    expect(tt.isNull(undefined)).toBe(false);
    expect(tt.isNull("hi")).toBe(false);
    expect(tt.isNull(0)).toBe(false);
    expect(tt.isNull({})).toBe(false);
    expect(tt.isNull([])).toBe(false);
    expect(tt.isNull(() => {})).toBe(false);
  });

  test("isNil ", () => {
    expect(tt.isNil(null)).toBe(true);
    expect(tt.isNil(undefined)).toBe(true);
    expect(tt.isNil("hi")).toBe(false);
    expect(tt.isNil(0)).toBe(false);
    expect(tt.isNil({})).toBe(false);
    expect(tt.isNil([])).toBe(false);
    expect(tt.isNil(() => {})).toBe(false);
  });

  test("isNumber ", () => {
    expect(tt.isNumber(null)).toBe(false);
    expect(tt.isNumber(undefined)).toBe(false);
    expect(tt.isNumber("hi")).toBe(false);
    expect(tt.isNumber(0)).toBe(true);
    expect(tt.isNumber({})).toBe(false);
    expect(tt.isNumber([])).toBe(false);
    expect(tt.isNumber(() => {})).toBe(false);
  });

  test("isFunction ", () => {
    expect(tt.isFunction(null)).toBe(false);
    expect(tt.isFunction(undefined)).toBe(false);
    expect(tt.isFunction("hi")).toBe(false);
    expect(tt.isFunction(0)).toBe(false);
    expect(tt.isFunction({})).toBe(false);
    expect(tt.isFunction([])).toBe(false);
    expect(tt.isFunction(() => {})).toBe(true);
  });

  test("shuffle ", () => {
    const arr = [1, 2, 3];
    expect(tt.shuffle(arr)).toEqual(expect.arrayContaining(arr));
  });

  test("pick ", () => {
    const obj = { 1: 1, 2: 2 };
    expect(tt.pick(obj, [1])).toEqual(expect.objectContaining({ 1: 1 }));
  });

  test("omit ", () => {
    const obj = { 1: 1, 2: 2 };
    expect(tt.omit(obj, [1])).toEqual(expect.objectContaining({ 2: 2 }));
  });

  test("memoize ", () => {
    const func = () => "hi";
    expect(tt.memoize(func)()).toBe(func());
  });
});
