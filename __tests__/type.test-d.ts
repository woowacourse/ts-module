/**
 * @jest-environment jsdom
 */
import { expectType } from "tsd";

import _ from "../lib/index";

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

expectType<(arg: string) => boolean>(
  _.isNull
);
expectType<(arg: string) => boolean>(
  _.isNil
);
expectType<(arg: string) => boolean>(
  _.isNumber
);
expectType<(arg: string) => boolean>(
  _.isFunction
);
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
    wait: number
  ) => () => void | null
>(_.debounce);

expectType<
  (
    func: (args: string) => void,
    wait: number
  ) => () => void | null
>(_.throttle);

expectType<
  (
    target: HTMLElement,
    func: (e: HTMLElement) => void
  ) => void
>(_.clickOutside);
