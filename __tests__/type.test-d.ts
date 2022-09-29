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

expectType<Promise<Response>>(_.fetch('https://dallog.me'));

expectType<boolean>(_.isNull(null));

expectType<boolean>(_.isNil(null));
expectType<boolean>(_.isNil(undefined));

expectType<boolean>(_.isNumber(508));

expectType<boolean>(_.isFunction(() => {}));

expectType<number[]>(_.shuffle<number>([1, 2, 3]));
expectType<string[]>(_.shuffle<string>(['ㄱ', 'ㄴ', 'ㄷ']));
expectType<object[]>(
  _.shuffle<object>([{ 1: 'ㄱ' }, { 2: 'ㄴ' }, { 3: 'ㄷ' }])
);

expectType<Record<string, unknown>>(
  _.pick({ name: '티거', age: 3, field: 'fe' }, 'name | age')
);

expectType<Record<string, unknown>>(
  _.omit({ name: '티거', age: 3, field: 'fe' }, 'name | age')
);
