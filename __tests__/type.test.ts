/**
 * @jest-environment jsdom
 */
import { expectType } from 'tsd';

import _ from '../src';

expectType<boolean>(_.isNull(null));
