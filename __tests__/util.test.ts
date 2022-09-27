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

test('shuffle 동작 확인', () => {
  global.Math.random = jest.fn(() => 0.1) as jest.Mock;
  expect(_.shuffle([1, 2, 3])).toStrictEqual([3, 2, 1]);
  expect(_.shuffle({ a: 1, b: 2, c: 3 })).toStrictEqual([3, 2, 1]);
});

test('pick 동작 확인', () => {
  expect(_.pick({ a: 1, b: 2, c: 3 }, 'a', 'b')).toStrictEqual({
    a: 1,
    b: 2,
  });
});
