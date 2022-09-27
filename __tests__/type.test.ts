/**
 * @jest-environment jsdom
 */
import { expectType } from 'tsd';

import _ from '../src';

// expectType<Promise<Response>>(_.fetch(''));

// _('.button').addEvent('click', function (event) {
// 	expectType<MouseEvent>(event);
// });

test('isNull type check', () => {
  expectType<Boolean>(_.isNull());
});

test('isNill type check', () => {
  expectType<Boolean>(_.isNil());
});

test('isNumber type check', () => {
  expectType<Boolean>(_.isNumber());
});

test('isFunction type check', () => {
  expectType<Boolean>(_.isFunction());
});

test('shuffle 동작 확인', () => {
  const array = [1, 2, 3];
  expectType<number[]>(_.shuffle(array));
});

test('pick type check', () => {
  const object = {
    a: 1,
    b: 2,
    c: 3,
  };

  expectType<Record<string, unknown>>(_.pick(object, ['a']));
});

test('omit type check', () => {
  const object = {
    a: 1,
    b: 2,
    c: 3,
  };

  expectType<Record<string, unknown>>(_.omit(object, ['a']));
});

test('memoize type check', () => {
  const func = (arg1, arg2) => `${arg1} ${arg2}`;

  expectType<{ (arg1: any, arg2: any): string; cache: Map<any, any> }>(_.memoize(func));
});
