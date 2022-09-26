/**
 * @jest-environment jsdom
 */
import _ from '../../dist';

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
    buttonElement?.addEvent('click', () => {
      testValue += 1;
    });

    buttonElement?.click();

    expect(testValue).toEqual(EXPECTED_VALUE);
  });

  afterEach(() => {
    document.body.removeChild(divElement);
  });
});

describe('isNull 구현 테스트', () => {
  test('null을 전달하면 true가 반환된다.', () => {
    const value = null;

    expect(_.isNull(value)).toEqual(true);
  });

  test('undefined를 전달하면 false가 반환된다.', () => {
    const value = undefined;

    expect(_.isNull(value)).toEqual(false);
  });

  test('string 타입을 전달하면 false가 반환된다.', () => {
    const value = 'test';

    expect(_.isNull(value)).toEqual(false);
  });

  test('number 타입을 전달하면 false가 반환된다.', () => {
    const value = 123;

    expect(_.isNull(value)).toEqual(false);
  });

  test('boolean 타입을 전달하면 false가 반환된다.', () => {
    const value = true;

    expect(_.isNull(value)).toEqual(false);
  });

  test('symbol 타입을 전달하면 false가 반환된다.', () => {
    const value = Symbol('test');

    expect(_.isNull(value)).toEqual(false);
  });

  test('bigInt 타입을 전달하면 false가 반환된다.', () => {
    const value = BigInt(9007199254740991);

    expect(_.isNull(value)).toEqual(false);
  });

  test('객체를 전달하면 false가 반환된다.', () => {
    const value = {};

    expect(_.isNull(value)).toEqual(false);
  });
});

describe('isNil 구현 테스트', () => {
  test('null을 전달하면 true가 반환된다.', () => {
    const value = null;

    expect(_.isNil(value)).toEqual(true);
  });

  test('undefined를 전달하면 true가 반환된다.', () => {
    const value = undefined;

    expect(_.isNil(value)).toEqual(true);
  });

  test('string 타입을 전달하면 false가 반환된다.', () => {
    const value = 'test';

    expect(_.isNil(value)).toEqual(false);
  });

  test('number 타입을 전달하면 false가 반환된다.', () => {
    const value = 123;

    expect(_.isNil(value)).toEqual(false);
  });

  test('boolean 타입을 전달하면 false가 반환된다.', () => {
    const value = true;

    expect(_.isNil(value)).toEqual(false);
  });

  test('symbol 타입을 전달하면 false가 반환된다.', () => {
    const value = Symbol('test');

    expect(_.isNil(value)).toEqual(false);
  });

  test('bigInt 타입을 전달하면 false가 반환된다.', () => {
    const value = BigInt(9007199254740991);

    expect(_.isNil(value)).toEqual(false);
  });

  test('객체를 전달하면 false가 반환된다.', () => {
    const value = {};

    expect(_.isNil(value)).toEqual(false);
  });
});

describe('isNumber 구현 테스트', () => {
  test('number 타입을 전달하면 true가 반환된다.', () => {
    const value = 123;

    expect(_.isNumber(value)).toEqual(true);
  });

  test('null을 전달하면 false가 반환된다.', () => {
    const value = null;

    expect(_.isNumber(value)).toEqual(false);
  });

  test('undefined를 전달하면 false가 반환된다.', () => {
    const value = undefined;

    expect(_.isNumber(value)).toEqual(false);
  });

  test('string 타입을 전달하면 false가 반환된다.', () => {
    const value = 'test';

    expect(_.isNumber(value)).toEqual(false);
  });

  test('boolean 타입을 전달하면 false가 반환된다.', () => {
    const value = true;

    expect(_.isNumber(value)).toEqual(false);
  });

  test('symbol 타입을 전달하면 false가 반환된다.', () => {
    const value = Symbol('test');

    expect(_.isNumber(value)).toEqual(false);
  });

  test('bigInt 타입을 전달하면 false가 반환된다.', () => {
    const value = BigInt(9007199254740991);

    expect(_.isNumber(value)).toEqual(false);
  });

  test('객체를 전달하면 false가 반환된다.', () => {
    const value = {};

    expect(_.isNumber(value)).toEqual(false);
  });
});

describe('isFunction 구현 테스트', () => {
  test('함수를 전달하면 true가 반환된다.', () => {
    const value = () => {};

    expect(_.isFunction(value)).toEqual(true);
  });

  test('null을 전달하면 false가 반환된다.', () => {
    const value = null;

    expect(_.isFunction(value)).toEqual(false);
  });

  test('undefined를 전달하면 false가 반환된다.', () => {
    const value = undefined;

    expect(_.isFunction(value)).toEqual(false);
  });

  test('string 타입을 전달하면 false가 반환된다.', () => {
    const value = 'test';

    expect(_.isFunction(value)).toEqual(false);
  });

  test('number 타입을 전달하면 false가 반환된다.', () => {
    const value = 123;

    expect(_.isFunction(value)).toEqual(false);
  });

  test('boolean 타입을 전달하면 false가 반환된다.', () => {
    const value = true;

    expect(_.isFunction(value)).toEqual(false);
  });

  test('symbol 타입을 전달하면 false가 반환된다.', () => {
    const value = Symbol('test');

    expect(_.isFunction(value)).toEqual(false);
  });

  test('bigInt 타입을 전달하면 false가 반환된다.', () => {
    const value = BigInt(9007199254740991);

    expect(_.isFunction(value)).toEqual(false);
  });

  test('객체를 전달하면 false가 반환된다.', () => {
    const value = {};

    expect(_.isFunction(value)).toEqual(false);
  });
});

describe('shuffle 구현 테스트', () => {
  test('숫자 타입의 배열을 collection으로 전달하면, 무작위 순서로 요소가 섞인 숫자 타입의 배열이 반환된다.', () => {
    const collection = [5, 3, 2, 1, 4];

    const result = _.shuffle(collection);

    expect(result.every((element) => element in collection)).toEqual(true);
  });

  test('문자 타입의 배열을 collection으로 전달하면, 무작위 순서로 요소가 섞인 문자 타입의 배열이 반환된다.', () => {
    const collection = ['d', 'b', 'a', 'e', 'c'];

    const result = _.shuffle(collection);

    expect(result.every((element) => element in collection)).toEqual(true);
  });

  test('값의 타입이 모두 숫자 타입인 객체를 collection으로 전달하면, 무작위 순서로 객체의 각 값이 섞인 숫자 타입의 배열이 반환된다.', () => {
    const collection = {
      a: 5,
      b: 3,
      c: 2,
      d: 1,
      e: 4,
    };

    const result = _.shuffle(collection);

    expect(result.every((element) => element in collection)).toEqual(true);
  });
});
