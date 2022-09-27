import { expectType } from 'tsd';
import _ from './../index';

const obj = {
  name: 'al-bur',
  age: 29,
  job: 'frontend',
  hobby: 'music',
};

// NOTE: typescript에서 제공하는 Omit 유틸타입으로 반환 타입을 지정해줘도 되었겠지만,
// 명시적으로 어떤 상황이 벌어지는 지 보여주기 위해 일일이 객체에서 타입을 보여주었습니다.
expectType<{ age: number; job: string; hobby: string }>(_.omit(obj, 'name'));
expectType<{ name: string; job: string; hobby: string }>(_.omit(obj, 'age'));
expectType<{ name: string; age: number; hobby: string }>(_.omit(obj, 'job'));
expectType<{ job: string; hobby: string }>(_.omit(obj, ['name', 'age']));

const readOnlyObj = {
  name: 'al-bur',
  age: 29,
  job: 'frontend',
  hobby: 'music',
} as const;

expectType<{
  readonly name: 'al-bur';
  readonly age: 29;
  readonly hobby: 'music';
}>(_.omit(readOnlyObj, 'job'));
expectType<{ readonly job: 'frontend'; readonly hobby: 'music' }>(
  _.omit(readOnlyObj, ['name', 'age'])
);
