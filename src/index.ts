class CustomElement {
	element;
	constructor(selector: string) {
		this.element = document.body.querySelector<HTMLElement>(selector);
	}

	insertHTML(HTMLString: string): void {
		if (_.isNull(this.element)) {
			throw "유효한 Element가 아닙니다";
		}
		this.element.innerHTML = HTMLString;
	}

	show() {
		if (_.isNull(this.element)) {
			throw "유효한 Element가 아닙니다";
		}
		this.element.style.display = "block";
	}

	hide() {
		if (_.isNull(this.element)) {
			throw "유효한 Element가 아닙니다";
		}
		this.element.style.display = "none";
	}

	addEvent<T extends keyof HTMLElementEventMap>(
		type: T,
		listener: (event: HTMLElementEventMap[T]) => void
	) {
		if (_.isNull(this.element)) {
			throw "유효한 Element가 아닙니다";
		}
		// HTMLElementEventMap

		this.element.addEventListener(type, listener);
	}
}

function _(selector: string): CustomElement {
	const customElement = new CustomElement(selector);

	return customElement;
}

module _ {
	/**
	 *
	 *
	 * @param {*} value 체크할 값
	 */
	export function fetch() {}

	/**
	 * `value`가 `null`인지 체크한다.
	 *
	 * @param {*} value 체크할 값
	 */
	export function isNull(value: any): value is null {
		return value === null;
	}

	/**
	 * `value` 가 `null` 혹은 `undefined`인지 체크한다.
	 *
	 * @param {*} value 체크할 값
	 */

	export function isNil(value: any): value is null | undefined {
		return value == null;
	}

	/**
	 * `value`가 `Number` 원시값 또는 객체로 분류될 수 있는지 체크한다.(Infinity, -Infinity, NaN이 포함된다)
	 *
	 * @param {*} value 체크할 값
	 */
	export function isNumber(value: any): value is number {
		return typeof value === "number";
	}

	/**
	 *  `value`가 `Function` 객체로 분류되는지 체크한다.
	 *
	 * @param {*} value 체크할 값
	 */
	export function isFunction(value: any): value is (...args: any[]) => any {
		return typeof value === "function";
	}

	/**
	 * 무작위로 섞인 값들의 배열을 생성한다.
	 *
	 * @param {Array} 무작위로 섞을 배열
	 * @returns {Array} 무작위로 섞인 배열을 반환한다
	 */
	export const shuffle = <T>(array: T[]): T[] => {
		const length = array === null ? 0 : array.length;
		if (!length) {
			return [];
		}
		let index = -1;
		const lastIndex = length - 1;
		const result = [...array];
		while (++index < length) {
			const rand =
				index + Math.floor(Math.random() * (lastIndex - index + 1));
			const value = result[rand];
			result[rand] = result[index];
			result[index] = value;
		}
		return result;
	};

	/**
	 * 객체에서 추출된 속성으로 구성된 객체를 만든다
	 *
	 * @param {*} object 추출할 대상 객체
	 * @param {*} targetList 추출하려는 리스트
	 * @returns {*} 새 객체를 반환한다
	 *
	 * const object = {'a': 1, 'b': 2, 'c': 3}
	 *
	 * pick(object, ['a','c'])
	 * // => {'a':1, 'c':3}
	 */
	type pick = <T extends object, U extends keyof T>(
		object: T,
		targetList: Array<U>
	) => Pick<T, U> | {};

	export const pick: pick = (object, targetList) => {
		if (object === null) {
			return {};
		}

		const pickedObject = {};

		Object.keys(object).forEach((key, index) => {
			targetList.forEach(target => {
				if (target === key) {
					Object.assign(pickedObject, {
						[key]: Object.values(object)[index],
					});
				}
			});
		});

		return pickedObject;
	};

	type ObjectType<T extends string | number | symbol> = {
		[key in T]: T;
	};
	/**
	 * 생략할 리스트를 전달한 후 객체에서 생략되지 않은 속성들로 구성된 객체를 반환한다.
	 *
	 * @param {*} value 체크할 값
	 */
	type omit = <T extends object, K extends keyof T>(
		object: T,
		targetList: Array<K>
	) => Omit<T, K> | {};
	export const omit: omit = (object, targetList) => {
		if (!targetList.length) return object;
		if (object === null) {
			return {};
		}
		const omittedObject: ObjectType<string> = Object.assign({}, object);

		Object.keys(object).forEach(key => {
			targetList.forEach(target => {
				if (target === key) {
					delete omittedObject[key];
				}
			});
		});

		return omittedObject;
	};

	/**
	 *
	 *
	 * @param {*} value 체크할 값
	 */
	export function memoize() {}

	/**
	 *
	 *
	 * @param {*} value 체크할 값
	 */
	export function debounce() {}

	/**
	 *
	 *
	 * @param {*} value 체크할 값
	 */
	export function throttle() {}

	/**
	 *
	 *
	 * @param {*} value 체크할 값
	 */
	export function clickOutside() {}
}

export default _;
