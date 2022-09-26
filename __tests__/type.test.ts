/**
 * @jest-environment jsdom
 */
import { expectType } from "tsd";

import _ from "../src";

// _(".button").addEvent("click", function (event) {
//   expectType<MouseEvent>(event);
// });

// fetch
expectType<Promise<Response>>(
  _.fetch("https://winnie.com", { method: "GET" }).then((data) => data.json())
);

// isNull
expectType<true>(_.isNull(null));
expectType<false>(_.isNull("winnie"));

// isNil
expectType<true>(_.isNil(null));
expectType<true>(_.isNil(undefined));
expectType<false>(_.isNil("winnie"));

// isNumber
expectType<true>(_.isNumber(1));
expectType<true>(_.isNumber(Number.MIN_VALUE));
expectType<true>(_.isNumber(Infinity));
expectType<false>(_.isNumber("winnie"));

// isFunction
expectType<true>(_.isFunction(_));
expectType<false>(_.isFunction(/abc/));

// shuffle
expectType<number[]>(_.shuffle([1, 2, 3, 4]));
expectType<string[]>(_.shuffle(["a", "b", "c", "d"]));

// pick (다시)
expectType<{ a: number; c: number }>(
  _.pick({ a: 1, b: "2", c: 3 }, ["a", "c"])
); // { 'a': 1, 'c': 3 }
expectType<{ b: string }>(_.pick({ a: 1, b: "2", c: 3 }, ["a", "b"])); // { 'a': 1, 'c': 3 }
expectType<{}>(_.pick({ a: 1, b: "2", c: 3 })); // {}
// TODO: 추가 (pick, omit 둘다)
// https://www.typescriptlang.org/play?#code/PTAEAcEsGMGsBpQHsC2kAuoBQWBmBXAO2nUiUIhlgB4AVRAaVAFMAPdZwgEwGdRZmATyS5QtAHwAKLKFnIARgCsAXGPgy5AwTwD8qgIIAnQwENB1BuPUBKVQAUqdRuIDcOKHEkBvUCdUBGRHlVACIAJhDEaFUAZlAAX0QAbRCTSNAQ+RCAXWs3D1hvXwCg0Iio2ITEVPTMkLygA

// omit
expectType<{ b: string }>(_.omit({ a: 1, b: "2", c: 3 }, ["a", "c"])); // { 'b': '2' }
expectType<{ b: string; c: number }>(_.omit({ a: 1, b: "2", c: 3 }, ["a"])); // { 'b': '2', 'c': 3 } // TODO b, c 하나 빼도 됨

// memoize
expectType<Function>(
  _.memoize((arg) => {
    return `My name is ${arg}`;
  })
);

// debounce
expectType<Function>(
  _.debounce(function () {
    console.log("winnie");
  }, 500)
);

// throttle
expectType<Function>(
  _.throttle(function () {
    console.log("winnie");
  }, 500)
);

// clickOutside: 엘리먼트 밖을 클릭했을 때 실행 할 함수를 등록 (clickOutside 구현부에서는 $element 밖을 클릭했을 때 func를 실행할 수 있도록 이벤트 리스너를 등록한다.)
// @element: 대상 엘리먼트
// @func: 실행 할 함수

const $element = document.createElement("div");

expectType<void>(
  _.clickOutside($element, function () {
    console.log("you click outside");
  })
);
