/**
 * @jest-environment jsdom
 */
import _ from '../src';

const sleep = (timeout: number) =>
	new Promise<void>((resolve) => {
		setTimeout(() => {
			resolve();
		}, timeout);
	});

describe('모듈 테스트', () => {
	test('모듈은 기본 내보내기', () => {
		expect(_).toBeTruthy();
	});
});

describe('DOM 유틸 테스트', () => {
	const divElement = document.createElement('div');
	divElement.innerHTML = `<div><button class='test-btn'>Continue</button></div>`;
	document.body.appendChild(divElement);
	const buttonElement = _('div > button.test-btn');

	test('Selector', () => {
		expect(buttonElement).toBeTruthy();
		expect(buttonElement).toBeInstanceOf(HTMLButtonElement);
	});

	test('setInnerHTML', () => {
		if (!buttonElement) fail();

		expect(typeof buttonElement.setInnerHTML).toBe('function');
		expect(buttonElement?.innerHTML).toEqual('Continue');
		buttonElement?.setInnerHTML('test');
		expect(buttonElement?.innerHTML).toEqual('test');
	});

	test('show', () => {
		if (!buttonElement) fail();

		expect(typeof buttonElement.show).toBe('function');
		buttonElement.style.visibility = 'hidden';
		expect(buttonElement.style.visibility).toEqual('hidden');
		buttonElement?.show();
		expect(buttonElement.style.visibility).toEqual('visible');
	});

	test('hide', () => {
		if (!buttonElement) fail();

		expect(typeof buttonElement.hide).toBe('function');
		buttonElement.style.visibility = 'visible';
		expect(buttonElement.style.visibility).toEqual('visible');
		buttonElement.hide();
		expect(buttonElement.style.visibility).toEqual('hidden');
	});

	test('addEvent', () => {
		if (!buttonElement) fail();

		expect(typeof buttonElement.addEvent).toBe('function');

		let copiedTextContent: string | null = null;

		buttonElement.textContent = 'clicked';
		buttonElement.addEvent('click', (e) => {
			if (!e) return;

			copiedTextContent = (e.currentTarget as HTMLButtonElement).textContent;
		});
		buttonElement.click();
		expect(copiedTextContent).toEqual('clicked');
	});
});

describe('유틸 테스트', () => {
	afterEach(() => {
		jest.clearAllTimers();
	});

	test('fetch', () => {
		expect(typeof _.fetch).toBe('function');
	});

	test('isNil', () => {
		expect(typeof _.isNil).toBe('function');
		expect(_.isNil(null)).toBe(true);
		expect(_.isNil(void 0)).toBe(true);
		expect(_.isNil(NaN)).toBe(false);
	});

	test('isNull', () => {
		expect(typeof _.isNull).toBe('function');
		expect(_.isNull(null)).toBe(true);
		expect(_.isNull(void 0)).toBe(false);
		expect(_.isNull(NaN)).toBe(false);
	});

	test('isNumber', () => {
		expect(typeof _.isNumber).toBe('function');
		expect(_.isNumber(1)).toBe(true);
		expect(_.isNumber(NaN)).toBe(true);
		expect(_.isNumber(Infinity)).toBe(true);
		expect(_.isNumber('1')).toBe(false);
	});

	test('isFunction', () => {
		expect(typeof _.isFunction).toBe('function');

		const func = () => {};
		const currying = () => () => {};

		expect(_.isFunction(func)).toBe(true);
		expect(_.isFunction(func())).toBe(false);
		expect(_.isFunction(currying)).toBe(true);
		expect(_.isFunction(currying())).toBe(true);
	});

	test('shuffle', () => {
		expect(typeof _.shuffle).toBe('function');

		const array = [1, 2, 3, 4];
		const shuffled = _.shuffle(array);

		expect(shuffled).toHaveLength(4);
		expect(shuffled.sort()).toEqual(array.sort());
	});

	test('pick', () => {
		expect(typeof _.pick).toBe('function');

		const object = {
			a: 'a',
			b: {
				bb: 'bb',
			},
			c: undefined,
		};
		const picked = _.pick(object, ['b', 'b', 'c']);

		expect(picked).toEqual({
			b: {
				bb: 'bb',
			},
			c: undefined,
		});
	});

	test('omit', () => {
		expect(typeof _.omit).toBe('function');

		const object = {
			a: 'a',
			b: {
				bb: 'bb',
			},
			c: undefined,
		};
		const omitted = _.omit(object, ['b', 'b', 'c']);

		expect(omitted).toEqual({ a: 'a' });
	});

	test('memoize', () => {
		expect(typeof _.memoize).toBe('function');

		const sum = (a: number, b: number) => a + b;
		const memoized = _.memoize(sum);
		const memoizedWithResolver = _.memoize(sum, (...args) => args.join('.'));

		expect(memoized(1, 2)).toEqual(3);
		expect(memoized(1, 99)).toEqual(3);
		expect(memoizedWithResolver(1, 2)).toEqual(3);
		expect(memoizedWithResolver(1, 99)).toEqual(100);
	});

	test('debounce', () => {
		jest.useFakeTimers();
		expect(typeof _.debounce).toBe('function');

		let count = 0;
		const debounced = _.debounce(() => {
			count += 1;
		}, 100);

		debounced();
		debounced();
		debounced();

		jest.advanceTimersByTime(99);

		expect(count).toEqual(0);

		jest.advanceTimersByTime(1);

		expect(count).toEqual(1);
	});

	test('throttle', () => {
		jest.useFakeTimers();
		expect(typeof _.debounce).toBe('function');

		let count = 0;
		const throttled = _.throttle(() => {
			count += 1;
		}, 100);

		throttled();
		throttled();
		throttled();

		jest.advanceTimersByTime(0);

		expect(count).toEqual(1);

		sleep(100).then(() => {
			throttled();
			throttled();
			throttled();
		});

		jest.advanceTimersByTime(100);

		expect(count).toEqual(1);
	});

	test('clickOutside', () => {
		expect(typeof _.clickOutside).toBe('function');

		let isOutsideClicked = false;
		const divElement = document.createElement('div');
		divElement.innerHTML = `<div id='target'>target</div><div id='outside'>outside</div>`;
		document.body.appendChild(divElement);

		const targetElement = document.querySelector<HTMLDivElement>('#target');
		const outsideElement = document.querySelector<HTMLDivElement>('#outside');

		expect(targetElement).toBeTruthy();
		expect(outsideElement).toBeTruthy();

		_.clickOutside<HTMLDivElement>('#target', () => {
			isOutsideClicked = true;
		});

		targetElement?.click();

		expect(isOutsideClicked).toBe(false);

		outsideElement?.click();

		expect(isOutsideClicked).toBe(true);
	});
});
