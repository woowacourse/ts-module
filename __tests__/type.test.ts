/**
 * @jest-environment jsdom
 */
import { expectType } from 'tsd';

import _ from '../src';

/**
 * FUNCTION TEST
 */
expectType<SelectedElement>(_(''));
expectType<void>(_('').show());
expectType<void>(_('')._hidden());
expectType<string>(_('')._innerHTML());
expectType<void>(_('').addEvent('click', () => {}));

/**
 * MODULE TEST
 */
expectType<Promise<Response>>(_.fetch(''));
expectType<boolean>(_.isNull(null));
expectType<boolean>(_.isNil({}));
expectType<boolean>(_.isNumber(1));
expectType<boolean>(_.isFunction(() => {}));
expectType<Array<string | number>>(_.shuffle([1, 2, '3', 4, 5]));
expectType<Pick<{ a: 'a'; b: 'b' }, 'a'>>(_.pick({ a: 'a', b: 'b' }, 'a'));
expectType<Omit<{ a: 'a'; b: 'b' }, 'a'>>(_.omit({ a: 'a', b: 'b' }, 'a'));
expectType<Function>(_.memoize(() => {}));
expectType<Function>(_.debounce(() => {}, 3000));
expectType<Function>(_.throttle(() => {}, 3000));
expectType<boolean>(
  _.clickOutside(document.createElement('div'), document.createElement('div'))
);
