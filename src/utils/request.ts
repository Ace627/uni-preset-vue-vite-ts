import axios, { HttpStatusCode } from 'axios'
import { createUniAppAxiosAdapter } from '@uni-helper/axios-adapter'

axios.defaults.adapter = createUniAppAxiosAdapter()

export const request = axios.create({
  // baseURL 将自动加在 url 前面，除非 url 是一个绝对 URL
  baseURL: import.meta.env.VITE_BASE_URL,
  // timeout 指定请求超时的毫秒数(0 表示无超时时间)，如果请求花费了超过 timeout 的时间，请求将被中断
  timeout: 0,
})

request.interceptors.request.use(
  (config) => {
    config.params = config.params || {}
    // 给 get 请求加上时间戳参数，避免从缓存中拿数据
    if (config.method?.toUpperCase() === 'GET') Reflect.set(config.params, 'timestamp', Date.now().toString())
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

request.interceptors.response.use(
  (response) => {
    // 未设置状态码则默认成功状态
    let code = response.data.code || HttpStatusCode.Ok
    // 获取错误信息
    let message = response.data.message || `系统未知错误，请反馈给管理员`
    // 非二进制且状态码为成功状态码 直接返回具体数据 {code, message, result, timestamp}
    if (code === HttpStatusCode.Ok) {
      return response.data.result
    }
    // 能到这里的基本都是异常返回了
    uni.showModal({ title: '系统提示', content: message, showCancel: false }) // 此处可统一处理错误的提示消息
    return Promise.reject(new Error(message))
  },
  (error) => {
    let { message } = error

    if (message == 'Network Error') {
      message = '后端接口连接异常'
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时'
    } else if (message.includes('Request failed with status code')) {
      message = `系统接口 ${message.substr(message.length - 3)} 异常`
    } else if (message.includes('not in domain list')) {
      message = '服务器域名未配置'
    }

    uni.showModal({ title: '系统提示', content: message, showCancel: false })

    return Promise.reject(error)
  },
)
