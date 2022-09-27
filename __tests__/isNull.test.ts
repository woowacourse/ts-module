import { expectType } from 'tsd';
import _ from '../src';
import { getAllTypesValues, omitTypesValues } from '../src/utils/resources';

const value_is_null = null;
const values_is_not_null = omitTypesValues(['null']),
  values_all_type = getAllTypesValues();

describe('isNull() 함수 테스트', () => {
  test('모듈로 불러온 isNull은 함수여야한다.', () => {
    expect(typeof _.isNull).toBe('function');
  });

  test('isNull의 인자가 null일 경우, true를 반환한다.', () => {
    expect(_.isNull(value_is_null)).toBe(true);
  });

  test('isNull의 인자가 null이 아닐 경우, false를 반환한다.', () => {
    values_is_not_null.map((value) => expect(_.isNull(value)).toBe(false));
  });

  test('isNull의 반환타입은 boolean이다.', () => {
    values_all_type.map((value) => expectType<boolean>(_.isNull(value)));
  });
});
