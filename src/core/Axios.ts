import { AxiosRequestConfig, AxiosPromise, Method } from '../types'
import dispatchRequest from './dispatchRequest'

class Axios {
  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    return dispatchRequest(config)
  }

  get(url: string, config?: AxiosRequestConfig) {
    return this._requestMethodWithOutData(url, 'get', config)
  }

  delete(url: string, config?: AxiosRequestConfig) {
    return this._requestMethodWithOutData(url, 'delete', config)
  }

  head(url: string, config?: AxiosRequestConfig) {
    return this._requestMethodWithOutData(url, 'head', config)
  }

  options(url: string, config?: AxiosRequestConfig) {
    return this._requestMethodWithOutData(url, 'options', config)
  }

  post(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.dispatchRequestWithData(url, 'post', data, config)
  }

  put(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.dispatchRequestWithData(url, 'put', data, config)
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.dispatchRequestWithData(url, 'patch', data, config)
  }

  _requestMethodWithOutData(url: string, method: Method, config?: AxiosRequestConfig) {
    return this.request(Object.assign(config || {}, { url, method }))
  }

  dispatchRequestWithData(url: string, method: Method, data?: any, config?: AxiosRequestConfig) {
    return this.request(Object.assign(config || {}, { url, method, data }))
  }
}

export default Axios
