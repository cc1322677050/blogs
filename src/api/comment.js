import request from "@/utils/request"

export function getCommentByArticleId(articleId) {
  return request({
    url:"/comment/tree/"+articleId,
    method:"POST",
  })
}

export function saveComment(data) {
  return request({
    url:"/comment/save",
    method:"POST",
    data:data
  })
}
