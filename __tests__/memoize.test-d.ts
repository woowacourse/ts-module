import { expectType } from 'tsd';
import _ from '../index';

// NOTE: 함수들을 인자로 받는 함수들은 그 함수들이 특정한 형식의 함수가 아니면 타입 테스트를 작성하는 게 무의미해보입니다.
// 단순히 Function 타입을 선언해주기 때문이죠..
expectType<Function>(_.memoize(() => {}));
