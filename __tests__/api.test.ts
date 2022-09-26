/**
 * @jest-environment jsdom
 */
import _ from '../src';

// const fetchMock = jest.mock('fetch', () => 'kam');

test('모듈은 기본 내보내기', () => {
  expect(_).toBeTruthy();
});

test('Selector 동작 확인', () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
  document.body.appendChild(divElement);

  const buttonElement = _('button.test-btn');
  expect(buttonElement).toBeTruthy();

  divElement.removeChild(buttonElement);
});

test('`_("").innerHTML()`~~~~', () => {});

test('`_("").show()`~~~~', () => {});

test('`_("").hidden()`~~~~', () => {});

test('`_("").addEvent()`~~~~', () => {});

test('모듈에 포함된 함수 확인', () => {
  // expect(typeof _.fetch).toBe('function');
  expect(typeof _.isNull).toBe('function');
});

// test('fetch 동작 확인', async () => {
//   const url = '';
//   const response = await _.fetch(url);
//   expect(response).toBe('kam');
// });

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
