/**
 * @jest-environment jsdom
 */
import { expectType } from 'tsd';
import _ from '../../src/index';
// import HolaType from 'levellog-util-types';

test('isNull 타입 테스트', () => {
  expectType<boolean>(_.isNull('undefined'));
});

test('isNil 타입 테스트', () => {
  expectType<boolean>(_.isNil('null'));
});

test('isNumber 타입 테스트', () => {
  expectType<boolean>(_.isNumber(123));
});

test('isFunction 타입 테스트', () => {
  expectType<boolean>(_.isFunction(() => {}));
});

test('shuffle 타입 테스트', () => {
  expectType<any[]>(_.shuffle([1, 2, 3]));
});

test('pick 타입 테스트', () => {
  expectType<Array<{ [props: string]: any }>>(_.pick(['a', 'b'], { a: 1, b: 2, c: 3, e: 4 }));
});

test('omit 타입 테스트', () => {
  expectType<Array<{ [props: string]: any }>>(_.omit(['a', 'b'], { a: 1, b: 2, c: 3, e: 4 }));
});

test('memoize 타입 테스트', <T>() => {
  expectType<T[]>(_.memoize<T>(() => {})());
});

test('debounce 타입 테스트', () => {
  expectType(_.debounce.action({ func: () => {} }));
});

test('throttle 타입 테스트', () => {
  expectType(_.throttle(() => {}, 100));
});
