import { AxiosRequestConfig } from './types'
export default function xhr(config: AxiosRequestConfig) {
  const { url, method = 'get', data = null } = config

  const xhr = new XMLHttpRequest()

  xhr.open(method.toUpperCase(), url, true)

  xhr.send(data)
}
