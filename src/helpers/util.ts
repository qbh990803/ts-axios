const toString = Object.prototype.toString

export function isDate(val: unknown): val is Date {
  return toString.call(val) === '[object Date]'
}

export function isPlainObject(val: unknown): val is Object {
  return toString.call(val) === '[object Object]' ? true : false
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }

  return to as T & U
}
