import xhr from './xhr'
import { buildUrl } from '../helpers/url'
import { transformResponse } from '../helpers/data'
import { flattenHeaders } from '../helpers/header'
import { transform } from '../helpers/transform'
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig) {
  config.url = transformUrl(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

function transformUrl(config: AxiosRequestConfig): string {
  return buildUrl(config.url!, config.params)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.config, res.config.transformResponse)

  return res
}
