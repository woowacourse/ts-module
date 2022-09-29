/**
 * 객체에서 일부 속성 값만 추출해서 만든 새로운 객체를 반환합니다.
 *
 * @param object 대상 객체
 * @param props 선택할 속성의 배열
 * @returns 대상 객체 중 선택한 속성만으로 구성된 새로운 객체
 */
export default function pick<
  T extends Record<string, unknown>,
  U extends Partial<keyof T>
>(object: T, props: U[]): Pick<T, U> {
  return props.reduce((acc, curr) => {
    acc[curr] = object[curr];
    return acc;
  }, {} as Pick<T, U>);
}
