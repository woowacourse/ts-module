function clickOutside(clickElement: HTMLElement, targetElement: HTMLElement): boolean {
  return !targetElement.contains(clickElement)
}

export default clickOutside
