## TDD

- 타입 시그니처(함수 호출 시그니처)를 먼저 정하고 값을 나중에 채우는 프로그래밍 방식

## 타입 선언(d.ts)

- 타입 선언은 타입이 없는 자바스크립트 코드에 타입스크립트 타입을 부여할 수 있는 수단이다.

## 함수 호출 시그니처

- 함수 호출 시그니처(Call 시그니처, Type 시그니처)는 타입스크립트의 함수 타입 문법이다.
- 단축형 호출 시그니처
  ```tsx
  type Log = (message: string, userId?: string) => void;
  ```
- 전체 호출 시그니처
  ```tsx
  type Log = { (message: string, userId?: string): void };
  ```
  - 기능적으로 단축형과 동일하나 조금 더 복잡한 문법이므로, 오버로드된 함수와 같이 꼭 필요할 때만 전체 호출 시그니처를 사용한다.

```tsx
interface Log {
  (message: string, userId?: string): void;
}
```

```tsx
type Log = { (message: string, userId?: string): void };
```

- 문법이 생소할 수도 있지만 자바스크립트에서 함수는 호출 가능한 객체라는 것을 떠올려 보면 납득할 수 있는 코드입니다.

```tsx
type Log = { (message: string, userId?: string): void };
const log: Log = (message, userId) => {};
```

```tsx
// 화살표함수로 된 type 함수 호출 시그니처(단축형)
// 단축형도 일반함수의 함수표현식의 타입에 할당할 수 있다.
type Log = (message: string, userId?: string) => void;
const a: Log = function log(message, userId) {};
```

- 함수표현식, Type Alias
  - 인터페이스는 선언 병합이 위험하다.

## 세 슬래시 지시어

- 타입스크리트는 이 주석을 특정 파일의 컴파일러 설정이나 다른 파일과의 의존성 정보를 얻는 용도로 활용한다.

```tsx
/// <reference path="./common/common.d.ts" />
// types : 모듈이 의존하는 타입 파일을 선언
```

## 타입 가드

```tsx
isNull(value: any): value is null;
```

```tsx
// 일반 타입 정제
function isString(value: unknown): boolean {
  return typeof value === "string";
}

function checkInput(input: string | number) {
  if (isString(input)) {
    // input이제 string이겠지?
    // string, number 둘 다 될 수 있어
    // 일반 타입 정제로는 정제 안 됨
    // 타입 정제는 현재 영역(유효범위)에 속한 변수만을 처리할 수 있기 때문이다.
    console.log(input.toUpperCase());
  }
}
```

- 타입 정제는 강력하지만 현재 영역(scope, 유효범위)에 속한 변수만을 처리할 수 있다는 점이 문제다. 한 영역에서 다른 영역으로 이동하면 기존의 정제 결과물은 사라져버린다.
- 따라서 타입 체커에 isString이 boolean을 반환할 뿐만 아니라 boolean이 true면 isString에 전달한 인수가 string임을 알려야 한다. 이를 타입 가드라는 기법으로 해결할 수 있다.
  - 타입 가드는 typeof나 instanceof로 타입을 정제할 수 있는데, 자신만의 타입 가드가 필요한 경우, 이때는 is 연산자를 사용한다.
  - is 연산자는 매개변수 하나에만 적용할 수 있다. 유니온이나 인터섹션 같은 복합 타입에도 적용할 수 있다.

```tsx
function isString(value: number | string | null): value is string {
  return typeof value === "string"; // 타입가드
}
```

- 위와 같은 타입가드 방식을 사용하지 않으면, 캡슐화가 된 가독성 좋은 함수를 활용하지 못하고, 대신 typeof나 instanceof 타입가드를 코드에 일일이 추가해야 한다.

```tsx
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function checkInput(input: string | number) {
  if (isString(input)) {
    console.log(input.toUpperCase());
  }
}
```

## .d.ts 파일 생성

https://typescript-kr.github.io/pages/declaration-files/creating-dts-files-from-js.ht

## .d.ts 에 대한 테스트를 하려면 tsd를 이용해라

https://github.com/SamVerschueren/tsd

## unknown과 any의 차이

- unknwon

## keyof 연산자

- keyof을 이용하여 객체의 모든 키를 문자열 리터럴 타입 유니온으로 얻을 수 있다.

```tsx
interface Test {
  a: string;
  b: string;
}

type TestList = keyof Test;
```

## this

- this
  - 함수에서 this를 사용할 때는 기대하는 this 타입을 함수의 첫 번째 매개변수로 선언해야 한다.
    - 그러면 함수 안에 등장하는 모든 this가 의도한 this가 됨을 타입스크립트가 보장해준다.(함수 시그니처에서 사용한 this는 예약어이므로, 다른 매개변수와 완전히 다른 방식으로 처리된다)
  ```tsx
  // 런타임 에러 발생(bad)
  function getNextYear() {
    return this.getFullYear() + 1;
  }

  getNextYear.call(new Date()); // 2023

  getNextYear(); // 런타임 에러 Uncaught TypeError: this.getFullYear is not a function
  ```
  - 타입스크립트에 정보를 제공한 덕분에, 런타임 에러 대신 컴파일 타임에 경고한다. (noImplicitThis 추천)
  ```tsx
  // 컴파일 타임 때 미리 에러 잡음(good)
  function getNextYear(this: Date) {
    //첫 번째 매개변수에 this 타입 선언
    return this.getFullYear() + 1;
  }

  getNextYear.call(new Date()); // 2023

  getNextYear(); // 컴파일타임 에러 Uncaught SyntaxError: Unexpected token 'this'
  ```
