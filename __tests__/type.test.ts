import { expectType } from 'tsd';

import _ from '../src';

test('addEvent 타입확인', () => {
  _('.button').addEvent('click', function (event) {
    expectType<MouseEvent>(event);
  });
});

test('fetch 타입확인', () => {
  global.window.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ test: 100 }),
    })
  ) as jest.Mock;

  expectType<Promise<Response>>(_.fetch('helloWorld.com'));
});

test('isNull 타입확인', () => {
  expectType<boolean>(_.isNull('hi'));
});

test('isNill 타입 확인', () => {
  expectType<boolean>(_.isNil('hi'));
});

test('isNumber 타입 확인', () => {
  expectType<boolean>(_.isNumber('hello'));
});

test('isFunction 타입 확인', () => {
  expectType<boolean>(_.isFunction('hello'));
});

test('shuffle 타입확인', () => {
  expectType<Array<number>>(_.shuffle<number>([1, 2, 3]));
  expectType<Array<unknown>>(_.shuffle({ a: 1, b: 2 }));
  expectType<Array<unknown>>(_.shuffle(() => {}));
});
