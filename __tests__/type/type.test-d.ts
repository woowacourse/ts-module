import { expectNotType, expectType } from 'tsd';

import _ from '../../src';

// DOM utils
const buttonElement = document.createElement('button');
buttonElement.className = 'button';
document.body.appendChild(buttonElement);

const button = _('.button');

expectType<void>(button.innerHTML(''));
expectType<void>(button.show());
expectType<void>(button.hidden());

button.addEvent('click', function (event) {
  expectType<MouseEvent>(event);
});

document.body.removeChild(buttonElement);

// utils
expectType<Promise<Response>>(_.fetch('someUrl'));
expectType<boolean>(_.isNull(null));
expectType<boolean>(_.isNil(undefined));
expectType<boolean>(_.isNumber(0));
expectType<boolean>(_.isFunction(() => {}));
expectType<number[]>(_.shuffle([1, 2, 3]));
expectType<CustomObject<string | number>>(
  _.pick({ name: '하리', age: 23 }, 'name'),
);
expectType<CustomObject<string | number>>(
  _.omit({ name: '하리', age: 23 }, 'age'),
);
expectType<(key: string, ...args: unknown[]) => number>(_.memoize(() => 10));
expectType<() => void>(
  _.debounce(() => {
    console.log('debounced');
  }, 1000),
);
expectType<() => void>(
  _.throttle(() => {
    console.log('throttled');
  }, 1000),
);

const eventTarget = document.createEvent('Event').target;

if (eventTarget) {
  expectType<boolean>(_.clickOutside(buttonElement, eventTarget));
}
