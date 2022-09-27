import _ from "../src";

test("모듈은 기본 내보내기를 테스트한다.", () => {
  expect(_).toBeTruthy();
});

test("모듈에 포함된 함수를 확인한다.", () => {
  expect(typeof _.fetch).toBe("function");
});

test("모듈에 포함된 함수를 확인한다.", () => {
  expect(typeof _.pick).toBe("function");
});

test("모듈에 포함된 함수를 확인한다.", () => {
  expect(typeof _.omit).toBe("function");
});
