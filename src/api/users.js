import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/user/loginout',
    method: 'GET'
  })
}

export function register(userName, userPassword) {
  return request({
    url: '/user/register',
    method: 'post',
    data: {
      userName,
      userPassword
    }
  })
}

export function checkeUseranem(params) {
  return request({
    url: '/user/check',
    method: 'GET',
    params:params
  })
}
