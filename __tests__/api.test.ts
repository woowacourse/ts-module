/**
 * @jest-environment jsdom
 */
import _ from "../src";

describe("_.fetch", () => {
  test("fetch이 모듈에 포함되어잇다.", () => {
    expect(typeof _.fetch).toBe("function");
  });
});

describe("_.isNull", () => {
  test("isNull이 false를 리턴한다.", () => {
    expect(_.isNull(1)).toBe(false);
  });

  test("isNull이 true를 리턴한다.", () => {
    expect(_.isNull(null)).toBe(true);
  });
});

describe("_.isNil", () => {
  test("isNil이 false를 리턴한다.", () => {
    expect(_.isNil(1)).toBe(false);
  });

  test("isNil이 true를 리턴한다.", () => {
    expect(_.isNil(null)).toBe(true);
    expect(_.isNil(undefined)).toBe(true);
  });
});

describe("_.isNumber", () => {
  test("isNumber가 false를 리턴한다.", () => {
    expect(_.isNumber(null)).toBe(false);
    expect(_.isNumber(undefined)).toBe(false);
    expect(_.isNumber("string")).toBe(false);
    expect(_.isNumber({})).toBe(false);
    expect(_.isNumber([1, 3, 4])).toBe(false);
    expect(_.isNumber(1 + "2")).toBe(false);
    expect(_.isNumber(9 / 0)).toBe(false);
  });

  test("isNumber가 true를 리턴한다.", () => {
    expect(_.isNumber(122)).toBe(true);
  });
});

describe("_.isFunction", () => {
  test("isFunction이 false를 리턴한다.", () => {
    expect(_.isFunction(1)).toBe(false);
    expect(_.isFunction(null)).toBe(false);
    expect(_.isFunction([])).toBe(false);
    expect(_.isNumber({})).toBe(false);
  });

  test("isFunction이 true를 리턴한다.", () => {
    expect(_.isFunction(() => {})).toBe(true);
  });
});

describe("_.shuffle", () => {
  test("shuffle이 모듈에 포함되어잇다.", () => {
    expect(typeof _.shuffle).toBe("function");
  });
});

describe("_.pick", () => {
  test("pick이 {num:'12'}를 리턴한다.", () => {
    expect(_.pick({ num: "12" }, "num")).toStrictEqual({ num: "12" });
  });

  test("pick이 {name: 'H', age: '23}를 리턴한다.", () =>
    expect(_.pick({ name: "H", age: "23" }, ["name", "age"])).toStrictEqual({
      name: "H",
      age: "23",
    }));
});

describe("_.omit", () => {
  test("omit이 {n:'1'}를 리턴한다.", () => {
    expect(_.omit({ num: "12", n: "1" }, "num")).toStrictEqual({ n: "1" });
  });

  test("omit이 {age: '23}를 리턴한다.", () => {
    expect(
      _.omit({ name: "H", age: "23", ID: "1" }, ["name", "ID"])
    ).toStrictEqual({
      age: "23",
    });
  });
});

describe("_.debounce", () => {
  test("fetch이 모듈에 포함되어잇다.", () => {
    expect(typeof _.fetch).toBe("function");
  });
});

describe("_.throttle", () => {
  test("fetch이 모듈에 포함되어잇다.", () => {
    expect(typeof _.fetch).toBe("function");
  });
});

test("Selector 동작 확인", () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
  document.body.appendChild(divElement);

  const buttonElement = _("button.test-btn").element;
  expect(buttonElement).toBeTruthy();

  if (buttonElement) {
    divElement.removeChild(buttonElement);
  }
});

test('_("").innerHTML() 동작확인', () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
  const buttonElement = _("button.test-btn").element;

  if (buttonElement) {
    expect(_("button.test-btn").innerHTML()).toBe("Continue");
  }
});

test('_("").show() 동작확인', () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
  const buttonElement = _("button.test-btn").element;

  if (buttonElement) {
    _("button.test-btn").show();
    expect(buttonElement.style.display).toBe("block");
  }
});

test('_("").hidden() 동작확인', () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
  const buttonElement = _("button.test-btn").element;

  if (buttonElement) {
    _("button.test-btn").hidden();
    expect(buttonElement.style.display).toBe("");
  }
});
