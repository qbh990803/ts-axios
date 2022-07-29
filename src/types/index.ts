export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'put'
  | 'PUT'
  | 'post'
  | 'POST'
  | 'options'
  | 'OPTIONS'
  | 'head'
  | 'HEAD'
  | 'patch'
  | 'Patch'

export interface AxiosRequestConfig {
  url: string
  method: Method
  params?: any
  data?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
}

export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise extends Promise<AxiosResponse> {}
