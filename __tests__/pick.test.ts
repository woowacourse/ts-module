import _ from '../src';
import { omitTypesValues } from '../src/utils/resources';

const values_is_object = { a: 1, b: 2, c: 3 },
  values_is_not_object = omitTypesValues(['Object']),
  values_is_not_array = omitTypesValues(['Array']),
  keys = ['a', 'c'];

describe('pick() 함수 테스트', () => {
  test('모듈로 불러온 pick은 함수여야한다.', () => {
    expect(typeof _.pick).toBe('function');
  });

  test('pick의 object 인자의 타입이 생성된 객체가 아닌 경우, 에러를 반환한다.', () => {
    values_is_not_object.map((value) => {
      expect(() => _.pick(value as any, keys as any)).toThrow(
        'pick(object, keys) - object의 타입이 Object가 아닙니다.'
      );
    });
  });

  test('pick의 keys 인자가 배열이 아닌 경우, 에러를 반환한다.', () => {
    values_is_not_array.map((value) => {
      expect(() => _.pick(values_is_object as any, value as any)).toThrow(
        'pick(object, keys) - keys의 타입이 Array가 아닙니다.'
      );
    });
  });

  test('pick의 반환값은 새로운 객체이어야 한다.', () => {
    expect(values_is_object).not.toBe(_.pick(values_is_object, ['a']));
  });

  test('pick은 keys에 해당하는 프로퍼티만 가진 객체를 반환한다.', () => {
    expect(_.pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])).toEqual({ a: 1, c: 3 });
  });

  // test('pick의 반환타입은 인자의 타입과 동일한 타입이다.', () => {
  //   const returnValue = _.pick(values_is_object, keys);

  //   expectType<typeof values_is_object>(returnValue);
  // });
});
