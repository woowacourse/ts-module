import _ from '../src';

jest.useFakeTimers();
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

test('omit 동작 확인', () => {
  expect(_.omit({ a: 1, b: 2, c: 3 }, 'a', 'b')).toStrictEqual({
    c: 3,
  });
});

test('memoized 동작 확인', () => {
  console.log = jest.fn();
  const testFunc = () => {
    console.log('hi');
    return 'hi';
  };
  const memoizedFunc = _.memoize(testFunc);
  memoizedFunc();
  memoizedFunc();
  memoizedFunc();
  expect(console.log).toHaveBeenCalledTimes(1);
});

test('debounce 동작 확인', () => {
  console.log = jest.fn();

  const testFunc = () => {
    console.log('hi');
  };

  const debounceFunc = _.debounce(testFunc, 2000);
  for (let i = 0; i < 100; i++) {
    debounceFunc();
  }
  expect(console.log).toHaveBeenCalledTimes(0);
  jest.advanceTimersByTime(2000);
  expect(console.log).toHaveBeenCalledTimes(1);
});
