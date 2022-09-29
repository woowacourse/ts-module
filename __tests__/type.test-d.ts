/**
 * @jest-environment jsdom
 */
import { expectType } from "tsd";

import _ from "../lib/index";
import { DebounceThrottleOption } from "../src";

expectType<
  (
    eventType: keyof HTMLElementEventMap,
    func: (
      this: Element,
      event: Event
    ) => void
  ) => void
>(_(".button").addEvent);

expectType<(value: string) => void>(
  _(".button").innerHTML
);

expectType<() => void>(
  _(".button").show
);

expectType<() => void>(
  _(".button").hidden
);

expectType<
  (arg: unknown) => arg is null
>(_.isNull);

expectType<
  (
    arg: unknown
  ) => arg is null | undefined
>(_.isNil);

expectType<
  (arg: unknown) => arg is number
>(_.isNumber);

expectType<
  (arg: unknown) => arg is Function
>(_.isFunction);

expectType<
  (
    collection: string[]
  ) => string[] | []
>(_.shuffle);

expectType<
  (
    object: Record<string, string>,
    paths: string | string[]
  ) => Record<string, string> | null
>(_.pick);

expectType<
  (
    object: Record<string, string>,
    paths: string | string[]
  ) => Record<string, string> | null
>(_.omit);

expectType<
  (
    func: () => string,
    resolve: (
      args: Record<string, string>
    ) => string[]
  ) => () => string | null
>(_.memoize);

expectType<
  (
    func: (args: string) => void,
    wait: number,
    options?: DebounceThrottleOption
  ) => () => void | null
>(_.debounce);

expectType<
  (
    func: (args: string) => void,
    wait: number,
    options?: DebounceThrottleOption
  ) => () => void | null
>(_.throttle);

expectType<
  (
    target: HTMLElement,
    func: (e: HTMLElement) => void
  ) => void
>(_.clickOutside);
