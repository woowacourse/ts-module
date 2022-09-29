/**
 * @jest-environment jsdom
 */
import _ from '../src';

test('모듈은 기본 내보내기', () => {
  expect(_).toBeTruthy();
});

test('Selector 동작 확인', () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = `<button class="test-btn">Continue</button>`;
  document.body.appendChild(divElement);

  const buttonElement = _('button.test-btn');
  expect(buttonElement).toBeTruthy();

  divElement.removeChild(buttonElement);
});

test('innerHTML 동작 확인', () => {
  const buttonTemplateLiteral = `<button class="test-btn">Continue</button>`;
  const divElement = document.createElement('div');
  divElement.className = 'wrapper';
  divElement.innerHTML = buttonTemplateLiteral;
  document.body.appendChild(divElement);

  expect(_('div.wrapper').innerHTML).toBe(buttonTemplateLiteral);
});

test('show 동작 확인', () => {
  const divElement = document.createElement('div');
  document.body.appendChild(divElement);

  const targetElement = _('div');
  targetElement.show();

  expect(targetElement.style.visibility).toBe('visible');
});

test('hide 동작 확인', () => {
  const divElement = document.createElement('div');
  document.body.appendChild(divElement);

  const targetElement = _('div');
  targetElement.hide();

  expect(targetElement.style.visibility).toBe('hidden');
});

test('모듈에 포함된 함수 확인', () => {
  expect(typeof _.fetch).toBe('function');
  expect(typeof _.isNull).toBe('function');
  expect(typeof _.isNil).toBe('function');
  expect(typeof _.isNumber).toBe('function');
  expect(typeof _.isFunction).toBe('function');
  expect(typeof _.shuffle).toBe('function');
  expect(typeof _.pick).toBe('function');
  expect(typeof _.omit).toBe('function');
  expect(typeof _.memoize).toBe('function');
  expect(typeof _.debounce).toBe('function');
  expect(typeof _.throttle).toBe('function');
  expect(typeof _.clickOutside).toBe('function');
});

test('isNull 동작 확인', () => {
  expect(_.isNull(1)).toBeFalsy();
  expect(_.isNull(null)).toBeTruthy();
});

test('isNil 동작 확인', () => {
  expect(_.isNil(1)).toBeFalsy();
  expect(_.isNil()).toBeTruthy();
});

test('isNumber 동작 확인', () => {
  expect(_.isNumber('1')).toBeFalsy();
  expect(_.isNumber(1)).toBeTruthy();
});

test('isFunction 동작 확인', () => {
  expect(_.isFunction('')).toBeFalsy();
  expect(_.isFunction(() => {})).toBeTruthy();
});

test('shuffle 동작 확인', () => {
  const array = [1, 2, 3];

  expect(_.shuffle(array).length === array.length).toBeTruthy();
  expect(_.shuffle(array).every((el) => array.includes(el))).toBeTruthy();
});

test('pick 동작 확인', () => {
  const object = {
    a: 1,
    b: 2,
    c: 3,
  };

  const expectObject = {
    a: 1,
    c: 3,
  };

  expect(_.pick(object, ['a', 'c'])).toEqual(expectObject);
});

test('omit 동작 확인', () => {
  const object = {
    a: 1,
    b: 2,
    c: 3,
  };

  const expectObject = {
    b: 2,
  };

  expect(_.omit(object, ['a', 'c'])).toEqual(expectObject);
});

test('memoize 동작 확인', () => {
  const func = (arg1: unknown, arg2: unknown) => `${arg1} ${arg2}`;
  const resolver = (arg1: unknown, arg2: unknown) => JSON.stringify([arg1, arg2]);
  const funcM1 = _.memoize(func);
  const funcM2 = _.memoize(func, resolver);

  expect(funcM1('kam', 'woo')).toEqual('kam woo');
  expect(funcM1('kam', 'yeong')).toEqual('kam woo');

  expect(funcM2('kam', 'woo')).toEqual('kam woo');
  expect(funcM2('kam', 'yeong')).toEqual('kam yeong');
});

test('debounce 동작 확인', () => {
  jest.useFakeTimers();
  jest.spyOn(global, 'setTimeout');
  const func = () => {};
  const time = 1000;
  const debouncedFunc = _.debounce(func, time);
  debouncedFunc();

  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), time);
});

test('throttle 동작 확인', () => {
  jest.useFakeTimers();
  jest.spyOn(global, 'setTimeout');
  const func = () => {};
  const time = 1000;
  const throttledFunc = _.throttle(func, time);
  throttledFunc();

  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), time);
});

test('clickOutside 동작 확인', () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
  document.body.appendChild(divElement);

  const buttonElement = document.querySelector('button.test-btn');
  let clickCount = 0;

  if (!buttonElement) {
    expect(buttonElement).toBeTruthy();
    return;
  }

  _.clickOutside(buttonElement, (event) => {
    clickCount += 1;
  });

  _.clickOutside(divElement, (event) => {
    clickCount += 1;
  });
});
