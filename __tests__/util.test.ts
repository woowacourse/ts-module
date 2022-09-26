import _ from '../src';

test('isNull 동작 확인', () => {
  expect(_.isNull(null)).toBe(true);
  expect(_.isNull(undefined)).toBe(false);
});
