/**
 * @jest-environment jsdom
 */
import { expectType } from 'tsd';

import _ from '../src';

test('addEvent 타입확인', () => {
  _('.button').addEvent('click', function (event) {
    expectType<MouseEvent>(event);
  });
});

test('fetch Type 테스트', () => {
  global.window.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ test: 100 }),
    })
  ) as jest.Mock;

  expectType<Promise<Response>>(_.fetch('helloWorld.com'));
});
