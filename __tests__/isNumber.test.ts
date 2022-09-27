import { expectType } from 'tsd';
import _ from '../src';
import { getAllTypesValues, omitTypesValues } from '../src/utils/resources';

const value_is_number = Number(),
  values_is_not_number = omitTypesValues(['number']),
  values_all_type = getAllTypesValues();

describe('isNumber() 함수 테스트', () => {
  test('모듈로 불러온 isNumber은 함수여야한다.', () => {
    expect(typeof _.isNumber).toBe('function');
  });

  test('isNumber의 인자의 타입이 number일 경우, true를 반환한다.', () => {
    expect(_.isNumber(value_is_number)).toBe(true);
  });

  test('isNumber의 인자의 타입이 number가 아닐 경우, false를 반환한다.', () => {
    values_is_not_number.map((value) => expect(_.isNumber(value)).toBe(false));
  });

  test('isNumber의 반환타입은 boolean이다.', () => {
    values_all_type.map((value) => expectType<boolean>(_.isNumber(value)));
  });
});
