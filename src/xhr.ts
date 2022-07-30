import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import { parseHeaders } from './helpers/header'
import { transformResponse } from './helpers/data'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise(resolve => {
    const { url, method = 'get', data = null, headers, responseType } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    request.open(method.toUpperCase(), url, true)

    request.onreadystatechange = function() {
      if (request.readyState !== 4) {
        return
      }

      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      // transformResponse(request)
      // const responseData =
      //   responseType && responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: request.response,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }

      resolve(response)
    }

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      }
      request.setRequestHeader(name, headers[name])
    })

    request.send(data)
  })
}
