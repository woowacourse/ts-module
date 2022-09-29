/**
 * throttle
 *
 * @param {Function} callback
 *
 * @param {number} delay
 *
 * @returns {void}
 */
export default function throttle(callback: Function, delay: number) {
  let timer: NodeJS.Timeout | null = null;

  return function () {
    if (!timer) {
      timer = setTimeout(function (this: unknown) {
        timer = null;
        callback.apply(this, arguments);
      }, delay);
    }
  };
}
