import { expectType } from 'tsd';
import _ from '../../dist/';

// isNull 타입 테스트
expectType<boolean>(_.isNull(null));

// isNil 타입 테스트
expectType<boolean>(_.isNil(null));

// isNumber 타입 테스트
expectType<boolean>(_.isNumber(123));

// isFunction 타입 테스트
expectType<boolean>(_.isFunction(() => {}));

// shuffle 타입 테스트
expectType<Array<number>>(_.shuffle([5, 3, 1, 2, 4]));
expectType<Array<number | string>>(_.shuffle(['5', 3, 1, 2, 4]));
expectType<Array<number>>(
  _.shuffle({
    a: 1,
    b: 2,
    c: 5,
    d: 4,
    e: 3,
  }),
);

// pick 타입 테스트
const pickTest = {
  a: 1,
  b: 2,
  c: 5,
  d: 4,
  e: 3,
};

const pickExpectedResult = {
  a: 1,
  d: 4,
};

expectType<typeof pickExpectedResult>(_.pick(pickTest, ['a', 'd']));

// omit 타입 테스트
const omitTest = {
  a: 1,
  b: 2,
  c: 5,
  d: 4,
  e: 3,
};

const omitExpectedResult = {
  a: 1,
  d: 4,
};

expectType<typeof omitExpectedResult>(_.omit(omitTest, ['b', 'c', 'e']));
