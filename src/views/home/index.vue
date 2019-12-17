<template>
  <div class="home">
    <el-row id="artList" type="flex" justify="space-around">
      <el-col :span="16">
        <el-row class="art-item" v-for="(item,index) in articleList" :key="index">
          <el-card shadow="hover">
            <h5><router-link :to="{path:'/article',query:{article:JSON.stringify(item)}}" tag="span" class="art-title">{{item.articleTitle}}</router-link> </h5>
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
                  <router-link :to="{path:'/article',query:{article:JSON.stringify(item)}}" tag="span">
                    <el-button plain>阅读全文</el-button>
                  </router-link>
                  <div class="view" style="font-size: 18px">
                      <a class="el-icon-star-off" :model="item.articleLikeUsersId"  v-if="userLike(item.articleLikeUsersId)" @click="likethis(index)">点赞量: {{item.articleLikeCount}}</a>
                      <a v-else class="el-icon-star-on"   @click="dislike(index)"> 点赞量: {{item.articleLikeCount}}</a>
                      <el-divider direction="vertical"></el-divider>
                      <i class="el-icon-view"></i> 浏览量: {{item.articleViews}}
                  </div>
                </div>
              </div>
            </el-row>
          </el-card>
        </el-row>
        <el-row class="art-item"></el-row>
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
      </el-col>
      <el-col :span="6" class="hidden-sm-and-down" id="side">
        <div class="item">
          <sortsTree v-on:sorts="getSorts"></sortsTree>
        </div>
        <div class="item">
          <tags v-on:tag="getTag"></tags>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import tags from "@/components/tags/tag"
  import {fetListArticle,likeArticle,dislikeArticle} from "@/api/article"
  import sortsTree from  '@/components/sortsTree/'
  export default {
    data(){
      return{
        userId:this.$store.getters.userId,
        total:0,
        articleList:[],
        types:["success", "info", "warning", "warning", "danger", "info", "success", "warning", "danger", "info", "danger"],
        listQuery: {
          pageNum: 1,
          pageSize: 5,
          labelsLists:[],
          sortsList:[]
        },
      }
    },methods: {
      dislike(index){
        for (var i=0;i<this.articleList[index].articleLikeUsersId.length;i++){
          if (this.articleList[index].articleLikeUsersId[i]===this.userId){
            this.articleList[index].articleLikeUsersId.splice(i,1);
            this.articleList[index].articleLikeCount=this.articleList[index].articleLikeCount-1;
            dislikeArticle(this.userId,this.articleList[index].articleId).then(res=>{
              if (res.code===200){
                this.$message.success("取消点赞成功!")
              }else {
                this.$message.error("取消点赞失败!")
              }
            })
          }
        }
      },
      likethis (index) {
        likeArticle(this.userId,this.articleList[index].articleId).then(res=>{
          if (res.code===200){
            this.$message.success("点赞成功!")
          }else {
            this.$message.error("点赞失败!")
          }
        })
        this.articleList[index].articleLikeUsersId.push(this.userId);
        this.articleList[index].articleLikeCount=this.articleList[index].articleLikeCount+1
      },
      userLike(item){
        for (var i=0;i<item.length;i++){
          if (item[i]===this.userId){
            return false;
          }
        }
        return true;
      },
      getSorts($event){
        this.listQuery.sortsList=$event
        this.pageArticle();
      },
      getTag($event){
          this.listQuery.labelsLists=$event
          this.pageArticle();
      },
      pageArticle(){
        fetListArticle(this.listQuery).then(response=>{
          this.articleList=response.data.records;
          this.list = response.data.list;
          this.total = response.data.total;
        })
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.pageArticle();
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.pageArticle();
      },
    },
    created() {
      this.pageArticle()
    },
    components: {
      tags,
      sortsTree
    }
  }
</script>


<style>
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


  .thumbs_button{
    float: left;
    width:145px;
    text-align: center;
    margin:5px auto;
    height: 45px;
    line-height: 45px;
    background-color:#444;
    color:#fbfbfb;
    text-align:center;
    text-decoration:none;
    font-weight:bold;
    font-size:16px;
    transition: all 0.3s;
    border-radius: 0 0 0 25px;
    -webkit-border-radius: 0 0 0 25px;
    -moz-border-radius: 0 0 0 25px;
    -o-border-radius: 0 0 0 25px;
  }
</style>
