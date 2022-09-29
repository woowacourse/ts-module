import _, { customElement } from '../src';

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

test('shuffle 함수에 숫자로된 배열을 넣으면 요소들의 순서가 바뀐 배열이 반환된다', () => {
  // given
  const arr = [1, 2, 3, 4, 5];
  const shuffledArr = _.shuffle(arr);

  // when & then
  expect(
    arr[0] === shuffledArr[0] &&
      arr[1] === shuffledArr[1] &&
      arr[2] === shuffledArr[2] &&
      arr[3] === shuffledArr[3] &&
      arr[4] === shuffledArr[4]
  ).toBe(false);
});

test('pick 함수로 원하는 요소만 따로 추출할 수 있다.', () => {
  // given
  const obj = {
    name: 'al-bur',
    age: 29,
  };

  // when & then
  expect(_.pick(obj, 'name')).toStrictEqual({ name: 'al-bur' });
  expect(_.pick(obj, ['name', 'age'])).toStrictEqual({
    name: 'al-bur',
    age: 29,
  });
});

test('omit 함수로 원하는 요소를 제거할 수 있다.', () => {
  //given
  const obj = {
    name: 'al-bur',
    age: 29,
  };

  // when & then
  expect(_.omit(obj, 'age')).toStrictEqual({ name: 'al-bur' });
  expect(_.omit(obj, ['name', 'age'])).toStrictEqual({});
});

describe('timer mock해서 사용', () => {
  jest.useFakeTimers();

  test('debounce 함수를 활용하면 5번이 아닌 1번만 callback 함수가 호출된다', () => {
    // given
    const mockCallback = jest.fn(() => {});
    const consoleFunc = _.debounce(mockCallback, 1000);

    // when
    consoleFunc();
    consoleFunc();
    consoleFunc();
    consoleFunc();
    consoleFunc();

    jest.runAllTimers();

    // then
    expect(mockCallback.mock.calls.length).toBe(1);
  });

  test('throttle 함수를 활용하면 5번이 아닌 1번만 callback 함수가 호출된다', () => {
    // given
    const mockCallback = jest.fn(() => {});
    const consoleFunc = _.throttle(mockCallback, 1000);

    // when
    consoleFunc();
    consoleFunc();
    consoleFunc();
    consoleFunc();
    consoleFunc();

    jest.runAllTimers();

    // then
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});

test('CustomElement get 동작 확인', () => {
  // given
  const divElement = document.createElement('div');
  divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
  document.body.appendChild(divElement);

  // when
  const $buttonElement = customElement('button.test-btn').get();

  // then
  if ($buttonElement !== null) {
    expect(document.body.contains($buttonElement)).toBeTruthy();
    divElement.removeChild($buttonElement);
  }
});

test('CustomElement innerHTML 동작 확인', () => {
  // given
  const divElement = document.createElement('div');
  divElement.innerHTML = 'unchanged';
  document.body.appendChild(divElement);
  const $divElement = customElement('div');

  // when
  $divElement.innerHTML('changed');

  // then
  expect(document.querySelector('div')?.innerHTML === 'changed');
});

test('CustomElement addEvent 동작 확인', () => {
  // given
  const mockCallback = jest.fn(() => {});
  const divElement = document.createElement('div');
  document.body.appendChild(divElement);
  const $divElement = customElement('div');

  // when
  $divElement.addEvent('click', mockCallback);
  $divElement.get()?.click();

  // then
  expect(mockCallback.mock.calls.length).toBe(1);
});
