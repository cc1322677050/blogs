import request from "@/utils/request"


export function  savaArticle(data) {
  return request({
    url:"/article/save",
    method: "POST",
    data:data
  })
}

export function fetListArticle(params) {
  return request({
    url:"/article/list",
    method:"POST",
    params:params
  })
}
