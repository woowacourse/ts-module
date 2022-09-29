/**
 * @jest-environment jsdom
 */
import _ from '../src/'

test('모듈은 기본 내보내기', () => {
  expect(_).toBeTruthy()
})

test('모듈에 포함된 함수 확인', () => {
  expect(typeof _.fetch).toBe('function')
})

test('모듈에 포함된 함수 확인', () => {
  expect(typeof _.pick).toBe('function')
})

test('모듈에 포함된 함수 확인', () => {
  expect(typeof _.omit).toBe('function')
})

test('Selector 동작 확인', () => {
  const divElement = document.createElement('div')
  divElement.innerHTML = `<button class='test-btn'>Continue</button>`
  document.body.appendChild(divElement)

  const buttonElement = _('button.test-btn')
  expect(buttonElement).toBeTruthy()

  buttonElement && document.body.childNodes[0].removeChild(buttonElement)
})

test('innerHTML 동작 확인', () => {
  const divElement = document.createElement('div')
  divElement.innerHTML = `<p class="test-text">Continue</p>`
  document.body.appendChild(divElement)

  const element = _('.test-text')

  if (!element) return

  element.setHTML('콤피')
  expect(element.innerHTML).toBe('콤피')
})

test('hide 동작 확인', () => {
  const element = _('.test-text')

  element?.hide()
  expect(element?.style.display).toBe('none')
})

test('show 동작 확인', () => {
  const element = _('.test-text')

  element?.show()
  expect(element?.style.display).toBe('')
})
