import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
} from 'axios'
import { enqueueSnackbar } from 'notistack'

/** 完全原始的 axios client */
const rawClient = axios.create()

const axiosSimpleConfig: CreateAxiosDefaults = {
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 60000,
}

/** 简版 client，只提供了默认配置，不使用拦截器 */
const simpleClient = axios.create(axiosSimpleConfig)
simpleClient.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

/** 自定义追加的 axios 请求配置 */
interface IAxiosRequestConfigExtend {
  /** 设为 `true` 可以禁用全局错误响应提示，默认 `false` */
  quiet?: boolean

  /** 对于成功的请求会提取数据的 `data` 字段返回，设为 `false` 则不会提取数据，默认 `true` */
  extractSuccessData?: boolean

  /** 对于失败的请求，设为 `true` 会提取 `data` 字段，默认 `false` */
  extractErrorData?: boolean
}

interface IAxiosRequestConfig<P = any> extends AxiosRequestConfig<P>, IAxiosRequestConfigExtend {}

const axiosDefaultConfig: CreateAxiosDefaults & IAxiosRequestConfigExtend = {
  ...axiosSimpleConfig,
  quiet: false,
  extractSuccessData: true,
  extractErrorData: false,
}

/** 默认的 axios client */
export interface IAxiosClient extends AxiosInstance {
  request<R = any, P = any>(config: IAxiosRequestConfig<P>): Promise<R>

  get<R = any, P = any>(url: string, config?: IAxiosRequestConfig<P>): Promise<R>
  delete<R = any, P = any>(url: string, config?: IAxiosRequestConfig<P>): Promise<R>
  head<R = any, P = any>(url: string, config?: IAxiosRequestConfig<P>): Promise<R>
  options<R = any, P = any>(url: string, config?: IAxiosRequestConfig<P>): Promise<R>

  post<R = any, P = any>(url: string, data?: P, config?: IAxiosRequestConfig<P>): Promise<R>
  put<R = any, P = any>(url: string, data?: P, config?: IAxiosRequestConfig<P>): Promise<R>
  patch<R = any, P = any>(url: string, data?: P, config?: IAxiosRequestConfig<P>): Promise<R>

  postForm<R = any, P = any>(url: string, data?: P, config?: IAxiosRequestConfig<P>): Promise<R>
  putForm<R = any, P = any>(url: string, data?: P, config?: IAxiosRequestConfig<P>): Promise<R>
  patchForm<R = any, P = any>(url: string, data?: P, config?: IAxiosRequestConfig<P>): Promise<R>
}

const client: IAxiosClient = axios.create(axiosDefaultConfig)
client.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

/** 处理错误响应 */
function errorResponseHandler(error?: AxiosResponse<IErrorBody<any>> | AxiosError) {
  if (typeof (error as AxiosResponse<IErrorBody>)?.data?.message === 'string') {
    enqueueSnackbar((error as AxiosResponse<IErrorBody>)?.data?.message, { variant: 'error' })
  } else if (typeof (error as AxiosError)?.message === 'string') {
    enqueueSnackbar((error as AxiosError)?.message, { variant: 'error' })
  }
}

// 拦截器配置
client.interceptors.response.use(
  function (response: AxiosResponse) {
    const config: IAxiosRequestConfig = response.config
    const { quiet, extractSuccessData, extractErrorData } = config

    const reponseBody: IResponseBody = response.data

    // 如果响应的 body 不为对象，此处不认为是错误，直接返回
    if (typeof reponseBody !== 'object') {
      return Promise.resolve(reponseBody)
    }

    // 处理业务错误
    if (reponseBody.success === false) {
      if (!quiet) {
        errorResponseHandler(response)
      }

      return Promise.reject(extractErrorData ? (reponseBody as IErrorBody)?.data : reponseBody)
    }

    return Promise.resolve(
      (extractSuccessData ? (reponseBody as ISuccessBody)?.data : reponseBody) || null
    )
  },

  // 处理原生请求错误
  function (error: AxiosError<IErrorBody>) {
    const config: IAxiosRequestConfig | undefined = error.config
    const { quiet, extractErrorData } = config || axiosDefaultConfig

    if (!quiet) {
      errorResponseHandler(error)
    }

    return Promise.reject(
      extractErrorData
        ? error?.response?.data
        : {
            success: false,
            data: error?.response?.data,
            message: error.message,
            code: error?.response?.status,
          }
    )
  }
)

export { rawClient, simpleClient, client }
