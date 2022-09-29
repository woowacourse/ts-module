/**
 * @jest-environment jsdom
 */
import _ from '../src';

describe('모듈 존재 확인', () => {
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
});

describe('DOM Utils 동작 확인', () => {
  const divElement = document.createElement('div');
  divElement.className = 'test-div';

  beforeEach(() => {
    document.body.appendChild(divElement);
  });

  afterEach(() => {
    document.body.removeChild(divElement);
  });

  test('Selector 동작 확인', () => {
    divElement.innerHTML = `<button class='test-btn'>Continue</button>`;

    const buttonElement = _('button.test-btn');
    expect(buttonElement).toBeTruthy();
  });

  test('innerHTML 동작 확인', () => {
    const testDiv = _('div.test-div');
    const text = '과연 제대로 들어갈까요?';

    testDiv.innerHTML(text);
    expect(testDiv.element.innerHTML).toEqual(text);
  });

  test('show 동작 확인', () => {
    const testDiv = _('div.test-div');

    testDiv.show();
    expect(testDiv.element.style).toHaveProperty('display', 'none');
  });

  test('hidden 동작 확인', () => {
    const testDiv = _('div.test-div');

    testDiv.hidden();
    expect(testDiv.element.style).toHaveProperty('display', 'block');
  });

  test('addEvent 동작 확인', () => {
    const nativeConsoleLog = console.log;
    console.log = jest.fn();

    const testDiv = _('div.test-div');
    const text = 'click event!';
    const eventHandler = () => {
      console.log(text);
    };

    testDiv.addEvent('click', eventHandler);
    testDiv.element.click();
    expect(console.log).toHaveBeenCalledWith(text);

    console.log = nativeConsoleLog;
  });
});

describe('Utils 동작 확인', () => {
  test('fetch 동작 확인', () => {
    const nativeFetch = window.fetch;
    window.fetch = jest.fn();

    _.fetch('https://something.url');

    expect(window.fetch).toBeCalledTimes(1);

    window.fetch = nativeFetch;
  });

  test('isNull 동작 확인', () => {
    expect(_.isNull('')).toBeFalsy();
    expect(_.isNull(null)).toBeTruthy();
    expect(_.isNull(undefined)).toBeFalsy();
    expect(_.isNull(void 0)).toBeFalsy();
    expect(_.isNull(NaN)).toBeFalsy();
  });

  test('isNil 동작 확인', () => {
    expect(_.isNil('a')).toBeFalsy();
    expect(_.isNil('')).toBeFalsy();
    expect(_.isNil(null)).toBeTruthy();
    expect(_.isNil(undefined)).toBeTruthy();
    expect(_.isNil(void 0)).toBeTruthy();
    expect(_.isNil(NaN)).toBeFalsy();
  });

  test('isNumber 동작 확인', () => {
    expect(_.isNumber(37)).toBeTruthy();
    expect(_.isNumber('37')).toBeFalsy();
    expect(_.isNumber(Infinity)).toBeTruthy();
    expect(_.isNumber(NaN)).toBeTruthy();
    expect(_.isNumber(Number.MAX_VALUE)).toBeTruthy();
  });

  test('shuffle 동작 확인', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const shuffledArray = _.shuffle(array);

    expect(shuffledArray.length).toEqual(array.length);

    array.forEach(value => {
      expect(shuffledArray).toContain(value);
    });
  });

  test('pick 동작 확인', () => {
    const object = {
      name: '하리',
      age: 23,
      feeling: 'sleepy',
    };
    const expectObjectValidCase = {
      name: object.name,
      feeling: object.feeling,
    };
    const expectObjectInvalidCase = {};

    expect(_.pick(object, 'name', 'feeling')).toEqual(expectObjectValidCase);
    expect(_.pick(object, 'feel')).toEqual(expectObjectInvalidCase);
  });

  test('omit 동작 확인', () => {
    const object = {
      name: '하리',
      age: 23,
      feeling: 'sleepy',
    };
    const expectObjectValidCase = {
      name: object.name,
      feeling: object.feeling,
    };
    const expectObjectInvalidCase = {};

    expect(_.omit(object, 'age')).toEqual(expectObjectValidCase);
    expect(_.omit(object, 'feel')).toEqual(expectObjectInvalidCase);
  });

  test('memoize 동작 확인', () => {
    const nativeConsoleLog = console.log;
    console.log = jest.fn();

    const object = { a: 1, b: 2 };
    const objectKey = 'a1b2';

    const values = _.memoize(Object.values);
    values(objectKey, object);

    object.a = 2;
    values(objectKey, object);

    expect(console.log).lastCalledWith('memoized');

    console.log = nativeConsoleLog;
  });

  test('debounce 동작 확인', () => {
    const nativeConsoleLog = console.log;
    console.log = jest.fn();

    jest.useFakeTimers();

    const buttonElement = document.createElement('button');
    buttonElement.className = 'test-button';
    buttonElement.addEventListener(
      'click',
      _.debounce(() => {
        console.log('clicked!');
      }, 1000),
    );

    for (let i = 0; i < 10; i++) {
      buttonElement.click();
    }

    jest.runAllTimers();

    expect(console.log).toBeCalledTimes(1);

    console.log = nativeConsoleLog;
  });

  test('throttle 동작 확인', () => {
    const nativeConsoleLog = console.log;
    console.log = jest.fn();

    jest.useFakeTimers();

    const buttonElement = document.createElement('button');
    buttonElement.className = 'test-button';
    buttonElement.addEventListener(
      'click',
      _.throttle(() => {
        console.log('clicked!');
      }, 1000),
    );

    for (let i = 0; i < 10; i++) {
      buttonElement.click();
    }

    jest.runAllTimers();

    expect(console.log).toBeCalledTimes(1);

    console.log = nativeConsoleLog;
  });

  test('clickOutside 동작 확인', () => {
    const nativeConsoleLog = console.log;
    console.log = jest.fn();

    const clickOutsideButtonMessage = 'button 밖을 클릭했어요.';
    const clickInsideButtonMessage = 'button 안을 클릭했어요.';

    const buttonElement = document.createElement('button');
    const clickEvent = (event: MouseEvent) => {
      if (!event.target) return;

      if (_.clickOutside(buttonElement, event.target)) {
        console.log(clickOutsideButtonMessage);
        return;
      }

      console.log(clickInsideButtonMessage);
    };

    document.addEventListener('click', clickEvent);

    document.body.appendChild(buttonElement);

    document.body.click();
    expect(console.log).lastCalledWith(clickOutsideButtonMessage);

    buttonElement.click();
    expect(console.log).lastCalledWith(clickInsideButtonMessage);

    document.body.removeChild(buttonElement);
    document.removeEventListener('click', clickEvent);

    console.log = nativeConsoleLog;
  });
});
