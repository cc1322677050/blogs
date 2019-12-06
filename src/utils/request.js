import axios from 'axios'
import {Message,MessageBox} from "element-ui";
import { getToken } from '@/utils/cookie'

/**
 * 请求封装
 * @type {AxiosInstance}
 */
const service = axios.create({
  baseURL:process.env.BASE_API,
  timeout:15000
})


// request拦截器
service.interceptors.request.use(config => {
  // if (store.getters.token) {
  //   config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  // }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

service.interceptors.response.use(response =>{
  const res=response.data;
  //若状态码！=200直接返回错误
  if(res.code!==200){
    Message({
      message: res.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject('error')
  }else {
    return response.data
  }
},
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
