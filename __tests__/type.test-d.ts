/**
 * @jest-environment jsdom
 */
import { expectType } from 'tsd';

import _ from '../dist';

expectType<HTMLElement>(_('.div').getElement());

expectType<string>(_('.div').innerHTML());

expectType<void>(_('.div').show());

expectType<void>(_('.div').hidden());

_('.button').addEvent('click', function (event) {
  expectType<MouseEvent>(event);
});
