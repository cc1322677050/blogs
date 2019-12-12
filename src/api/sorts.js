import request from "@/utils/request"

export function getSortTree() {
  return request({
    url:'/sort/tree',
    method:'GET',
  })
}
