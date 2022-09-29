import { expectType } from 'tsd';
import _ from '../index';

expectType<boolean>(_.isNumber(2));
expectType<boolean>(_.isNumber('2'));
expectType<boolean>(_.isNumber(true));
expectType<boolean>(_.isNumber(null));
expectType<boolean>(_.isNumber(undefined));
expectType<boolean>(_.isNumber([]));
expectType<boolean>(_.isNumber({}));
