import request from "@/utils/request"
import user from "../store/modules/user";


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

export function likeArticle(userId,articleId) {
  return request({
    url:"/article/like/"+userId,
    method:"GET",
    params:{
      articleId:articleId
    }
  })
}

export function dislikeArticle(userId,articleId) {
  return request({
    url:"/article/like/"+userId,
    method:"DELETE",
    params:{
      articleId:articleId
    }
  })
}

