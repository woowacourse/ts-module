/**
 * @jest-environment jsdom
 */
import { expectType } from 'tsd';

import _ from '../src';

describe('DOM API 확인', () => {
	const buttonElement = _('div > button.test-btn');
	const buttonElementButAssertedAsImg = _<HTMLImageElement>(
		'div > button.test-btn',
	);

	test('Selector', () => {
		expectType<HTMLButtonElement | null>(buttonElement);
		expectType<HTMLImageElement | null>(buttonElementButAssertedAsImg);
	});

	test('addEvent', () => {
		buttonElement?.addEvent('click', function (event) {
			expectType<MouseEvent>(event);
		});
	});
});

describe('유틸 API 확인', () => {
	test('shuffle', () => {
		const complexArray = [1, '2', Symbol(3), void 4, { foo: new Set([5]) }];
		const shuffled = _.shuffle(complexArray);

		expectType<typeof complexArray>(shuffled);
	});

	test('pick', () => {
		const object = {
			a: 'a',
			b: {
				bb: 'bb',
			},
			c: undefined,
		};
		const picked = _.pick(object, ['b', 'c']);

		expectType<Pick<typeof object, 'b' | 'c'>>(picked);
	});

	test('omit', () => {
		const object = {
			a: 'a',
			b: {
				bb: 'bb',
			},
			c: undefined,
		};
		const omitted = _.omit(object, ['b', 'c', 'b']);

		expectType<Omit<typeof object, 'b' | 'c' | 'b'>>(omitted);
	});

	test('memoize', () => {
		const sum = (a: number, b: number) => a + b;
		const memoized = _.memoize(sum);
		const memoizedWithResolver = _.memoize(sum, (...args) => args.join('.'));

		expectType<typeof sum>(memoized);
		expectType<typeof sum>(memoizedWithResolver);
	});

	test('debounce', () => {
		const foo = () => {
			return true;
		};
		const debounced = _.debounce(foo, 100);

		expectType<(...args: Parameters<typeof foo>) => void>(debounced);
	});

	test('throttle', () => {
		const foo = () => {
			return true;
		};
		const throttled = _.throttle(foo, 100);

		expectType<(...args: Parameters<typeof foo>) => void>(throttled);
	});

	test('clickOutside', () => {
		_.clickOutside('#foo', (e) => {
			expectType<MouseEvent>(e);
		});
	});
});
