/**
 * @jest-environment jsdom
 */
import _ from "../src";

describe("모듈 내보내기 및 함수 테스트", () => {
  test("모듈은 기본 내보내기", () => {
    expect(_).toBeTruthy();
  });

  test("모듈에 포함된 함수 확인", () => {
    expect(typeof _.fetch).toBe("function");
  });

  test("모듈에 포함된 함수 확인", () => {
    expect(typeof _.isNull).toBe("function");
  });

  test("모듈에 포함된 함수 확인", () => {
    expect(typeof _.isNil).toBe("function");
  });

  test("모듈에 포함된 함수 확인", () => {
    expect(typeof _.isNumber).toBe("function");
  });

  test("모듈에 포함된 함수 확인", () => {
    expect(typeof _.isFunction).toBe("function");
  });

  test("모듈에 포함된 함수 확인", () => {
    expect(typeof _.shuffle).toBe("function");
  });

  test("모듈에 포함된 함수 확인", () => {
    expect(typeof _.pick).toBe("function");
  });

  test("모듈에 포함된 함수 확인", () => {
    expect(typeof _.omit).toBe("function");
  });

  test("모듈에 포함된 함수 확인", () => {
    expect(typeof _.memoize).toBe("function");
  });

  test("모듈에 포함된 함수 확인", () => {
    expect(typeof _.debounce).toBe("function");
  });

  test("모듈에 포함된 함수 확인", () => {
    expect(typeof _.throttle).toBe("function");
  });

  test("모듈에 포함된 함수 확인", () => {
    expect(typeof _.clickOutside).toBe("function");
  });
});

describe("function _ 동작 확인 테스트", () => {
  let selectedElement: HTMLElement;

  beforeEach(() => {
    const divElement = document.createElement("div");
    divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
    document.body.appendChild(divElement);

    selectedElement = _("button.test-btn").element;
  });

  afterEach(() => {
    selectedElement.remove();
  });

  test("Selector 동작 확인", () => {
    expect(selectedElement).toBeTruthy();
  });

  test('_("").innerHTML() 동작 확인', () => {
    _("button.test-btn").innerHTML(`<div id='domMorello'>TEST</div>`);

    expect(_("div#domMorello").element).toBeTruthy();
  });

  test('_("").show() 동작 확인', () => {
    _("button.test-btn").element.style.display = "none";
    _("button.test-btn").show();

    expect(selectedElement.style.display).toBe("block");
  });

  test('_("").hidden() 동작 확인', () => {
    _("button.test-btn").hidden();

    expect(selectedElement.style.display).toBe("none");
  });

  test('("").addEvent() 동작 확인', () => {
    _("button.test-btn").addEvent("click", () => {
      _("button.test-btn").hidden();
    });

    selectedElement.click();

    expect(selectedElement.style.display).toBe("none");
  });
});
