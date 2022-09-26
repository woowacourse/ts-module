/**
 * @jest-environment jsdom
 */
import _ from "../src";

test("모듈은 기본 내보내기", () => {
	expect(_).toBeTruthy();
});

test("모듈에 포함된 함수 확인", () => {
	expect(typeof _.fetch).toBe("function");
});

test("모듈에 포함된 함수 확인", () => {
	expect(typeof _.pick).toBe("function");
});

test("모듈에 포함된 함수 확인", () => {
	expect(typeof _.omit).toBe("function");
});

test("Selector 동작 확인", () => {
	const divElement = document.createElement("div");
	divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
	document.body.appendChild(divElement);

	const buttonElement = _("button.test-btn").element!;
	expect(buttonElement).toBeTruthy();
	divElement.removeChild(buttonElement);
});

test('`_("").innerHTML()` 동작 확인', () => {
	const divElement = document.createElement("div");
	divElement.id = "target-div";
	document.body.appendChild(divElement);

	const myElement = _("#target-div");
	myElement.insertHTML(`<button class='test-btn'>Continue</button>`);

	const buttonElement = _("button.test-btn").element!;

	expect(buttonElement).toBeTruthy();

	myElement.element!.removeChild(buttonElement);
});

test('`_("").show()` 동작 확인', () => {});

test('`_("").hidden()` 동작 확인', () => {});

test('`_("").addEvent()` 동작 확인', () => {});

test("_.pick() 동작 확인", () => {
	expect(_.pick({ a: 1, b: 2, c: 3 }, ["a", "c"])).toStrictEqual({
		a: 1,
		c: 3,
	});
});

test("_.omit() 동작 확인", () => {
	expect(_.omit({ a: 1, b: 2, c: 3 }, ["a", "c"])).toStrictEqual({
		b: 2,
	});
});
