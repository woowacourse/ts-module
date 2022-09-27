function $(selector: string) {
  const $element = document.body.querySelector(selector) as HTMLElement

  if (!$element) return

  const innerHTML = (html: string): void => {
    $element.innerHTML = html
  }

  const show = () => {
    $element.hidden = false
  }

  const hidden = () => {
    $element.hidden = true
  }

  const addEvent = <EventType extends keyof HTMLElementEventMap>(
    type: EventType,
    handler: (event: HTMLElementEventMap[EventType]) => void,
  ) => {
    $element.addEventListener(type, handler)
  }

  return Object.assign($element, {
    innerHTML,
    show,
    hidden,
    addEvent,
  })
}

export default $
