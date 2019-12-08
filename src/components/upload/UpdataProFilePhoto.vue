<template> 
  <div>
    <section>
      <el-upload class="img-btn" action="#"
                 :show-file-list="false"
                 :before-upload="beforeAvatarUpload"
                 :http-request="uploadImg">
        <img v-if="!progressFlag" class="head-img" :src="imageUrl" v-model="avatar" />
        <div v-show="progressFlag">
          <el-progress type="circle" :percentage="progressPercent"></el-progress>
        </div>
      </el-upload>
    </section>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapGetters } from 'vuex'

  export default {
      computed: {
        ...mapGetters([
          'avatar',
        ])
      },
      name: "UpdataProFilePhoto",
      data() {
        return {
          progressFlag: false,
          progressPercent: 0,
          imageUrl: require("@/assets/logo.png")
        };
      },
      methods: {
        uploadImg(f) {
          this.progressFlag = true
          let formdata = new FormData()
          formdata.append('image', f.file)
          axios({
            url: process.env.BASE_API+"/updata/single/imgage",
            method: 'post',
            data: formdata,
            onUploadProgress: progressEvent => {
              this.progressPercent = (progressEvent.loaded / progressEvent.total * 100)
            }
          }).then(res => {
            this.imageUrl = res.data.data
            if (this.progressPercent === 100) {
              this.progressFlag = false
              this.progressPercent = 0
            }
          }).then(error => {
            console.log(error)
          })
        },
        // 上传图片前的过滤
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg'
          const isLt2M = (file.size / 1024 / 1024) < 2
          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!')
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!')
          }
          return isJPG && isLt2M
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
    width: 85px;
    height: 85px;
    border-radius:5px 5px 5px 5px;
  }
</style>
