<template>
  <div>
    <mavon-editor v-model="markdownEditor.text"  @save="saveDoc" />
  </div>
</template>

<script>
  export default {
    data(){
      return{

      }
    },
    props:{
      //方便再次编辑
      markdownEditor:{
        text:"",
        default:""
      }
    },
    methods:{
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
