/**
 * @jest-environment jsdom
 */
import { expectType } from "tsd";
import _ from "../src";

test("_.isNull의 타입을 테스트한다.", () => {
  expectType<Boolean>(_.isNull("asdf"));
});

test("_.isNil의 타입을 테스트한다.", () => {
  expectType<Boolean>(_.isNull("aff"));
});

test("_.isNumber의 타입을 테스트한다.", () => {
  expectType<Boolean>(_.isNull("aff"));
});

test("_.shuffle의 타입을 테스트한다.", () => {
  expectType<Array<any>>(_.shuffle(["1", 2, false]));
});

test("_.pick의 타입을 테스트한다.", () => {
  expectType<Pick<{ name: "H"; age: 23 }, "name">>(
    _.pick({ name: "H", age: 23 }, "name")
  );
  expectType<Pick<{ name: "H"; age: 23 }, "name" | "age">>(
    _.pick({ name: "H", age: 23 }, ["name", "age"])
  );
});

test("_.omit의 타입을 테스트한다.", () => {
  expectType<Omit<{ name: "H"; age: 23 }, "name">>(
    _.omit({ name: "H", age: 23 }, "name")
  );
  expectType<Omit<{ name: "H"; age: 23 }, "name" | "age">>(
    _.pick({ name: "H", age: 23 }, ["name", "age"])
  );
});

test("addEvent의 타입을 테스트한다.", () => {
  _(".button").addEvent("click", function (event) {
    expectType<MouseEvent>(event);
  });
});
