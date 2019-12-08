<template>
  <div>
    <mavon-editor v-model="markdownEditor.text" @save="saveDoc"
                  :toolbars="toolbars"
                  :ishljs="true" fontSize="15px" placeholder="欢迎来到程某开发的个人博客网站"
                  codeStyle="darcula" @imgAdd="handleEditorImgAdd"  @imgDel="handleEditorImgDel">
    </mavon-editor>
    <el-dialog
      title="上传图片中。。。。。。。。。"
      :visible.sync="dialogVisible"
      width="20%">
      <el-progress style="margin-left: 25%" type="circle" :percentage="progressPercent"></el-progress>
    </el-dialog>

  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data(){
      return{
        toolbars: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: false, // 标记
          superscript: false, // 上角标
          subscript: false, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: true, // 全屏编辑
          readmodel: false, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: false, // 帮助
          /* 1.3.5 */
          undo: true, // 上一步
          redo: false, // 下一步
          trash: false, // 清空
          save: false, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: false, // 导航目录
          /* 2.1.8 */
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          /* 2.2.1 */
          subfield: true, // 单双栏模式
          preview: true, // 预览
          boxShadow: false
        },
        markdownEditor:{
          text:""
        },
        imgFile:[],
        progressPercent:0,
        token:this.$store.getters.avatar.token,
        dialogVisible:false,
      }
    },
    methods:{
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      handleEditorImgAdd (pos, f) {
        let formdata = new FormData();
        formdata.append('image', f)
        this.imgFile[pos] = f;
        this.dialogVisible=true
        axios({
            headers: {
              Authorization: this.token   // 我上传的时候请求头需要带上token 验证，不需要的删除就好
            },
            url: process.env.BASE_API+"/updata/single/imgage",
            method: 'post',
            data: formdata,
            onUploadProgress: progressEvent => {
              this.progressPercent = (progressEvent.loaded / progressEvent.total * 100)
            }}).then(res => {
              this.dialogVisible=false;
              if (res.data.code === 200) {
                console.log("上传成功")
                let url = res.data.data
                let name = f.name
                if (name.includes('-')) {
                  name = name.replace(/-/g, '')
                }
                let content = this.markdownEditor.text;
                // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)  这里是必须要有的
                if (content.includes(name)) {
                  let oStr = `(${pos})`
                  let nStr = `(${url})`
                  let index = content.indexOf(oStr)
                  let str = content.replace(oStr, '')
                  let insertStr = (soure, start, newStr) => {
                    return soure.slice(0, start) + newStr + soure.slice(start)
                  }
                  this.markdownEditor.text = insertStr(str, index, nStr)
                }
              } else {
                this.dialogVisible=false;
                console.log("error")
            }
        })
      },
      handleEditorImgDel (pos) {
        delete this.imgFile[pos]
      },
      saveDoc(markdown, html) {
        this.$confirm('此操作将保存编辑信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // console.log(markdown)
          // console.log(html)
          this.$message({
            type: 'success',
            message: '保存成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '保存失败'
          });
        });
      }
    }
  }
</script>

<style scoped>

</style>
