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
