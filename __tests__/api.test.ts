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

test('getElement 동작 확인', () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
  document.body.appendChild(divElement);

  const buttonElement = _('button.test-btn').getElement();
  expect(buttonElement).toBeTruthy();

  divElement.removeChild(buttonElement);
});

test('innerHTML 동작 확인', () => {
  const divElement = document.createElement('div');
  divElement.setAttribute('class', 'parent-div');
  document.body.appendChild(divElement);

  const buttonElement = document.createElement('button');
  buttonElement.setAttribute('class', 'child-btn');
  divElement.appendChild(buttonElement);

  expect(_('div.parent-div').innerHTML()).toBe(
    `<button class="child-btn"></button>`
  );
});

test('show 동작 확인', () => {
  const divElement = document.createElement('div');
  divElement.setAttribute('class', 'visible-div');
  document.body.appendChild(divElement);

  _('div.visible-div').show();

  expect(divElement.style.display).not.toBe('none');
});

test('hiddden 동작 확인', () => {
  const divElement = document.createElement('div');
  divElement.setAttribute('class', 'hidden-div');
  document.body.appendChild(divElement);

  _('div.hidden-div').hidden();

  expect(divElement.style.display).toBe('none');
});

test('addEvent 동작 확인', () => {
  const buttonElement = document.createElement('button');
  buttonElement.setAttribute('class', 'event-btn');
  document.body.appendChild(buttonElement);

  const onClickEventBtn = jest.fn();
  _('button.event-btn').addEvent('click', onClickEventBtn);
  buttonElement.click();

  expect(onClickEventBtn).toBeCalledTimes(1);
});
