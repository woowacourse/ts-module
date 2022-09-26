import { expectType } from 'tsd';
import _ from './../index';

expectType<number[]>(_.shuffle([1, 2, 3]));
expectType<string[]>(_.shuffle(['1', '2', '3']));
expectType<(number | string)[]>(_.shuffle(['1', 2, '3']));
expectType<(number | string)[]>(_.shuffle(['1', 2, '3']));
expectType<(number | string | null)[]>(_.shuffle([null, 2, '3']));
expectType<(string[] | number[])[]>(
  _.shuffle([
    [1, 2, 3],
    ['1', '2'],
  ])
);
