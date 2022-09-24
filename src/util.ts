export type CreateArray<
  L extends number,
  ARR extends unknown[] = []
> = ARR["length"] extends L ? ARR : CreateArray<L, [...ARR, 0]>;

export type NumberRange<
  ARR extends number[],
  Max extends number,
  RES extends number = never
> = ARR["length"] extends Max
  ? RES | Max
  : NumberRange<[...ARR, 0], Max, RES | ARR["length"]>;
