<template>
  <div>
    <mavon-editor v-model="article.articleMarkdown" @save="saveDoc" style="height: 1000px"
                  :ishljs="true" fontSize="15px" placeholder="欢迎来到程某开发的个人博客网站"
                  codeStyle="darcula" @imgAdd="handleEditorImgAdd"  @imgDel="handleEditorImgDel">
    </mavon-editor>
    <el-dialog
      title="上传图片中。。。。。。。。。"
      :visible.sync="image.dialogVisible"
      width="20%">
      <el-progress style="margin-left: 25%" type="circle" :percentage="progressPercent"></el-progress>
    </el-dialog>
    <el-dialog
      title="文章设置"
      :visible.sync="dialogVisible"
      width="40%">
      <el-input type="text" v-model="article.articleTitle"  placeholder="请为文章设置一个标题" required="true"></el-input>
      <el-divider content-position="left">请为文章设置封面</el-divider>
      <updataImage v-on:imageurl="listenToImageUrl"  :imageUrl="this.article.mark"></updataImage>
      <el-divider content-position="left">请简要描述文章内容</el-divider>
      <textarea style="width: 100%;height: 150px" v-model="article.description"></textarea>
      <el-divider content-position="left">请为文章设置分类</el-divider>
        <el-tree
          :data="treedata"
          show-checkbox
          ref="tree"
          @check-change="handleCheckChange"
          :props="defaultProps">
        </el-tree>
      <el-divider content-position="left">请为文章设置标签</el-divider>
      <div>
        <span style="margin-right:20px;">
           <el-checkbox-group v-model="article.labels">
              <el-checkbox v-for="(item, index) in lables" :key="item.labelId" :label="item">{{item.labelName}}</el-checkbox>
            </el-checkbox-group>
        </span>
        <div style="text-align: center">
          <el-pagination
            small
            layout="prev, pager, next,total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="listQuery.pageSize"
            :current-page.sync="listQuery.pageNum"
            :total="total">
          </el-pagination>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="saveDocs" size="small">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import updataImage from '@/components/upload/updataImage'
  import axios from 'axios'
  import {beforeAvatarUpload} from '@/utils/imageSize'
  import {getLablePage} from '@/api/lables'
  import {getSortTree} from '@/api/sorts'
  import {savaArticle} from '@/api/article'
  import {getToken} from '@/utils/auth'


  export default {
    data(){
      return{
        listQuery: {
          pageNum: 1,
          pageSize: 10
        },
        defaultProps: {
          label: 'sortName',
          children: 'children'
        },
        total:0,
        lables:[],
        treedata:[],
        checkedItem:[],
        image:{
          dialogVisible:false
        },
        imgFile:[],
        progressPercent:0,
        token:getToken(),//获取当前用户的token令牌
        dialogVisible:false,
        article:{
          userId:this.$store.getters.userId,
          description:"",
          mark:"",
          articleTitle:"",
          articleContent:"",
          articleMarkdown:"",
          sorts:[],
          labels:[]
        },
      }
    },
    methods:{
      listenToImageUrl($event){
          this.article.mark=$event
      },
      getTreeSort() {
        getSortTree().then(res=>{
          this.treedata=res.data
        })
      },
      getLables(){
        getLablePage(this.listQuery).then(res=>{
          this.lables=res.data.records;
          this.total = res.data.total;
        })
      },
      saveArticles(){
        if (this.article.labels.length>5){
          this.$message.error("标签个数最多是5个!");
          return;
        }
        if (this.article.sorts.length>3){
          this.$message.error("分类记号最多3个!");
          return;
        }
        savaArticle(this.article).then(res=>{
          if (res.code===200){
            this.$message.success('上传成功!');
          }else {
            this.$message.error('保存失败!');
          }
        })
      },
      handleEditorImgAdd (pos, f) {
        let formdata = new FormData();
        formdata.append('image', f)
        if(!beforeAvatarUpload(f)){
          return
        }
        this.imgFile[pos] = f;
        this.image.dialogVisible=true;
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
              if (res.data.code === 200) {
                this.image.dialogVisible=false;
                this.$message.success('图片上传成功');
                let url = res.data.data
                let name = f.name
                if (name.includes('-')) {
                  name = name.replace(/-/g, '')
                }
                let content = this.article.articleMarkdown;
                // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)  这里是必须要有的
                if (content.includes(name)) {
                  let oStr = `(${pos})`
                  let nStr = `(${url})`
                  let index = content.indexOf(oStr)
                  let str = content.replace(oStr, '')
                  let insertStr = (soure, start, newStr) => {
                    return soure.slice(0, start) + newStr + soure.slice(start)
                  }
                  this.article.articleMarkdown = insertStr(str, index, nStr)
                }
              } else {
                this.image.dialogVisible=false;
                this.$message.error('图片上传失败!');
              }
        })
      },
      handleCheckChange(){
        if (this.article.sorts.length<=3){
          this.article.sorts=this.$refs.tree.getCheckedNodes()
        }
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getLables();
      },
      handleSizeChange(val) {
        this.listQuery.pageSize = val;
        this.getLables();
      },
      handleEditorImgDel (pos) {
        delete this.imgFile[pos]
      },
      saveDoc(markdown, html) {
        this.article.articleMarkdown=markdown;
        this.article.articleContent=html;
        this.dialogVisible=true
      },
      saveDocs(){
        this.$confirm('此操作将保存编辑信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.saveArticles()
          this.dialogVisible = false
        }).catch(() => {
          this.$message.info( '保存失败');
        });
      }
    },created() {
      this.getTreeSort();
      this.getLables();
    },components:{
      updataImage
    }
  }
</script>

<style scoped>

</style>
