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
