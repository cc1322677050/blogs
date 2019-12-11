import request from "@/utils/request"

export function getLablePage(parmars) {
  return request({
    url:'/lable/list',
    method:"POST",
    params:parmars
  })
}
