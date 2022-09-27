interface ElementExtension {
	setInnerHTML: (html: string) => void;
	show: () => void;
	hide: () => void;
	addEvent: <T extends keyof HTMLElementEventMap>(
		type: T,
		listener: (event: HTMLElementEventMap[T]) => void,
		options?: boolean | AddEventListenerOptions,
	) => void;
}

declare global {
	interface Element extends ElementExtension {}
}

type DefaultFunction = (...args: any[]) => any;

function _(selector: string) {
	const element = document.querySelector(selector);

	if (element instanceof HTMLElement) {
		function setInnerHTML(html: string) {
			if (element) element.innerHTML = html;
		}

		function show() {
			if (element instanceof HTMLElement) element.style.visibility = 'visible';
		}

		function hidden() {
			if (element instanceof HTMLElement) element.style.visibility = 'hidden';
		}

		function addEvent<T extends keyof HTMLElementEventMap>(
			type: T,
			listener: (event: HTMLElementEventMap[T]) => void,
			options?: boolean | AddEventListenerOptions,
		): void {
			if (element instanceof HTMLElement) {
				element.addEventListener(type, listener, options);
			}
		}

		element.setInnerHTML = setInnerHTML;
		element.show = show;
		element.hide = hidden;
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

	export function isFunction(value: unknown): value is DefaultFunction {
		return typeof value === 'function';
	}

	export function shuffle<T>(array: T[]): T[] {
		if (!Array.isArray(array)) {
			throw new Error('Given collection is not an array.');
		}

		const clonedArray = [...array];
		const shuffledArray: T[] = [];
		let length = clonedArray.length;

		while (length > 1) {
			shuffledArray.push(
				clonedArray.splice(Math.floor(Math.random() * length))[0],
			);
			length -= 1;
		}

		return shuffledArray;
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
	): (...args: P) => R {
		const cache = new Map();

		function memoizedFunc(...args: P): R {
			if (!cache.has(args)) {
				cache.set(args, func(...args));
			}

			return cache.get(args);
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

	export function clickOutside(
		selector: string,
		callback: (e: MouseEvent) => void,
	) {
		const outside = document.querySelector('html');
		const target = document.querySelector(selector);

		if (outside instanceof HTMLElement) {
			outside.onclick = callback;
		}

		if (target instanceof HTMLElement) {
			target.onclick = (e: MouseEvent) => {
				e.stopPropagation();
			};
		}
	}
}

export default _;
