import { expectType } from 'tsd';
import _ from '../index';

expectType<boolean>(_.isNull(2));
expectType<boolean>(_.isNull('2'));
expectType<boolean>(_.isNull(true));
expectType<boolean>(_.isNull(null));
expectType<boolean>(_.isNull(undefined));
expectType<boolean>(_.isNull([]));
expectType<boolean>(_.isNull({}));
