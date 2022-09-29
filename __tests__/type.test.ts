/**
 * @jest-environment jsdom
 */
import { expectType } from 'tsd';

import _ from '../src';

const $button = _('button');

test('올바른 인자를 넣었을 때, 클릭 이벤트가 잘 작동한다', () => {
  $button.addEvent('click', function (event) {
    expectType<MouseEvent>(event);
  });
});

test('이상한 이벤트 타입을 넣었을 때, 에러가 난다.', () => {
  //@ts-expect-error
  $button.addEvent('invalid eventType', function (event) {
    console.log(event);
  });
});

test('show의 반환 타입은 void이다.', () => {
  expectType<void>($button.show());
});

test('hide의 반환 타입인 void이다.', () => {
  expectType<void>($button.hide());
});

test('innerHtml의 반환 타입인 string이다.', () => {
  expectType<string>($button.innerHtml('<div>a</div>'));
});

test('promise의 반환 타입은 Promise<string>이다.', () => {
  expectType<Promise<string>>(
    _.fetch<string>('https://example.com', {
      method: 'GET',
    }).then((res) => res.json())
  );
});

test('isNull 테스트', () => {
  expectType<boolean>(_.isNull(null));
  expectType<boolean>(_.isNull(2));
  expectType<boolean>(_.isNull(0));
});

test('isNil 테스트', () => {
  expectType<boolean>(_.isNil(null));
  expectType<boolean>(_.isNil(undefined));
  expectType<boolean>(_.isNil(0));
});

test('isNumber 테스트', () => {
  expectType<boolean>(_.isNumber(1));
  expectType<boolean>(_.isNumber('1'));
});

test('isFunction 테스트', () => {
  expectType<boolean>(_.isFunction(() => {}));
  expectType<boolean>(_.isFunction('2'));
});

test('shuffle 테스트', () => {
  expectType<(1 | 2 | 3 | 4)[]>(_.shuffle([1, 3, 2, 4]));
});

test('pick 테스트', () => {
  expectType<{ a: 1; b: 2 }>(_.pick({ a: 1, b: 2, c: 3 }, 'a', 'b'));
});

test('omit 테스트', () => {
  expectType<{ c: number }>(_.omit({ a: 1, b: 2, c: 3 }, 'a', 'b'));
});

test('memoize 테스트', () => {
  expectType<() => 1>(
    _.memoize(
      () => 1,
      () => '1'
    )
  );

  expectType<(a: number, b: number) => number>(
    _.memoize(
      (a: number, b: number) => a + b,
      (a: number, b: number) => `${a}+${b}`
    )
  );
});

test('debounce 테스트', () => {
  expectType<() => void>(_.debounce(() => console.log('debounce'), 400));
});

test('throttle 테스트', () => {
  expectType<() => void>(_.throttle(() => console.log('throttle'), 400));
});

test('clickOutside 테스트', () => {
  expectType<void>(
    _.clickOutside(document.createElement('div'), () =>
      console.log('click outside')
    )
  );

  expectType<void>(
    //@ts-expect-error
    _.clickOutside('div', () => console.log('click outside'))
  );
});
