import request from "@/utils/request"

export function getCount(userId) {
  return request({
      url:"/home/count/"+userId,
      method:"GET",
  })
}
