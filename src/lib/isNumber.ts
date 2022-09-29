function isNumber(value: unknown): value is Number {
  return typeof value === 'number'
}

export default isNumber
