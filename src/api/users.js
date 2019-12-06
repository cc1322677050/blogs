import request from '@/utils/request'

export function login(userName, userPassword) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      userName,
      userPassword
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
    url: '/user/logout',
    method: 'post'
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
