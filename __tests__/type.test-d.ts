/**
 * @jest-environment jsdom
 */
import { expectType } from 'tsd';

import _ from '../dist';

_('.button').addEvent('click', function (event) {
  expectType<MouseEvent>(event);
});
