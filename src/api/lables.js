import request from "@/utils/request"

export function getLablePage(params) {
  return request({
    url:'/lable/list',
    method:"POST",
    params:params
  })
}

export function getArticleByLableId(labelId,params) {
  return request({
    url:"/lable/article/"+labelId,
    method:"POST",
    params:params
  })
}
