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
