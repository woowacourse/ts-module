import _ from '../src/_';
import { expectType } from 'tsd';
import { allTypes } from '../src/res';
import getObjectValues from '../src/utils/getObjectValues';

const value_is_null = null,
  value_is_undefined = undefined,
  values_is_not_null_or_undefined = getObjectValues(
    _.omit(allTypes, ['null', 'undefined'])
  ),
  values_all_types = getObjectValues(allTypes);

describe('isNill() 함수 테스트', () => {
  test('모듈로 불러온 isNil은 함수여야한다.', () => {
    expect(typeof _.isNil).toBe('function');
  });

  test('isNil의 인자가 null 혹은 undefined일 경우, true를 반환한다.', () => {
    expect(_.isNil(value_is_null)).toBe(true);
  });

  test('isNil의 인자가 undefined일 경우, true를 반환한다.', () => {
    expect(_.isNil(value_is_undefined)).toBe(true);
  });

  test('isNil의 인자가 null 혹은 undefined가 아닐 경우, false를 반환한다.', () => {
    values_is_not_null_or_undefined.map((value) =>
      expect(_.isNil(value)).toBe(false)
    );
  });

  test('isNil의 반환타입은 boolean이다.', () => {
    values_all_types.map((value) => expectType<boolean>(_.isNil(value)));
  });
});
