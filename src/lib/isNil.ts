function isNil(value: unknown): value is undefined {
  return value == undefined
}

export default isNil
