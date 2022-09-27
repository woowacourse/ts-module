/**
 * fetch()
 * @param {RequestInfo | URL} input
 * @param {RequestInit | undefined} init
 * @returns {Promise<Response>}
 */
export default function fetch(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
): Promise<Response> {
  return window.fetch(input, init);
}
