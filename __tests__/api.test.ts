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

	test('모듈에 포함된 함수 확인', () => {
		expect(typeof _.fetch).toBe('function');
	});

	test('모듈에 포함된 함수 확인', () => {
		expect(typeof _.pick).toBe('function');
	});

	test('모듈에 포함된 함수 확인', () => {
		expect(typeof _.omit).toBe('function');
	});
});

describe('함수 테스트', () => {
	describe('DOM', () => {
		const divElement = document.createElement('div');
		divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
		document.body.appendChild(divElement);

		test('Selector', () => {
			const buttonElement = _('button.test-btn');
			expect(buttonElement).toBeTruthy();

			if (buttonElement) {
				divElement.removeChild(buttonElement);
			}
		});

		test('`_("").innerHTML()`~~~~', () => {});

		test('`_("").show()`~~~~', () => {});

		test('`_("").hidden()`~~~~', () => {});

		test('`_("").addEvent()`~~~~', () => {});
	});

	describe('Utils', () => {
		test('isNil', () => {
			expect(_.isNil(null)).toBe(true);
			expect(_.isNil(void 0)).toBe(true);
			expect(_.isNil(NaN)).toBe(false);
		});

		test('isNull', () => {
			expect(_.isNull(null)).toBe(true);
			expect(_.isNull(void 0)).toBe(false);
			expect(_.isNull(NaN)).toBe(false);
		});

		test('isNumber', () => {
			expect(_.isNumber(1)).toBe(true);
			expect(_.isNumber(NaN)).toBe(true);
			expect(_.isNumber(Infinity)).toBe(true);
			expect(_.isNumber('1')).toBe(false);
		});

		test('isFunction', () => {
			const func = () => {};
			const currying = () => () => {};

			expect(_.isFunction(func)).toBe(true);
			expect(_.isFunction(func())).toBe(false);
			expect(_.isFunction(currying)).toBe(true);
			expect(_.isFunction(currying())).toBe(true);
		});

		test('shuffle', () => {
			const array = [1, 2, 3, 4];
			const shuffled = _.shuffle(array);

			expect(shuffled).toHaveLength(4);
			expect(shuffled.sort()).toEqual(array.sort());
		});

		test('pick', () => {
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

		test('memoize', (done) => {
			const sum = (a: number, b: number) => a + b;

			const memoized = _.memoize(sum);

			expect(memoized(1, 2)).toEqual(3);
		});

		test('debounce', (done) => {
			let count = 0;
			const debounced = _.debounce(() => {
				count += 1;
			}, 100);

			debounced();
			debounced();
			debounced();

			sleep(90).then(() => {
				expect(count).toEqual(0);
			});

			sleep(100).then(() => {
				expect(count).toEqual(1);
				done();
			});
		});

		test('throttle', (done) => {
			let count = 0;
			const throttled = _.throttle(() => {
				count += 1;
			}, 100);

			throttled();
			throttled();
			throttled();

			expect(count).toEqual(1);

			sleep(90).then(() => {
				throttled();
				throttled();
				throttled();

				expect(count).toEqual(1);
			});

			sleep(100).then(() => {
				throttled();
				throttled();
				throttled();

				expect(count).toEqual(2);
				done();
			});
		});

		test('clickOutside', () => {
			let isOutsideClicked = false;
			const divElement = document.createElement('div');
			divElement.innerHTML = `<div id='target'>target</div><div id='outside'>outside</div>`;
			document.body.appendChild(divElement);

			const targetElement = _('#target');
			const outsideElement = _('#outside');

			expect(targetElement).toBeTruthy();
			expect(outsideElement).toBeTruthy();

			_.clickOutside('#target', () => {
				isOutsideClicked = true;
			});

			(targetElement as HTMLElement).click();

			expect(isOutsideClicked).toBe(false);

			(outsideElement as HTMLElement).click();

			expect(isOutsideClicked).toBe(true);
		});
	});
});
