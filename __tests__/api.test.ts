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

test('shuffle 함수에 숫자로된 배열을 넣으면 요소들의 순서가 바뀐 배열이 반환된다', () => {
  const arr = [1, 2, 3];
  const shuffledArr = _.shuffle(arr);

  expect(
    arr[0] === shuffledArr[0] &&
      arr[1] === shuffledArr[1] &&
      arr[2] === shuffledArr[2]
  ).toBe(false);
});

// test('Selector 동작 확인', () => {
//   const divElement = document.createElement('div');
//   divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
//   document.body.appendChild(divElement);

//   const buttonElement = _('button.test-btn');
//   expect(buttonElement).toBeTruthy();

//   document.body.removeChild(buttonElement);
// });

// test('`_("").innerHTML()`~~~~', () => {});

// test('`_("").show()`~~~~', () => {});

// test('`_("").hidden()`~~~~', () => {});

// test('`_("").addEvent()`~~~~', () => {});
