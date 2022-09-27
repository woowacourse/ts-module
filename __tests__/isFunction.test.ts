import _ from '../src';
import { expectType } from 'tsd';
import { getAllTypesValues, omitTypesValues } from '../src/utils/resources';

const value_is_function = function () {},
  values_is_not_function = omitTypesValues(['Function']),
  values_all_type = getAllTypesValues();

describe('isFunction() 함수 테스트', () => {
  test('모듈로 불러온 isFunction은 함수여야한다.', () => {
    expect(typeof _.isFunction).toBe('function');
  });

  test('isFunction의 인자의 타입이 function일 경우, true를 반환한다.', () => {
    expect(_.isFunction(value_is_function)).toBe(true);
  });

  test('isFunction의 인자의 타입이 function가 아닐 경우, false를 반환한다.', () => {
    values_is_not_function.map((value) =>
      expect(_.isFunction(value)).toBe(false)
    );
  });

  test('isFunction의 반환타입은 boolean이다.', () => {
    values_all_type.map((value) => expectType<boolean>(_.isFunction(value)));
  });
});
