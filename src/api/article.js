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
    data: params
  })
}

export function addViews(articleId) {
  return request({
    url:"/article/views",
    method:"POST",
    params:{
      articleId:articleId
    }
  })
}

export function deleteArticle(articleId) {
  return request({
    url:"/article/delete/"+articleId,
    method:"POST",
  })
}

export function updataArticle(data) {
  return request({
    url:"/article/updata",
    method:"POST",
    data: data
  })
}
