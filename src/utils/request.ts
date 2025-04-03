import axios, { HttpStatusCode } from 'axios'
import { createUniAppAxiosAdapter } from '@uni-helper/axios-adapter'

axios.defaults.adapter = createUniAppAxiosAdapter()

export const request = axios.create({
  // baseURL 将自动加在 url 前面，除非 url 是一个绝对 URL
  baseURL: 'https://aaa.com/api',
  // timeout 指定请求超时的毫秒数(0 表示无超时时间)，如果请求花费了超过 timeout 的时间，请求将被中断
  timeout: 10 * 1000,
  // 初始化一下 query 请求对象 方便写入全局自定义参数
  params: {},
})

request.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  },
)
