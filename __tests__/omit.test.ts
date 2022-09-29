import _ from '../src/_';
import { allTypes } from '../src/res';
import getObjectValues from '../src/utils/getObjectValues';

const values_is_object = { a: 1, b: 2, c: 3 },
  keys = ['a', 'c'],
  values_is_not_object = getObjectValues(_.omit(allTypes, ['Object'])),
  values_is_not_array = getObjectValues(_.omit(allTypes, ['Array']));

describe('omit() 함수 테스트', () => {
  test('모듈로 불러온 omit은 함수여야한다.', () => {
    expect(typeof _.omit).toBe('function');
  });

  test('omit의 object 인자의 타입이 생성된 객체가 아닌 경우, 에러를 반환한다.', () => {
    values_is_not_object.map((value) => {
      expect(() => _.omit(value as any, keys as any)).toThrow(
        'omit(object, keys) - object의 타입이 Object가 아닙니다.'
      );
    });
  });

  test('omit의 keys 인자가 배열이 아닌 경우, 에러를 반환한다.', () => {
    values_is_not_array.map((value) => {
      expect(() => _.omit(values_is_object as any, value as any)).toThrow(
        'omit(object, keys) - keys의 타입이 Array가 아닙니다.'
      );
    });
  });

  test('omit의 반환값은 새로운 객체이어야 한다.', () => {
    expect(values_is_object).not.toBe(_.omit(values_is_object, ['a']));
  });

  test('omit은 keys에 해당하는 프로퍼티를 제외한 객체를 반환한다.', () => {
    expect(_.omit({ a: 1, b: 2, c: 3 }, ['a', 'c'])).toEqual({ b: 2 });
  });
});
