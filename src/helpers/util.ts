const toString = Object.prototype.toString

export function isDate(val: unknown): val is Date {
  return toString.call(val) === '[object Date]'
}

export function isPlainObject(val: unknown): val is Object {
  return toString.call(val) === '[object Object]' ? true : false
}
