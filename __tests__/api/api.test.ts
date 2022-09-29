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
  beforeAll(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.4);
  });

  test('숫자 타입 배열을 collection으로 전달하면, 무작위 순서로 요소가 섞인 배열이 반환된다.', () => {
    const collection = [5, 3, 2, 1, 4];
    const expectedResult = [4, 1, 2, 3, 5];

    const result = _.shuffle(collection);

    expect(result).toEqual(expectedResult);
  });

  test('숫자 또는 문자열 타입 배열을 collection으로 전달하면, 무작위 순서로 요소가 섞인 배열이 반환된다.', () => {
    const collection = [5, 3, '2', 1, 4];
    const expectedResult = [4, 1, '2', 3, 5];

    const result = _.shuffle(collection);

    expect(result).toEqual(expectedResult);
  });

  test('객체를 collection으로 전달하면, 무작위 순서로 객체의 각 값이 섞인 배열이 반환된다.', () => {
    const collection = {
      a: 5,
      b: 3,
      c: 2,
      d: 1,
      e: 4,
    };
    const expectedResult = [4, 1, 2, 3, 5];

    const result = _.shuffle(collection);

    expect(result).toEqual(expectedResult);
  });

  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  });
});

describe('pick 구현 테스트', () => {
  test('paths를 전달하면 paths의 요소에 해당되는 object의 키와 값이 선택돼서 반환된다.', () => {
    const object = {
      a: 1,
      b: 2,
      c: 5,
      d: 4,
      e: 3,
    };
    const paths = ['a', 'c'];

    const result = _.pick(object, paths);

    expect(Object.entries(result).every(([key, value]) => value === object[key])).toEqual(
      true,
    );
  });
});

describe('omit 구헌 테스트', () => {
  test('paths를 전달하면 paths의 요소에 해당되는 object의 키와 값을 제외하고 나머지 키와 값이 반환된다.', () => {
    const object = {
      a: 1,
      b: 2,
      c: 5,
      d: 4,
      e: 3,
    };
    const paths = ['a', 'c'];
    const excludedKeys = ['b', 'd', 'e'];

    const result = _.omit(object, paths);

    expect(
      Object.entries(result).every(
        ([key, value]) => value === object[key] && excludedKeys.includes(key),
      ),
    ).toEqual(true);
  });
});

describe('throttling 구현 테스트', () => {
  jest.useFakeTimers();

  test('throttling 시간을 1초로 설정하고, 0.2초 때 1이 추가되는 함수를, 0.4초 때 2가 추가되는 함수를, 2초 때 3이 추가되는 함수를 실행하면, 결과 배열에 1과 3만 추가돼야 한다.', () => {
    const testArray: number[] = [];
    const expectedResult = [1, 3];

    const pushToArray = _.throttle((value: number) => {
      testArray.push(value);
    }, 1000);

    setTimeout(() => {
      pushToArray(1);
    }, 200);

    setTimeout(() => {
      pushToArray(2);
    }, 400);

    setTimeout(() => {
      pushToArray(3);
    }, 2000);

    jest.runAllTimers();

    expect(testArray).toEqual(expectedResult);
  });
});

describe('clickOutside 구현 테스트', () => {
  let divElement: HTMLDivElement;
  let buttonElement: HTMLButtonElement;

  beforeAll(() => {
    divElement = document.createElement('div');
    buttonElement = document.createElement('button');

    divElement.appendChild(buttonElement);
    document.body.appendChild(divElement);
  });

  test('부모 요소를 클릭하면 전달한 callback 함수가 호출된다.', () => {
    let isClicked = false;
    const expectedResult = true;

    _.clickOutside(buttonElement, () => {
      isClicked = true;
    });

    divElement.click();

    expect(isClicked).toEqual(expectedResult);
  });

  test('자식 요소를 클릭해도 전달한 callback 함수가 호출되지 않는다.', () => {
    let isClicked = false;
    const expectedResult = false;

    _.clickOutside(buttonElement, () => {
      isClicked = true;
    });

    buttonElement.click();

    expect(isClicked).toEqual(expectedResult);
  });

  afterAll(() => {
    document.body.removeChild(divElement);
  });
});
