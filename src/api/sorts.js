import request from "@/utils/request"

export function getSortTree(data) {
  return request({
    url:'/sort/tree',
    method:'GET',
    data:""
  })
}
