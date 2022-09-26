import { expectType } from 'tsd';
import _ from '../../dist/';

expectType<boolean>(_.isNull(null));
expectType<boolean>(_.isNil(null));
expectType<boolean>(_.isNumber(123));
expectType<boolean>(_.isFunction(() => {}));
expectType<boolean>(_.shuffle([5, 3, 1, 2, 4]));
