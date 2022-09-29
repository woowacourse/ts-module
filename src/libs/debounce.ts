/**
 * debounce
 *
 * @param {Function} callback
 *
 * @param {number} delay
 *
 * @returns {void}
 */
export default function debounce(callback: Function, delay: number) {
  let timer: NodeJS.Timeout | null = null;

  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function (this: unknown) {
      callback.apply(this, arguments);
    }, delay);
  };
}
