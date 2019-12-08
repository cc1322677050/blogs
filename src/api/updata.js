import request from '@/utils/request'

export function updataSingle(image,progressPercent) {
  return request({
    url:'/updata/single/imgage',
    method:'POST',
    onUploadProgress: progressEvent => {
      progressPercent = (progressEvent.loaded / progressEvent.total * 100)
      console.log(progressPercent)
    },
    data: image
  })
}
