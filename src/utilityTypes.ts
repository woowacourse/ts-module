// Array
export type GetFirst<A extends any[]> = A[0] extends any ? A[0] : never;
export type GetLast<A> = A extends []
	? never
	: A extends [any]
	? A[0]
	: A extends [any, ...infer R]
	? GetLast<R>
	: never;

// String
export type Split<
	S extends string,
	Delimeter extends string,
> = S extends `${infer T}${Delimeter}${infer U}`
	? [T, ...Split<U, Delimeter>]
	: [S];
type TrimLeft<S extends string> = S extends ` ${infer R}` ? TrimLeft<R> : S;
type TrimRight<S extends string> = S extends `${infer R} ` ? TrimRight<R> : S;
export type Trim<S extends string> = TrimLeft<TrimRight<S>>;

// DOM
type ClassSelector = '.';
type IDSelector = '#';
type AttributeSelector = '[';
type BasicSelectors = ClassSelector | IDSelector | AttributeSelector;

type PseudoClasses = ':';

type DescendantCombinator = ' ';
type ChildCombinator = '>';
type GeneralSiblingCombinator = '~';
type AdjacentSiblingCombinator = '+';
type ColumnCombinator = '|';
type Combinators =
	| DescendantCombinator
	| ChildCombinator
	| GeneralSiblingCombinator
	| AdjacentSiblingCombinator
	| ColumnCombinator;

/**
 * Query를 기본 선택자와 가상 클래스 선택자로 스플릿한 후 첫번째 문자열 타입을 반환한다.
 * SplitWithSelctor<'a.b.c', '.'>: 'a'
 */
type SplitWithSelctor<
	Query extends string,
	Selector extends BasicSelectors | PseudoClasses,
> = GetFirst<Split<Query, Selector>>;

/**
 * 토큰에서 태그명을 추출한다.
 * TagNameFromToken<`a[href="#"].class#id:hover`>: 'a'
 */
type TagNameFromToken<Token extends string> = SplitWithSelctor<
	SplitWithSelctor<
		SplitWithSelctor<SplitWithSelctor<Token, ClassSelector>, IDSelector>,
		AttributeSelector
	>,
	PseudoClasses
>;

/**
 * 하나의 쿼리에서 마지막 토큰을 추출한다.
 * LastToken<'section > div ~ span+button.submit-button'>: 'button.submit-button'
 */
type LastToken<SingleQuery extends string> = GetLast<
	Split<Trim<SingleQuery>, Combinators>
>;

/**
 * 태그명과 일치하는 HTML 요소 타입을 반환한다. 일치하는 요소가 없다면 Element를 반환한다.
 * GetHTMLElementByTagName<'div'>: HTMLDivElement
 * GetHTMLElementByTagName<'zxcmvb'>: Element
 */
export type GetHTMLElementByTagName<T extends string> =
	T extends keyof HTMLElementTagNameMap
		? HTMLElementTagNameMap[T]
		: T extends keyof SVGElementTagNameMap
		? SVGElementTagNameMap[T]
		: Element;

export type QueriedHTMLElement<Query extends string> = GetHTMLElementByTagName<
	TagNameFromToken<LastToken<Query>>
>;
