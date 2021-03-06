import { isPlainObject, isDate } from './util'

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

function formatUrl(url: string) {
  if (url.includes('#')) {
    url = url.split('#')[0]
  }

  url += url.includes('?') ? '&' : '?'

  return url
}

export function buildUrl(url: string, params?: any) {
  if (!params) return url

  const stringParam: string[] = []

  Object.keys(params).forEach(key => {
    const val = params[key]

    if (val == null) return

    let values = []
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }

    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      stringParam.push(`${encode(key)}=${encode(val)}`)
    })
  })

  return formatUrl(url) + stringParam.join('&')
}
