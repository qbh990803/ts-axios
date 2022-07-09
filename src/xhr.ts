import { AxiosRequestConfig } from './types'
export default function xhr(config: AxiosRequestConfig) {
  const { url, method = 'get', data = null, headers } = config

  const xhr = new XMLHttpRequest()

  xhr.open(method.toUpperCase(), url, true)

  Object.keys(headers).forEach(name => {
    if (data === null && name.toLowerCase() === 'content-type') {
      delete headers[name]
    }
    xhr.setRequestHeader(name, headers[name])
  })

  xhr.send(data)
}
