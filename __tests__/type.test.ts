/**
 * @jest-environment jsdom
 */
import { expectType } from 'tsd';

import _ from '../src';

const $button = _('.button');

$button.addEvent('click', function (event) {
  expectType<MouseEvent>(event);
});

//@ts-expect-error
$button.addEvent('invalid eventType', function (event) {
  console.log(event);
});

expectType<void>($button.show());

if (typeof $button.hidden === 'function') {
  expectType<void>($button.hidden());
}

if (typeof $button.innerHTML === 'function') {
  expectType<void>($button.innerHTML('<div>a</div>'));
}

expectType<Promise<{ name: string }>>(
  _.fetch<{ name: string }>('https://example.com', {
    method: 'GET',
  }).then((res) => res.json())
);

expectType<boolean>(_.isNull(null));
expectType<boolean>(_.isNull(2));
expectType<boolean>(_.isNull(0));

expectType<boolean>(_.isNil(null));
expectType<boolean>(_.isNil(undefined));
expectType<boolean>(_.isNil(0));

expectType<boolean>(_.isNumber(1));
expectType<boolean>(_.isNumber('1'));

expectType<(1 | 2 | 3 | 4)[]>(_.shuffle([1, 3, 2, 4]));

expectType<{ a: 1; b: 2 }>(_.pick({ a: 1, b: 2, c: 3 }, 'a', 'b'));

expectType<{ c: number }>(_.omit({ a: 1, b: 2, c: 3 }, 'a', 'b'));

expectType<() => 1>(_.memoize(() => 1));
expectType<(a: number, b: number) => number>(
  _.memoize((a: number, b: number) => a + b)
);

expectType<() => void>(_.debounce(() => console.log('debounce'), 400));

expectType<() => void>(_.throttle(() => console.log('throttle'), 400));

expectType<void>(
  _.clickOutside(document.createElement('div'), () =>
    console.log('click outside')
  )
);

expectType<void>(
  //@ts-expect-error
  _.clickOutside('div', () => console.log('click outside'))
);
