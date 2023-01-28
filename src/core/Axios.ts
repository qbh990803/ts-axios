import {
  AxiosRequestConfig,
  AxiosPromise,
  Method,
  AxiosResponse,
  ResolvedFn,
  RejectedFn
} from '../types'
import dispatchRequest, { transformURL } from './dispatchRequest'
import InterceptorManager from './InterceptorManager'
import mergeConfig from './mergeConfig'

interface Interceptor {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise)
  rejected?: RejectedFn
}

class Axios<T> {
  defaults: AxiosRequestConfig
  interceptors: Interceptor

  constructor(initConfig: AxiosRequestConfig) {
    this.defaults = initConfig
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }

  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }

    config = mergeConfig(this.defaults, config)

    const chain: PromiseChain<any>[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]

    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })

    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })

    let promise = Promise.resolve(config)

    while (chain.length) {
      const { resolved, rejected } = chain.shift()!

      promise = promise.then(resolved, rejected)
    }

    return promise
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

  getUrl(config?: AxiosRequestConfig): string {
    config = mergeConfig(this.defaults, config)
    return transformURL(config)
  }
}

export default Axios
