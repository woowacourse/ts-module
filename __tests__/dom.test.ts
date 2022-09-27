/**
 * @jest-environment jsdom
 */
import { expectType } from 'tsd';

import _ from '../src';

test('Selector 동작 확인', () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
  document.body.appendChild(divElement);
  const buttonElement = _('button.test-btn').get();
  expect(buttonElement).toBeTruthy();
  divElement.removeChild(buttonElement);
});

test('event 타입 체크', () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
  document.body.appendChild(divElement);
  _('button.test-btn').addEvent('click', function (event) {
    expectType<Event>(event);
  });
});
