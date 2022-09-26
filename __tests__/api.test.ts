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

  const buttonElement = _('button.test-btn').target;

  expect(buttonElement).toBeTruthy();

  //   document.body.removeChild(buttonElement!);
});

test('`_("").innerHTML() 동작확인', () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
  document.body.appendChild(divElement);

  const buttonElement = _('button.test-btn').target!;
  _('button.test-btn').innerHTML('hello');
  expect(buttonElement.innerHTML).toBe('hello');

  //   document.body.removeChild(buttonElement!);
});

test('`_("").show() 동작확인', () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = `<button class='test-btn' style="display:none">Continue</button>`;
  document.body.appendChild(divElement);

  const buttonElement = _('button.test-btn').target!;

  _('button.test-btn').show();
  expect(buttonElement.style.display).toBe('');
});

test('`_("").hidden() 동작확인', () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = `<button class='test-btn' style="display:none">Continue</button>`;
  document.body.appendChild(divElement);
  const buttonElement = _('button.test-btn').target!;

  _('button.test-btn').hidden();
  expect(buttonElement.style.display).toBe('none');
});

test('`_("").addEvent() 동작확인', () => {
  console.log = jest.fn();

  const buttonElement = document.createElement('button');
  buttonElement.setAttribute('class', 'test-button');
  document.body.innerHTML = `<button class='test-btn' style="display:none">Continue</button>`;

  const targetElement = _('.test-btn').target!;
  const event = new MouseEvent('click');

  _('button.test-btn').addEvent('click', () => {
    console.log('clicked');
  });
  targetElement.dispatchEvent(event);
  expect(console.log).toHaveBeenCalledWith('clicked');
});
