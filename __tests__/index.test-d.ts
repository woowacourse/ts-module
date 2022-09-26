import { expectType } from "tsd";
import _ from "../dist/index";

_(".button").addEvent("click", function (event) {
	expectType<MouseEvent>(event);
});

expectType<boolean>(_.isNull(null));
expectType<boolean>(_.isNil(null));
expectType<boolean>(_.isNumber(1));
expectType<boolean>(_.isFunction(() => {}));
expectType<Array<number | string>>(_.shuffle([1, "a", 3]));

expectType<(value: any) => value is null>(_.isNull);

expectType<() => void>(_.fetch); // d.ts들어가서 타입만 본다....
// expectType<() => void>(_.shuffle);

// 모든 타입 테스트
// pick, omit, memoize, debounce, throttle,  debounce, clickOutside...
