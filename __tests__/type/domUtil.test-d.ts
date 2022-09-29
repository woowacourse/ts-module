import { expectType } from 'tsd';
import _ from '../../dist/';

const divElement = document.createElement('div');
divElement.innerHTML = `<button class='button'>Continue</button>`;
document.body.appendChild(divElement);

_('.button')?.addEvent('click', function (event) {
  expectType<MouseEvent>(event);
});

_('.button')?.addEvent('input', function (event) {
  expectType<Event>(event);
});
