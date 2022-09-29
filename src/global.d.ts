export {};

declare global {
  /**
   * 두 타입이 같은 타입인지 검사하는 타입
   * @param {A} unknown
   * @param {B} unknown
   * @returns {boolean} 만약 A와 B의 타입이 같다면 true, 아니라면 false
   */
  type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B
    ? 1
    : 2
    ? true
    : false;

  /**
   * 조건에 따른 타입을 지정해주는 타입
   * @param {C} boolean
   * @param {T} unknown
   * @param {F} unknown
   * @returns {T | F} 만약 조건이 참이라면 T, 아니라면 F
   */
  type If<C extends boolean, T, F = false> = C extends true ? T : F;

  /**
   * 배열 요소들의 타입을 추출해주는 타입
   * @param {ArrayType} any
   * @returns {ElementType | never} 타입이 존재하면 ElementType, 아니라면 never
   */
  type ArrayElement<ArrayType> = ArrayType extends (infer ElementType)[]
    ? ElementType
    : never;
}
