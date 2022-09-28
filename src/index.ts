import { QueriedHTMLElement } from './utilityTypes';

type DefaultFunction = (...args: any[]) => any;

interface ElementExtension {
	setInnerHTML(html: string): void;
	show(): void;
	hide(): void;
	addEvent<K extends keyof HTMLElementEventMap>(
		type: K,
		listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
		options?: boolean | AddEventListenerOptions,
	): void;
}

declare global {
	interface Element extends ElementExtension {}
}

function _<
	E extends Element,
	Query extends string = string,
	SelectedElement extends Element = E extends QueriedHTMLElement<Query>
		? E
		: QueriedHTMLElement<Query>,
>(selector: Query): SelectedElement | null {
	const element = document.querySelector<SelectedElement>(selector);

	if (element && element instanceof HTMLElement) {
		const setInnerHTML = (html: string) => {
			element.innerHTML = html;
		};

		const show = () => {
			element.style.visibility = 'visible';
		};

		const hide = () => {
			element.style.visibility = 'hidden';
		};

		const addEvent = <K extends keyof HTMLElementEventMap>(
			type: K,
			listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
			options?: boolean | AddEventListenerOptions,
		): void => {
			element.addEventListener(type, listener, options);
		};

		element.setInnerHTML = setInnerHTML;
		element.show = show;
		element.hide = hide;
		element.addEvent = addEvent;
	}

	return element;
}

module _ {
	export function fetch(
		input: RequestInfo | URL,
		init?: RequestInit,
	): Promise<Response> {
		return fetch(input, init);
	}

	export function isNull(value: unknown): value is null {
		return value === null;
	}

	export function isNil(value: unknown): value is null | undefined {
		return value === null || value === undefined;
	}

	export function isNumber(value: unknown): value is number {
		return typeof value === 'number' || value instanceof Number;
	}

	export function isFunction(value: unknown): value is Function {
		return typeof value === 'function';
	}

	export function random(min: number, max: number) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	export function swap(array: Array<unknown>, a: number, b: number) {
		[a, b].forEach((index) => {
			if (index < 0 || index >= array.length) {
				throw new Error(
					`Given index ${index} is out of range 0 - ${array.length}`,
				);
			}
		});

		[array[a], array[b]] = [array[b], array[a]];
	}

	export function shuffle<T>(array: T[]): T[] {
		if (!Array.isArray(array)) {
			throw new Error('Given collection is not an array.');
		}

		const shuffled = [...array];

		for (let i = 0; i < shuffled.length; i++) {
			const j = random(i, shuffled.length);

			swap(shuffled, i, j);
		}

		return shuffled;
	}

	export function pick<T extends { [key: string]: any }, K extends keyof T>(
		object: T,
		paths: K[],
	): Pick<T, K> {
		const pickedObject: Partial<Pick<T, K>> = {};

		paths.forEach((path) => {
			pickedObject[path] = object[path];
		});

		return pickedObject as Pick<T, K>;
	}

	export function omit<T extends { [key: string]: any }, K extends keyof T>(
		object: T,
		paths: K[],
	): Omit<T, K> {
		const omittedObject: T = { ...object };

		paths.forEach((path) => {
			if (Object.prototype.hasOwnProperty.call(omittedObject, path)) {
				delete omittedObject[path];
			}
		});

		return omittedObject as Omit<T, K>;
	}

	export function memoize<P extends any[], R>(
		func: (...args: P) => R,
		resolver?: (
			...args: P
		) => number | string | boolean | null | undefined | symbol | bigint,
	): (...args: P) => R {
		const cache = new Map();

		function memoizedFunc(...args: P): R {
			const key = resolver ? resolver(...args) : args[0];

			if (!cache.has(key)) {
				cache.set(key, func(...args));
			}

			return cache.get(key);
		}

		return memoizedFunc;
	}

	export function debounce<T extends DefaultFunction>(
		callback: T,
		wait: number = 0,
	) {
		let timerId: NodeJS.Timeout | null = null;
		let lastArgs: {
			current: Parameters<T> | [];
		} = {
			current: [],
		};

		return function (...args: Parameters<T>) {
			lastArgs.current = args;

			if (timerId) {
				clearTimeout(timerId);
			}

			timerId = setTimeout(() => {
				callback(...lastArgs.current);

				timerId = null;
			}, wait);
		};
	}

	export function throttle<T extends DefaultFunction>(
		callback: T,
		wait: number = 0,
	) {
		let timerId: NodeJS.Timeout | null = null;
		let lastArgs: {
			current: Parameters<T> | [];
		} = {
			current: [],
		};

		return function (...args: Parameters<T>) {
			lastArgs.current = args;

			if (timerId) {
				return;
			}

			callback(...lastArgs.current);

			timerId = setTimeout(() => {
				timerId = null;
			}, wait);
		};
	}

	export function clickOutside<E extends Element = Element>(
		selector: string,
		callback: (e: MouseEvent) => void,
	) {
		const target = _<E>(selector);

		document.addEventListener('click', callback);
		target?.addEvent('click', (e) => {
			e.stopPropagation();
		});
	}
}

export default _;
