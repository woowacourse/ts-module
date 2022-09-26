declare function _(selector: string): any;

declare module _ {
  export function fetch(): void;

  export function isNull(value: unknown): boolean;

  export function isNil(): void;

  export function isNumber(): void;

  export function isFunction(): void;

  export function shuffle(): void;

  export function pick(): void;

  export function omit(): void;

  export function memoize(): void;

  export function debounce(): void;

  export function throttle(): void;

  export function clickOutside(): void;

  export function test(): void;
}

export default _;
