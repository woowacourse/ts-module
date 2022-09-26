export type PickParameterType<T extends (...rest: any[]) => any> = T extends (
  ...rest: infer P
) => any
  ? P
  : never

export type PickReturnType<T extends (...rest: any[]) => any> = T extends (
  ...rest: any[]
) => infer P
  ? P
  : never
