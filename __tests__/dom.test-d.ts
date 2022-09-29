import { expectType } from 'tsd';
import _ from '../index';

// _._('.button').addEvent('click', function (event) {
//   expectType<MouseEvent>(event);
// });

// _._('.button').addEvent('beforeinput', function (event) {
//   expectType<InputEvent>(event);
// });

// NOTE: 이외의 메서드의 타입에 대한 테스트는 무의미하다고 생각해서 해주지 않았습니다.
// return도 void이고 단순히 인자를 받아서 실행되는 메서드라서 해주지 않았습니다.
