import { expectType } from 'tsd';
import _ from './../index';

// NOTE: 보여주기식 테스트 코드...
expectType<Function>(_.throttle(() => {}, 5000));
