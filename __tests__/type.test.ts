/**
 * @jest-environment jsdom
//  */
import { expectType } from 'tsd';
import _ from '../src';

expectType<boolean>(_.isNull(null));
expectType<boolean>(_.isNil(null));
expectType<boolean>(_.isNumber(123));
expectType<boolean>(_.isFunction(() => {}));

expectType<number[] | undefined>(_.shuffle([1, 2, 3, 4]));
expectType<{}>(_.pick({ a: 1, b: 2 }, ['a', 'b']));
expectType<{}>(_.omit({ a: 1, b: 2 }, ['a', 'b']));

const tempFunc = (arg1, arg2) => {};
expectType<typeof tempFunc>(_.memoize(tempFunc));
expectType<typeof tempFunc>(_.debounce(tempFunc, 100));
expectType<typeof tempFunc>(_.throttle(tempFunc, 100));

const divElement = document.createElement('div');
divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
document.body.appendChild(divElement);
const buttonElement = _('.test-btn');

expectType<void>(_.clickOutside(buttonElement, (e) => {}));

_('.test-btn').addEvent('click', function (event) {
  expectType<MouseEvent>(event);
});
