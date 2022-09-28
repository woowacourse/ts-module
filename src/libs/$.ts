import Dom from '../utils/dom';

/**
 * 엘리먼트 조작 함수
 *
 * @param {string} selector
 *
 * @returns {Dom} * Dom Class instance
 */

export default function $(selector: string) {
  return new Dom(selector);
}
