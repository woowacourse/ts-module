/**
 * @jest-environment jsdom
 */
import _ from "../src/index";

test("모듈은 기본 내보내기", () => {
  expect(_).toBeTruthy();
});

test("isNull test", () => {
  expect(_.isNull("sss")).toBe(false);
  expect(_.isNull("")).toBe(true);
});

test("isNill test", () => {
  expect(_.isNil("sss")).toBe(false);
  expect(_.isNil("")).toBe(true);
});

test("isNumber test", () => {
  expect(_.isNumber("sss")).toBe(false);
  expect(_.isNumber(2)).toBe(true);
});

test("isFunction test", () => {
  expect(_.isFunction("sss")).toBe(
    false
  );
  expect(
    _.isFunction(() => {
      console.log("함수");
    })
  ).toBe(true);
});

test("모듈에 포함된 pick 함수 확인", () => {
  expect(
    _.pick({ a: "1", b: "2" }, ["a"])
  ).toBe({ a: "1" });
});

test("모듈에 포함된 omit 함수 확인", () => {
  expect(
    _.omit({ a: "1", b: "2" }, ["a"])
  ).toBe({ b: "2" });
});

// test("Selector 동작 확인", () => {
//   const divElement =
//     document.createElement("div");
//   divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
//   document.body.appendChild(divElement);

//   const buttonElement = _(
//     "button.test-btn"
//   );
//   expect(buttonElement).toBeTruthy();

//   //   document.body.removeChild(
//   //     buttonElement
//   //   );
// });

// test('`_("").innerHTML()`~~~~', () => {});

// test('`_("").show()`~~~~', () => {});

// test('`_("").hidden()`~~~~', () => {});

// test('`_("").addEvent()`~~~~', () => {});
