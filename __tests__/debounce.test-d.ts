import { expectType } from 'tsd';
import _ from './../index';

expectType<Function>(_.debounce(() => {}, 5000));
