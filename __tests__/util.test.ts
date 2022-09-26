import _ from '../src';

test('isNull 동작 확인', () => {
  expect(_.isNull(null)).toBe(true);
  expect(_.isNull(undefined)).toBe(false);
});

test('isNill 동작 확인', () => {
  expect(_.isNil(null)).toBe(true);
  expect(_.isNil(undefined)).toBe(true);
  expect(_.isNil('hello')).toBe(false);
});

test('isNumber 동작 확인', () => {
  expect(_.isNumber(null)).toBe(false);
  expect(_.isNumber('hello')).toBe(false);
  expect(_.isNumber(1)).toBe(true);
});

test('isFunction 동작 확인', () => {
  expect(_.isFunction(null)).toBe(false);
  expect(_.isFunction('hello')).toBe(false);
  expect(_.isFunction(1)).toBe(false);
  expect(_.isFunction(() => {})).toBe(true);
});
