function $(selector: string) {
  const $element = document.body.querySelector(selector) as HTMLElement

  if (!$element) return

  const setHTML = (html: string): void => {
    $element.innerHTML = html
  }

  const show = () => {
    $element.style.removeProperty('display')
  }

  const hide = () => {
    $element.style.display = 'none'
  }

  const addEvent = <EventType extends keyof HTMLElementEventMap>(
    type: EventType,
    handler: (event: HTMLElementEventMap[EventType]) => void,
  ) => {
    $element.addEventListener(type, handler)
  }

  return Object.assign($element, {
    setHTML,
    show,
    hide,
    addEvent,
  })
}

export default $
