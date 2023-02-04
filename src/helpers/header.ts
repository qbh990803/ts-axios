import { Method } from '../types'
import { deepMerge, isPlainObject } from './util'

function normalizedHeaderName(headers: any, normalizedName: string) {
  if (!headers) return

  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any) {
  normalizedHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}

export function parseHeaders(headers: any) {
  const parsed = Object.create(null)

  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach((element: string) => {
    let [key, ...vals] = element.split(':')
    key = key.trim().toLowerCase()

    if (!key) {
      return
    }
    const val = vals.join(':').trim()
    parsed[key] = val
  })

  return parsed
}

export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) {
    return headers
  }

  headers = deepMerge(headers.common || {}, headers[method] || {}, headers)

  const deleteHeaderMethod = ['get', 'delete', 'head', 'options', 'post', 'put', 'patch', 'common']

  deleteHeaderMethod.forEach(method => {
    delete headers[method]
  })

  return headers
}
