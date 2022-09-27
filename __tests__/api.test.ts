/**
 * @jest-environment jsdom
 */
import _ from '../src';

jest.useFakeTimers();

test('모듈은 기본 내보내기', () => {
  expect(_).toBeTruthy();
});

test('fetch 함수 확인', () => {
  expect(typeof _.fetch).toBe('function');
});

test('isNull 함수 확인', () => {
  const girlFriend = null;
  const crew = 'coke';
  expect(typeof _.isNull).toBe('function');
  expect(_.isNull<null>(girlFriend)).toBe(true);
  expect(_.isNil<string>(crew)).toBe(false);
});

test('isNil 함수 확인', () => {
  const girlFriend = null;
  const friend = undefined;
  const crew = 'coke';
  expect(_.isNil<null>(girlFriend)).toBe(true);
  expect(_.isNil<undefined>(friend)).toBe(true);
  expect(_.isNil<string>(crew)).toBe(false);
});

test('isNumber 함수 확인', () => {
  const crewNum = 127;
  const hola = 'hola';

  expect(typeof _.isNumber).toBe('function');
  expect(_.isNumber(crewNum)).toBe(true);
  expect(_.isNumber(hola)).toBe(false);
});

test('isFunction 함수 확인', () => {
  const crewNum = 127;
  const foo = () => {
    return crewNum;
  };

  expect(typeof _.isFunction).toBe('function');
  expect(_.isFunction(foo)).toBe(true);
});

test('shuffle 함수 확인', () => {
  expect(typeof _.shuffle).toBe('function');
});

test('pick 함수 확인', () => {
  const arr = ['a', 'b'];
  const obj = { a: 1, b: 2, c: 3, e: 4 };
  const res = [{ a: 1 }, { b: 2 }];

  expect(typeof _.pick).toBe('function');
  expect(_.pick(arr, obj)).toStrictEqual(res);
});

test('omit 함수 확인', () => {
  const arr = ['a', 'b'];
  const obj = { a: 1, b: 2, c: 3, e: 4 };
  const res = [{ c: 3 }, { e: 4 }];

  expect(typeof _.omit).toBe('function');
  expect(_.omit(arr, obj)).toStrictEqual(res);
});

test('memoize 함수 확인', () => {
  interface ReturnValue {
    name: string;
    age: number;
  }

  const func = jest.fn() as Function;

  _.memoize<ReturnValue>(func, 50)();
  _.memoize<ReturnValue>(func, 50)();

  setTimeout(() => {
    _.memoize<ReturnValue>(func, 50)();
  }, 100000);

  jest.runAllTimers();

  expect(typeof _.memoize).toBe('function');
  expect(func).toHaveBeenCalledTimes(2);
});

test('debounce 함수 확인', () => {
  const func = jest.fn() as Function;
  for (let i = 0; i < 1000; i++) {
    _.debounce.action({ func });
    jest.advanceTimersByTime(50);
  }

  setTimeout(() => {
    _.debounce.action({ func });
  }, 10000);

  jest.runAllTimers();

  expect(typeof _.debounce.action).toBe('function');
  expect(func).toHaveBeenCalledTimes(2);
});

test('throttle 함수 확인', () => {
  let func: jest.Mock;
  func = jest.fn();

  for (let i = 0; i < 4; i++) {
    _.throttle(func, 300);
    jest.advanceTimersByTime(100);
  }

  jest.runAllTimers();

  expect(typeof _.throttle).toBe('function');
  expect(func).toHaveBeenCalledTimes(2);
});

test('Selector 동작 확인', () => {
  const divElement = document.createElement('div');
  divElement.id = 'test-div';
  divElement.innerHTML = `<button id='test-btn'></button>`;
  document.body.appendChild(divElement);

  const buttonElement = _('button.test-btn');
  expect(buttonElement).toBeTruthy();

  _('test-btn').innerHTML(`<p>test</p>`);
  expect(_('test-div').innerHTML()).toBe(`<button id="test-btn"><p>test</p></button>`);

  _('test-div').hidden();
  expect(document.getElementById('test-div')?.style.display).toBe('none');

  _('test-div').show();
  expect(document.getElementById('test-div')?.style.display).toBe('');

  let func: jest.Mock;
  func = jest.fn();

  _('test-div').addEvent('click', func);
  expect(document.getElementById('test-div')?.click());
  expect(func).toHaveBeenCalledTimes(1);
});
