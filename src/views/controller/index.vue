<template>
  <div>
      <div class="address-layout">
      </div>
      <div class="total-layout">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="total-frame">
              <img src="../../assets/file/file.png" class="total-icon"></img>
              <div class="total-title">发表文章数</div>
              <div class="total-value">{{userArticleCount}}<span>篇</span></div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="total-frame">
              <img src="../../assets/file/good.png" class="total-icon">
              <div class="total-title">获得的点赞数</div>
              <div class="total-value">5000</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="total-frame">
              <img src="../../assets/file/common.png" class="total-icon">
              <div class="total-title">收到的评论数</div>
              <div class="total-value">5000</div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="un-handle-layout">
        <div class="layout-title">我最近发表的文章</div>
        <div class="un-handle-content">
          <el-row class="art-item" v-for="(item,index) in articleList" :key="index">
            <el-card shadow="hover">
              <h5><router-link :to="{path:'/article',query:{article:JSON.stringify(item)}}" tag="span" class="art-title">{{item.articleTitle}}</router-link></h5>
              <el-row class="art-info d-flex align-items-center justify-content-start">
                <div class="art-time"><i class="el-icon-time"></i>：{{item.articleDate}}</div>
                <div class="d-flex align-items-center"><img class="tag" src="@/assets/tag.png" />：
                  <el-tag size="mini" :type="types[indexs]" v-for="(labes,indexs) in item.labels"  :key="indexs" style="margin-left: 2px">{{labes.labelName}}</el-tag>
                </div>
              </el-row>
              <el-row class="art-body">
                <div class="side-img hidden-sm-and-down"><img class="art-banner" :src="item.mark"></div>
                <div class="side-abstract">
                  <div class="art-abstract">
                    {{item.description}}
                  </div>
                  <div class="art-more">
                    <div>
                      <el-button plain>修改文章</el-button>
                      <el-button @click="deleteArticle(item.articleId)" plain>删除文章</el-button>
                    </div>
                    <div class="view"><i class="el-icon-view"></i>{{item.articleViews}}</div>
                  </div>
                </div>
              </el-row>
            </el-card>
          </el-row>
          <div class="block pagination">
            <el-pagination
              background
              layout="prev, pager, next,total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-size="listQuery.pageSize"
              :current-page.sync="listQuery.pageNum"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
      <div class="overview-layout">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="out-border">
              <div class="layout-title">评论最多文章推荐</div>
              <div style="padding: 40px">
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="out-border">
              <div class="layout-title">点赞最多文章推荐</div>
              <div style="padding: 40px">
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
</template>

<script>
  import {fetListArticle,deleteArticle} from "@/api/article"
  import {getCount} from '@/api/home'

  export default {
    data() {
      return {
        articleList:[],
        total:0,
        userArticleCount:0,
        types:["success", "info", "warning", "warning", "danger", "info", "success", "warning", "danger", "info", "danger"],
        listQuery: {
          pageNum: 1,
          pageSize: 2,
          userId:this.$store.getters.userId
        },
      };
    },
    methods: {
      deleteArticle(articleId){
        deleteArticle(articleId).then(res=>{
            if (res.code===200){
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.fethchListByUserId();
            }else {
              this.$message.error('删除失败');
            }
        })
      },
      getUserCount(){
        getCount(this.$store.getters.userId).then(res => {
          this.userArticleCount=res.data.articleCount
        })
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.fethchListByUserId();
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.fethchListByUserId();
      },
      fethchListByUserId(){
        fetListArticle(this.listQuery).then(res=>{
          this.articleList=res.data.records
          this.total = res.data.total;
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },created() {
      this.getUserCount()
      this.fethchListByUserId()
    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .app-container {
    margin-top: 40px;
    margin-left: 120px;
    margin-right: 120px;
  }

  .address-layout {
  }

  .total-layout {
    margin-top: 20px;
  }

  .total-frame {
    border: 1px solid #DCDFE6;
    padding: 20px;
    height: 100px;
  }

  .total-icon {
    color: #409EFF;
    width: 60px;
    height: 60px;
  }

  .total-title {
    position: relative;
    font-size: 16px;
    color: #909399;
    left: 70px;
    top: -50px;
  }

  .total-value {
    position: relative;
    font-size: 18px;
    color: #606266;
    left: 70px;
    top: -40px;
  }

  .un-handle-layout {
    margin-top: 20px;
    border: 1px solid #DCDFE6;
  }

  .layout-title {
    color: #606266;
    padding: 15px 20px;
    background: #F2F6FC;
    font-weight: bold;
  }

  .un-handle-content {
    padding: 20px 40px;
  }

  .un-handle-item {
    border-bottom: 1px solid #EBEEF5;
    padding: 10px;
  }

  .overview-layout {
    margin-top: 20px;
  }

  .overview-item-value {
    font-size: 24px;
    text-align: center;
  }

  .overview-item-title {
    margin-top: 10px;
    text-align: center;
  }

  .out-border {
    border: 1px solid #DCDFE6;
  }

  .statistics-layout {
    margin-top: 20px;
    border: 1px solid #DCDFE6;
  }
  .mine-layout {
    position: absolute;
    right: 140px;
    top: 107px;
    width: 250px;
    height: 235px;
  }
  .address-content{
    padding: 20px;
    font-size: 18px
  }

  #side .item {
    margin-bottom: 30px;
  }

  .art-item {
    margin-bottom: 30px;
    position: relative;
  }
  .art-item .star {
    width: 60px;
    height: 60px;
    position: absolute;
    top: 0;
    right: 0;
  }
  img.tag {
    width: 16px;
    height: 16px;
  }

  .art-title {
    border-left: 3px solid #F56C6C;
    padding-left: 5px;
    cursor: pointer;
  }

  .art-title:hover {
    padding-left: 10px;
    color: #409EFF;
  }

  .art-time {
    margin-right: 20px;
  }

  .art-body {
    display: flex;
    padding: 10px 0;
  }

  .side-img {
    height: 150px;
    width: 270px;
    overflow: hidden;
    margin-right: 10px;
  }

  img.art-banner {
    width: 100%;
    height: 100%;
    transition: all 0.6s;
  }

  img.art-banner:hover {
    transform: scale(1.4);
  }

  .side-abstract {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .art-abstract {
    flex: 1;
    color: #aaa;
  }

  .art-more {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .art-more .view {
    color: #aaa;
  }
  h5{
    font-size: 18px;
  }
  .pagination {
    background-color: #F9F9F9;
  }
</style>
