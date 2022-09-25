/**
 * @jest-environment jsdom
 */
import { expectType, expectError } from 'tsd';

import _ from '../src';

describe('_(selector).addEvent 타입 테스트', () => {
  test('click 이벤트를 등록할 때 listener 함수에 전달되는 이벤트 객체의 타입은 MouseEvent이다.', () => {
    _('.button').addEvent('click', function (event) {
      expectType<MouseEvent>(event);
    });
  });

  test('input 이벤트를 등록할 때 listener 함수에 전달되는 이벤트 객체의 타입은 Event이다.', () => {
    _('.button').addEvent('input', function (event) {
      expectType<Event>(event);
    });
  });

  test('유효하지 않은 이벤트를 등록할 때 타입 에러가 발생한다.', () => {
    expectError(_('.button').addEvent('foo', function (event) {}));
  });

  test('listener를 전달하지 않으면 에러가 발생한다.', () => {
    expectError(_('.button').addEvent('click'));
  });
});
