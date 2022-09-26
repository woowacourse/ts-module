/**
 * @jest-environment jsdom
 */
import { expectType } from 'tsd';
import _ from './../index';

expectType<boolean>(_.isNil(2));
expectType<boolean>(_.isNil('2'));
expectType<boolean>(_.isNil(true));
expectType<boolean>(_.isNil(null));
expectType<boolean>(_.isNil(undefined));
expectType<boolean>(_.isNil([]));
expectType<boolean>(_.isNil({}));
