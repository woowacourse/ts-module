import { expectType } from 'tsd';
import _ from '../src';
import { omitTypesValues } from '../src/utils/resources';

const values_is_array = [1, 2, 3];
const values_is_not_array = omitTypesValues(['Array']);

describe('shuffle() 함수 테스트', () => {
  test('모듈로 불러온 shuffle은 함수여야한다.', () => {
    expect(typeof _.shuffle).toBe('function');
  });

  test('shuffle의 인자가 배열이 아닌 경우, 에러를 반환한다.', () => {
    values_is_not_array.map((value) => {
      expect(() => _.shuffle(value as readonly unknown[])).toThrow(
        'value의 타입이 Array가 아닙니다.'
      );
    });
  });

  test('shuffle의 반환값은 새로운 배열이어야 한다.', () => {
    expect(values_is_array).not.toBe(_.shuffle(values_is_array));
  });

  test('shuffle의 반환타입은 인자의 타입과 동일한 타입이다.', () => {
    const returnValue = _.shuffle(values_is_array);

    expectType<typeof values_is_array>(returnValue);
  });
});
