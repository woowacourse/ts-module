import { expectAssignable, expectType } from 'tsd';
import _ from '../../build';

/** _.fetch */
_.fetch<{ a: 1 }>('abc')
  .then(res => res.json())
  .then(abc => expectType<{ a: 1 }>(abc));

/** _.is~ */
expectType<boolean>(_.isNull(null));
expectType<boolean>(_.isNil(null));
expectType<boolean>(_.isNumber(null));
expectType<boolean>(_.isFunction(null));

/** _.shuffle */
expectType<number[]>(_.shuffle([1, 2, 3]));
expectType<string[]>(_.shuffle(['1', '2', '3']));
expectType<(string | number)[]>(_.shuffle(['1', '2', 3]));

/** _.pick */
expectType<{ a: number; c: number }>(_.pick({ a: 1, b: '2', c: 3 }, 'a', 'c'));
expectType<{ readonly a: 1; readonly c: 3 }>(_.pick({ a: 1, b: '2', c: 3 } as const, 'a', 'c'));

/** @TODO: readonly 가 생성되고 안되는 것의 차이 */

/** _.omit */
expectType<{ b: string }>(_.omit({ a: 1, b: '2', c: 3 }, 'a', 'c'));
expectType<{ b: '2' }>(_.omit({ a: 1, b: '2', c: 3 } as const, 'a', 'c'));

/** _.debounce */
{
  type TempFunction = (param: string) => void;
  const func: TempFunction = param => {};

  const debouncedFunc = _.debounce(func, 200);

  expectAssignable<TempFunction>(debouncedFunc);
}

/** _.throttle */
{
  type TempFunction = (param: string) => void;
  const func: TempFunction = param => {};

  const throttledFunc = _.throttle(func, 200);

  expectAssignable<TempFunction>(throttledFunc);
}

/** _ */
_('asdf').addEvent('click', event => {
  expectType<HTMLElementEventMap['click']>(event);
});
