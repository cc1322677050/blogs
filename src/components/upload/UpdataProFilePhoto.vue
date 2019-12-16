<template> 
  <div>
    <section>
      <el-upload class="img-btn" action="#"
                 :show-file-list="false"
                 :before-upload="beforeAvatarUploads"
                 :http-request="uploadImg">
        <img v-if="!progressFlag" class="head-img" :src="imageUrl" />
        <div v-show="progressFlag">
          <el-progress type="circle" :percentage="progressPercent"></el-progress>
        </div>
      </el-upload>
    </section>
  </div>
</template>

<script>
  import axios from 'axios'
  import {beforeAvatarUpload} from "@/utils/imageSize"
  import {getToken} from '@/utils/auth'

  export default {
      name: "UpdataProFilePhoto",
      data() {
        return {
          progressFlag: false,
          progressPercent: 0,
          imageUrl: this.$store.getters.avatar,
          token:getToken()
        };
      },
      methods: {
        uploadImg(f) {
          console.log(this.token)
          console.log(process.env.BASE_API+"/updata/single/imgage")
          this.progressFlag = true
          let formdata = new FormData()
          formdata.append('image', f.file)
          axios({
            headers: {
              Authorization: this.token   // 我上传的时候请求头需要带上token 验证，不需要的删除就好
            },
            url: process.env.BASE_API+"/updata/single/imgage",
            method: 'post',
            data: formdata,
            onUploadProgress: progressEvent => {
              this.progressPercent = (progressEvent.loaded / progressEvent.total * 100)
            }
          }).then(res => {
            this.imageUrl = res.data.data;
            this.$emit("imageurl",this.imageUrl);//自定义事件  传递值“子向父组件传值”
            if (this.progressPercent === 100) {
              this.progressFlag = false
              this.progressPercent = 0
            }
          }).then(error => {
            console.log(error)
          })
        },
        // 上传图片前的过滤
        beforeAvatarUploads(file) {
          beforeAvatarUpload(file)
        }
      }
    }
</script>

<style scoped>
  .img-btn{
    margin-top: 1%;
    width: auto;
    height: auto;
  }
  .head-img{
    margin-top: 1%;
    width: 750px;
    height: 500px;
    border-radius:5px 5px 5px 5px;
  }
</style>
