/**
 * 객체에서 일부 속성 값만 제거해서 만든 새로운 객체를 반환합니다.
 *
 * @param object 대상 객체
 * @param props 제거할 속성의 배열
 * @returns 대상 객체에서 선택한 속성을 제거한 새로운 객체
 */
export default function omit<
  T extends Record<string, unknown>,
  U extends Partial<keyof T>
>(object: T, props?: U[]): Omit<T, U> {
  return props === undefined
    ? object
    : props.reduce((acc, curr) => {
        delete acc[curr];
        return acc;
      }, object);
}
