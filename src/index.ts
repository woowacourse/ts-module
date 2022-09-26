function _(selector: string) {
  const element = <HTMLElement>document.querySelector(selector);

  const getElement = () => element;

  const innerHTML = () => element.innerHTML;

  const show = () => {
    element.style.display = '';
  };

  const hidden = () => {
    element.style.display = 'none';
  };

  const addEvent = <K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ) => {
    element.addEventListener(type, listener, options);
  };

  return {
    getElement,
    innerHTML,
    show,
    hidden,
    addEvent,
  };
}

module _ {
	export function fetch() {
		return {};
	}

	export function isNull() {}

	export function isNil() {}

	export function isNumber() {}

	export function isFunction() {}

	export function shuffle() {}

	export function pick() {}

	export function omit() {}

	export function memoize() {}

	export function debounce() {}

	export function throttle() {}

	export function clickOutside() {}
}

export default _;
