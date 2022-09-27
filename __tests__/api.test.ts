/**
 * @jest-environment jsdom
 */
import _ from '../src';

describe('기본 점검하기', () => {
  test('모듈은 기본 내보내기', () => {
    expect(_).toBeTruthy();
  });

  test('모듈에 포함된 함수(fetch) 확인', () => {
    expect(typeof _.fetch).toBe('function');
  });

  test('모듈에 포함된 함수(pick) 확인', () => {
    expect(typeof _.pick).toBe('function');
  });

  test('모듈에 포함된 함수(omit) 확인', () => {
    expect(typeof _.omit).toBe('function');
  });
});

describe('_ 함수 동작 확인', () => {
  test('selector 동작 확인', () => {
    const divElement = document.createElement('div');
    divElement.className = 'test-div';
    divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
    document.body.appendChild(divElement);

    const outerElement = _('div.test-div');
    const buttonElement = _('button.test-btn');

    expect(buttonElement).toBeTruthy();
    outerElement.removeChild(buttonElement);
  });

  test('_(selector)._innerHTML() 동작 확인', () => {
    const target = document.createElement('div');
    target.className = 'target';
    target.innerHTML = 'innerHTML';
    document.body.appendChild(target);

    expect(_('div.target')._innerHTML()).toBe(target.innerHTML);
  });

  test('_(selector).show() 동작 확인', () => {
    const target = document.createElement('div');
    target.className = 'target';
    target.innerHTML = 'innerHTML';
    target.hidden = true;

    _('div.target').show();

    expect(_('div.target').hidden).toBe(false);
  });

  test('_(selector)._hidden() 동작 확인', () => {
    const target = document.createElement('div');
    target.className = 'target';
    target.innerHTML = 'innerHTML';
    target.hidden = false;

    _('div.target')._hidden();

    expect(_('div.target').hidden).toBe(true);
  });

  test('_(selector).addEvent() 동작 확인', () => {
    const target = document.createElement('div');
    target.className = 'target';
    target.innerHTML = 'innerHTML';

    const func = jest.fn();

    _('div.target').addEvent('click', func);
    _('div.target').click();

    expect(func).toBeCalledTimes(1);
  });
});

describe('_ module 동작 확인', () => {
  test('fetch 동작 확인', () => {
    global.window.fetch = jest.fn();

    _.fetch('');

    expect(global.window.fetch).toBeCalledTimes(1);
  });

  test('isNull 동작 확인', () => {
    const value = null;

    expect(_.isNull(value)).toBe(true);
  });

  test('isNil 동작 확인', () => {
    const value = undefined;

    expect(_.isNil(value)).toBe(true);
    expect(_.isNil(!value)).toBe(false);
  });

  test('isNumber 동작 확인', () => {
    expect(_.isNumber(123)).toBe(true);
    expect(_.isNumber('123')).toBe(false);
    expect(_.isNumber(null)).toBe(false);
    expect(_.isNumber({})).toBe(false);
    expect(_.isNumber(NaN)).toBe(true);
  });

  test('isFuntion 동작 확인', () => {
    expect(_.isFunction(function () {})).toBe(true);
    expect(_.isFunction(() => {})).toBe(true);
    expect(_.isFunction({})).toBe(false);
    expect(_.isFunction(123)).toBe(false);
    expect(_.isFunction('123')).toBe(false);
    expect(
      _.isFunction(
        (function () {
          return () => {};
        })()
      )
    ).toBe(true);
    expect(_.isFunction(Function.prototype)).toBe(true);
  });

  test('shuffle 동작 확인', () => {
    expect(_.shuffle([1, 2, 3, 4, 5])).toEqual(
      expect.arrayContaining([1, 2, 3, 4, 5])
    );
  });

  test('pick 동작 확인', () => {
    expect(_.pick({ foo: 'foo', bar: 'bar' }, 'foo')).toEqual({ foo: 'foo' });
    expect(_.pick([1, 2, 3, 4, 5], 0)).toEqual([1]);
    expect(_.pick([1, 2, 3, 4, 5], [0, 1, 2])).toEqual([1, 2, 3]);
    expect(
      _.pick({ foo: 'foo', bar: 'bar', baz: 'baz' }, ['foo', 'bar'])
    ).toEqual({
      foo: 'foo',
      bar: 'bar',
    });
  });

  test('omit 동작 확인', () => {
    expect(_.omit({ foo: 'foo', bar: 'bar' }, 'foo')).toEqual({ bar: 'bar' });
    expect(_.omit([1, 2, 3, 4, 5], 0)).toEqual([2, 3, 4, 5]);
    expect(_.omit([1, 2, 3, 4, 5], 1)).toEqual([1, 3, 4, 5]);
    expect(_.omit([1, 2, 3, 4, 5], [0, 1])).toEqual([3, 4, 5]);
    expect(_.omit([1, 2, 3, 4, 5], [0, 1])).toEqual([3, 4, 5]);
    expect(
      _.omit({ foo: 'foo', bar: 'bar', baz: 'baz' }, ['foo', 'bar'])
    ).toEqual({ baz: 'baz' });
  });

  test('memoize 동작 확인', () => {
    const printer = (arg1: string, arg2: string) => `${arg1} ${arg2}`;
    const memorizedPrinter = _.memoize(printer);

    expect(memorizedPrinter('1', '2') === memorizedPrinter('1', '3')).toBe(
      true
    );
  });

  test('debounce 동작 확인', () => {
    jest.useFakeTimers();

    let func: jest.Mock = jest.fn();
    let debouncedFunc: Function = _.debounce(func, 1000);

    for (let i = 0; i < 100; i++) {
      debouncedFunc();
    }

    jest.runAllTimers();

    expect(func).toBeCalledTimes(1);
  });

  test('throttle 동작 확인', () => {
    jest.useFakeTimers();

    const func = jest.fn();
    const throttledFunc = _.throttle(func, 100);

    for (let i = 0; i < 100; i++) {
      throttledFunc();
      jest.advanceTimersByTime(5);
    }

    jest.runAllTimers();

    expect(func).toHaveBeenCalledTimes(6);
  });

  test('clickOutside 동작 확인', () => {
    const parentElement = document.createElement('div');
    const childElement = document.createElement('div');

    parentElement.appendChild(childElement);
    document.body.appendChild(parentElement);

    childElement.onclick = function (event) {
      expect(_.clickOutside(event.target as HTMLElement, parentElement)).toBe(
        false
      );
    };

    childElement.click();
  });
});
