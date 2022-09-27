/**
 * @jest-environment jsdom
 */
import { expectType } from 'tsd';

import _ from '../src';

interface SelectedElement extends HTMLElement {
  _innerHTML: () => string;
  show: () => void;
  _hidden: () => void;
  addEvent: <T extends keyof HTMLElementEventMap>(
    event: T,
    eventHandler: (event: HTMLElementEventMap[T]) => void
  ) => void;
}

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
expectType<Partial<{ a: 'a'; b: 'b' }>>(_.pick({ a: 'a', b: 'b' }, 'a'));
expectType<Partial<{ a: 'a'; b: 'b' }>>(_.omit({ a: 'a', b: 'b' }, 'a'));
expectType<Function>(_.memoize(() => {}));
expectType<Function>(_.debounce(() => {}, 3000));
expectType<Function>(_.throttle(() => {}, 3000));
expectType<boolean>(
  _.clickOutside(document.createElement('div'), document.createElement('div'))
);
