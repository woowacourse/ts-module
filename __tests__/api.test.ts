/**
 * @jest-environment jsdom
 */
import _ from '../src';

test('모듈은 기본 내보내기', () => {
  expect(_).toBeTruthy();
});

test('모듈에 포함된 함수 확인', () => {
  expect(typeof _.fetch).toBe('function');
});

test('모듈에 포함된 함수 확인', () => {
  expect(typeof _.pick).toBe('function');
});

test('모듈에 포함된 함수 확인', () => {
  expect(typeof _.omit).toBe('function');
});

describe('selector 동작 + 메서드 테스트', () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
  document.body.appendChild(divElement);

  const buttonElement = _('.test-btn');

  test('`_("").innerHTML()`', () => {
    _('.test-btn').innerHtml('123');
    expect(buttonElement.innerHTML).toEqual('123');
  });

  test('`_("").show()`', () => {
    _('.test-btn').show();
    expect(buttonElement.style.display).toEqual('block');
  });

  test('`_("").hidden()`', () => {
    _('.test-btn').hide();
    expect(buttonElement.style.display).toEqual('hidden');
  });

  test('`_("").addEvent()`', () => {
    const mockCallback = jest.fn();

    _('.test-btn').addEvent('click', mockCallback);
    buttonElement.click();
    expect(mockCallback).toBeCalled();
  });

  test('selector 동작 확인', () => {
    const buttonElement = _('button.test-btn');
    expect(buttonElement).toBeTruthy();

    divElement.removeChild(buttonElement);
  });

  test('isNull', () => {
    expect(_.isNull(null)).toEqual(true);
    expect(_.isNull(undefined)).toEqual(false);
  });
  test('isNil', () => {
    expect(_.isNil(null)).toEqual(true);
    expect(_.isNil(undefined)).toEqual(true);
    expect(_.isNil(1)).toEqual(false);
  });
  test('isNumber', () => {
    expect(_.isNumber(123)).toEqual(true);
    expect(_.isNumber('123')).toEqual(false);
  });
  test('isFunction', () => {
    expect(_.isFunction(() => {})).toEqual(true);
    expect(_.isFunction('123')).toEqual(false);
  });
  test('pick', () => {
    expect(_.pick({ a: 1, b: 2 }, ['a'])).toEqual({ a: 1 });
  });
  test('omit', () => {
    expect(_.omit({ a: 1, b: 2 }, ['a'])).toEqual({ b: 2 });
  });
  test('fetch', async () => {
    const response = await _.fetch('https://jsonplaceholder.typicode.com/posts/1', 'GET');
    expect(response).not.toEqual(undefined);
    expect(response).not.toEqual(null);
  });
  test('memoize', () => {
    const testObject = { a: 1, b: 2 };

    const memoizedValue = _.memoize((obj: Record<string, unknown>) => Object.values(obj));

    const initial = memoizedValue(testObject);
    testObject.a = 3;

    expect(memoizedValue(testObject)).toStrictEqual(initial);
  });

  jest.useFakeTimers();
  test('debounce', () => {
    const result: unknown[] = [];
    const debouncedPush = _.debounce((input) => {
      result.push(input);
    }, 1000);

    setTimeout(() => {
      debouncedPush('a');
    }, 200);
    setTimeout(() => {
      debouncedPush('b');
    }, 400);
    setTimeout(() => {
      debouncedPush('c');
    }, 600);
    setTimeout(() => {
      debouncedPush('d');
    }, 1300);

    jest.runAllTimers();

    expect(result).toStrictEqual(['d']);
  });
  test('throttle', () => {
    const result: unknown[] = [];
    const throttlePush = _.throttle((input) => {
      result.push(input);
    }, 1000);

    setTimeout(() => {
      throttlePush('a');
    }, 200);
    setTimeout(() => {
      throttlePush('b');
    }, 400);
    setTimeout(() => {
      throttlePush('c');
    }, 600);
    setTimeout(() => {
      throttlePush('d');
    }, 1300);

    jest.runAllTimers();

    expect(result).toStrictEqual(['a', 'd']);
  });
  test('clickOutside', () => {
    const target = document.createElement('button');
    const outside = document.createElement('button');
    document.body.append(target, outside);

    const mockCallback = jest.fn();
    _.clickOutside(target, mockCallback);

    target.click();
    expect(mockCallback).not.toBeCalled();

    outside.click();
    expect(mockCallback).toBeCalled();
  });
});
