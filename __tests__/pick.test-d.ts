import { expectType } from 'tsd';
import _ from '../index';

const obj = {
  name: 'al-bur',
  age: 29,
  job: 'frontend',
  hobby: 'music',
};

expectType<{ name: string }>(_.pick(obj, 'name'));
expectType<{ age: number }>(_.pick(obj, 'age'));
expectType<{ job: string }>(_.pick(obj, 'job'));
expectType<{ name: string; age: number }>(_.pick(obj, ['name', 'age']));

const readOnlyObj = {
  name: 'al-bur',
  age: 29,
  job: 'frontend',
  hobby: 'music',
} as const;

expectType<{ readonly job: 'frontend' }>(_.pick(readOnlyObj, 'job'));
expectType<{ readonly name: 'al-bur'; readonly age: 29 }>(
  _.pick(readOnlyObj, ['name', 'age'])
);
