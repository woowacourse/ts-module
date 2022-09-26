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
