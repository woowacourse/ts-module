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

test('Selector 동작 확인', () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
  document.body.appendChild(divElement);

  const buttonElement = _('button.test-btn');
  expect(buttonElement).toBeTruthy();

  document.body.removeChild(divElement);
});

test('`_("").innerHTML()`~~~~', () => {});

test('`_("").show()`~~~~', () => {});

test('`_("").hidden()`~~~~', () => {});

describe('`_("").addEvent()` 동작확인', () => {
  const divElement = document.createElement('div');

  beforeEach(() => {
    divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
    document.body.appendChild(divElement);
  });

  test('test-btn 엘리먼트에 click 이벤트를 추가하고, click 이벤트를 호출할 수 있다.', () => {
    let testValue = 1;
    const EXPECTED_VALUE = 2;

    const buttonElement = _('.test-btn');
    buttonElement.addEvent('click', () => {
      testValue += 1;
    });

    buttonElement.click();

    expect(testValue).toEqual(EXPECTED_VALUE);
  });

  afterEach(() => {
    document.body.removeChild(divElement);
  });
});
