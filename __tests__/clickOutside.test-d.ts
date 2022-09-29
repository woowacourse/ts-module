import { expectType } from 'tsd';
import _ from '../index';

const divElement = document.createElement('div');
const spanElement = document.createElement('span');
const callbackFunc = () => {};

expectType<(event: MouseEvent) => void>(
  _.clickOutside(divElement, callbackFunc)
);
expectType<(event: MouseEvent) => void>(
  _.clickOutside(spanElement, callbackFunc)
);
