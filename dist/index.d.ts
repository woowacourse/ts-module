import { CustomNode, FetchOptions, FetchResponse } from "./@types";
declare function _(selector: string): CustomNode;
declare module _ {
  function fetch<T = any>(
    url: string,
    options?: FetchOptions
  ): Promise<FetchResponse<T>>;
  function isNull(value: unknown): boolean;
  function isNil(value: unknown): boolean;
  function isNumber(value: unknown): boolean;
  function isFunction(value: unknown): boolean;
  function shuffle<T>(array: Array<T>): Array<T>;
  function pick(
    object: Record<string, unknown>,
    type: string | string[]
  ): Record<string, unknown>;
  function omit(
    object: Record<string, unknown>,
    type: string | string[]
  ): Record<string, unknown>;
  function memoize<T>(
    func: (value: unknown) => T
  ): (...args: unknown[]) => unknown;
  function debounce(callback: Function, delay: number): (e: unknown) => void;
  function throttle(callback: Function, delay: number): () => void;
  function clickOutside(element: HTMLElement, callback: Function): void;
}
export default _;
