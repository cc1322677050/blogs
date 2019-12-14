import { Message } from 'element-ui'
//图片大小
export  function beforeAvatarUpload(file) {
  const isLt2M = (file.size / 1024 / 1024) < 1
  if (!isLt2M) {
    Message.error('上传头像图片大小不能超过 2MB!')
  }
  return  isLt2M
}
