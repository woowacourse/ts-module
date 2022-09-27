import _ from '../src';

test('모듈은 기본 내보내기', () => {
  expect(_).toBeTruthy();
});

test('fetch 동작 테스트', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ a: 1 }),
    })
  ) as jest.Mock;

  const response = await _.fetch<{ a: 1 }>('123');
  const data = await response.json();

  expect(data).toMatchObject({ a: 1 });
});

test('isNull 타입 테스트', () => {
  const value = 'foo';

  expect(typeof value).toBe('string');

  expect(typeof _.isNull).toBe('function');
  expect(typeof _.isNull(value)).toBe('boolean');
});

test('isNull 구현 테스트', () => {
  expect(_.isNull(null)).toBe(true);

  expect(_.isNull('string')).toBe(false);
  expect(_.isNull(3)).toBe(false);
  expect(_.isNull({})).toBe(false);
  expect(_.isNull(undefined)).toBe(false);
  expect(_.isNull(true)).toBe(false);
});

test('isNil 타입 테스트', () => {
  const value = 'foo';

  expect(typeof value).toBe('string');

  expect(typeof _.isNil).toBe('function');
  expect(typeof _.isNil(value)).toBe('boolean');
});

test('isNil 구현 테스트', () => {
  expect(_.isNil(null)).toBe(true);
  expect(_.isNil(undefined)).toBe(true);

  expect(_.isNil('string')).toBe(false);
  expect(_.isNil(3)).toBe(false);
  expect(_.isNil({})).toBe(false);
  expect(_.isNil(true)).toBe(false);
});

test('isNumber 타입 테스트', () => {
  const value = 'foo';

  expect(typeof value).toBe('string');

  expect(typeof _.isNumber).toBe('function');
  expect(typeof _.isNumber(value)).toBe('boolean');
});

test('isNumber 구현 테스트', () => {
  expect(_.isNumber(3)).toBe(true);

  expect(_.isNumber(null)).toBe(false);
  expect(_.isNumber(undefined)).toBe(false);
  expect(_.isNumber('string')).toBe(false);
  expect(_.isNumber({})).toBe(false);
  expect(_.isNumber(true)).toBe(false);
});

test('isFunction 타입 테스트', () => {
  const value = 'foo';

  expect(typeof value).toBe('string');

  expect(typeof _.isFunction).toBe('function');
  expect(typeof _.isFunction(value)).toBe('boolean');
});

test('isFunction 구현 테스트', () => {
  expect(_.isFunction(function () {})).toBe(true);

  expect(_.isFunction(3)).toBe(false);
  expect(_.isFunction({})).toBe(false);
  expect(_.isFunction(null)).toBe(false);
  expect(_.isFunction(undefined)).toBe(false);
  expect(_.isFunction('string')).toBe(false);
  expect(_.isFunction(true)).toBe(false);
});

test('shuffle 동작 테스트', () => {
  // random 테스트
});

test('pick 동작 테스트', () => {
  const raw = { a: 1, b: 2, c: 3 };

  expect(_.pick(raw, 'a', 'b')).toMatchObject({ a: 1, b: 2 });
});

test('omit 동작 테스트', () => {
  const raw = { a: 1, b: 2, c: 3 };

  expect(_.omit(raw, 'a', 'b')).toMatchObject({ c: 3 });
});

test('memoize 동작 테스트', () => {
  const raw = { a: 1, b: 2, c: 3 };

  const memoizedPick = _.memoize(_.pick, 'pick');

  const memoizeData = memoizedPick(raw, 'a', 'b');
  expect(memoizeData).toMatchObject({ a: 1, b: 2 });

  const memoizeData2 = memoizedPick(raw, 'a');
  expect(memoizeData2).toMatchObject({ a: 1, b: 2 });
});

describe('_ 함수 테스트', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  test('Selector 동작 테스트', () => {
    const divElement = document.createElement('div');
    divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
    document.body.appendChild(divElement);

    const buttonElement = _('button.test-btn');
    expect(buttonElement).toBeTruthy();
  });

  test('innerHTML 동작 테스트', () => {
    const divElement = document.createElement('div');
    divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
    document.body.appendChild(divElement);

    expect(_('body').innerHTML).toBe(`<div><button class=\"test-btn\">Continue</button></div>`);
  });
});
