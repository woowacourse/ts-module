/**
 * @jest-environment jsdom
 */
import { expectType } from "tsd";

import _ from "../src";

type ResponseGetJuunzziAge = {
  juunzziAge: number;
};

window.fetch = (input: URL | RequestInfo): Promise<Response> => {
  const mockedResponse = {
    status: 200,
    ok: true,
    redirected: false,
    statusText: "ok",
    url: input,
  };

  if (input === "GET_JUUNZZI_AGE") {
    return Promise.resolve({
      ...mockedResponse,
      json() {
        return Promise.resolve({
          juunzziAge: 26,
        });
      },
    } as Response);
  }

  return Promise.resolve({
    ...mockedResponse,
    json() {
      return Promise.resolve({});
    },
  } as Response);
};

test("Event의 타입은 좁혀진다", () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
  document.body.appendChild(divElement);

  _("button.test-btn").addEvent("click", function (event) {
    expectType<MouseEvent>(event);
  });
});

test("fetch의 반환 데이터 타입은 제너릭에 삽입된 타입이다.", () => {
  _.fetch<ResponseGetJuunzziAge>("GET_JUUNZZI_AGE").then((res) => {
    expectType<ResponseGetJuunzziAge>(res);
  });
});

test("null 데이터 타입을 체크할 수 있다.", () => {
  const isNullTrue = _.isNull(null);

  expectType<boolean>(isNullTrue);
});

test("pick 메소드를 수행하면 객체의 타입이 인자로 들어가는 필드(프로퍼티)만 남도록 변경된다.", () => {
  const condition = {
    a: 10,
    b: 20,
  };

  const pickedCondition = _.pick(condition, "a");

  expectType<Pick<typeof condition, "a">>(pickedCondition);
});

test("omit 메소드를 수행하면 객체의 타입이 인자로 들어가는 필드(프로퍼티)를 제외하도록 변경된다.", () => {
  const condition = {
    a: 10,
    b: 20,
  };

  const omittedCondition = _.omit(condition, "a");

  expectType<Omit<typeof condition, "a">>(omittedCondition);
});

test("메모이제이션 된 반환 값과 일반 호출되었을 때의 반환 값은 같은 타입이어야 한다.", () => {
  const conditionFunction = () => {
    return 26;
  };

  const memoizedConditionFunction = _.memoize(conditionFunction);

  const originalReturnValue = memoizedConditionFunction();
  const memoizedReturnValue = memoizedConditionFunction();

  expectType<typeof originalReturnValue>(memoizedReturnValue);
});
