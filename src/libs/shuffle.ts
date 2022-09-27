/**
 * array를 무작위로 섞은 새로운 배열을 반환한다.
 *
 * @param {Array} value
 *
 * @returns {Array}
 */
export default function shuffle<T>(array: readonly T[]): T[] {
  if (!Array.isArray(array)) {
    throw new Error('shuffle(value) - value의 타입이 Array가 아닙니다.');
  }

  if (!array.length) {
    return [];
  }

  const shuffled = [...array];
  return shuffled.sort(() => Math.random() - 0.5);
}
