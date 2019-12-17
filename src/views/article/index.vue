<template>
  <div>
    <Navbar></Navbar>
    <el-row class="main" type="flex" justify="center">
      <el-col :span="16">
        <div id="artcle-info">
          <h2 class="text-center"><strong>{{article.articleTitle}}</strong></h2>
          <!-- 描述：文章信息 -->
          <div class="text-center timeAndView">
						<span class="article-time">
							<i class="el-icon-time"></i>
							发表于：<span>{{article.articleDate}}</span>
						</span>
            &nbsp;|&nbsp;
            <span class="article-views">
							<i class="el-icon-view"></i>
							阅读量：{{article.articleViews}}
						</span>
          </div>
          <p class="abstract">
            前言：{{article.description}}
          </p>
        </div>
        <div id="artcle-content"
             class="html_text"
             v-html="article.articleContent">

        </div>
        <comment :articleIds="this.article.articleId"></comment>
        <div id="statement">
          <div class="item">作者：{{userinfo.userNickname}}</div>
          <div class="item">联系方式：{{userinfo.userEmail}}</div>
          <div class="item">版权声明：本博客所有文章除特别声明外,转载请注明出处!</div>
        </div>
      </el-col>
    </el-row>
    <footer></footer>
  </div>
</template>

<script>
  import Navbar from "../layout/components/Navbar";
  import {getUserByUserId} from '@/api/users';
  import {addViews} from '@/api/article'
  import comment from '@/components/comment'
  export default {
    name: 'article',
    data(){
      return{
        article:JSON.parse(this.$route.query.article),
        userinfo:"",
        value: null
      }
    },methods:{
      addArticleViews(){
        addViews(this.article.articleId).then(res=>{
        })
      },
     getUser(){
       getUserByUserId(this.article.userId).then(res=>{
         this.userinfo=res.data
       })
     }
    },created() {
      this.addArticleViews()
      this.getUser()
    },
    components:{
      Navbar,
      comment,
    }
  }
</script>

<style scoped>
  #artcle-info {
    padding: 20px;
    background-image: url(../../assets/bg1.jpg);
    margin-bottom: 40px;
  }
  #artcle-info .abstract {
    color: #ffffff;
    border-left: 3px solid #F56C6C;
    padding: 10px;
    background-color: rgba(126, 129, 135, 0.3);
  }
  #artcle-info .timeAndView {
    padding: 20px;
    line-height: 30px;
    font-size: 16px;
    color: #ffffff;
  }
  pre.has {
    color: #ffffff;
    background-color: rgba(0, 0, 0, 0.8);
  }

  img.has {
    width: 100%;
  }
  .main{
    width: 70%;
    margin: 0 auto;
  }
  #statement {
    margin-top: 2%;
    border-left: 3px solid #F56C6C;
    padding: 20px;
    background-color: #EBEEF5;
  }
  .html_text{
    font-size: 18px;
  }
</style>
