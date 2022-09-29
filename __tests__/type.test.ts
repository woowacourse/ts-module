/**
 * @jest-environment jsdom
 */

import { expectType } from 'tsd'

import _ from '../src'

test('isNull 타입 테스트', () => {
  const result = _.isNull(null)
  expectType<boolean>(result)
})

test('isNil 타입 테스트', () => {
  const result = _.isNil(undefined)
  expectType<boolean>(result)
})

test('isNumber 타입 테스트', () => {
  const result = _.isNil(1234)
  expectType<boolean>(result)
})

test('shuffle 타입 테스트', () => {
  const result = _.shuffle([1, 2, 3, 4, 'compy'])
  expectType<(number | string)[]>(result)
})

test('pick 타입 테스트', () => {
  const testValue = { a: '🦖', b: '🦕' }
  const result = _.pick(testValue, 'a')

  expectType<Record<'a', string>>(result)
})

test('omit 타입 테스트', () => {
  const testValue = { a: '🦖', b: '🦕' }
  const result = _.omit(testValue, 'a')

  expectType<Record<'b', string>>(result)
})

test('memoized 타입 테스트', () => {
  const testFunction = _.memoize((a: string) => {
    return a
  })

  type Func = (a: string) => string

  expectType<Func>(testFunction)
})

test('debounce 타입 테스트', () => {
  const testDebounced = _.debounce((text: string) => console.log(`2초 후 표시: ${text}`), 2000)

  expectType<(text: string) => void>(testDebounced)
})

test('throttle 타입 테스트', () => {
  const testThrottled = _.throttle((text: string) => console.log(`1초마다 표시: ${text}`), 1000)

  expectType<(text: string) => void>(testThrottled)
})

test('fetch 타입 테스트', () => {
  const result = _.fetch('http://localhost:9000')

  expectType<Promise<unknown>>(result)
})

test('Selector 타입 테스트', () => {
  _('.button')?.addEvent('click', function (event) {
    expectType<MouseEvent>(event)
  })
})
