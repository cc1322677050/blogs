<template>
  <div class="home">
    <el-row id="artList" type="flex" justify="space-around">
      <el-col :span="16">
        <el-row class="art-item" v-for="(item,index) in articleList" :key="index">
          <el-card shadow="hover">
            <h5><router-link :to="{path:'/article',query:{article:JSON.stringify(item)}}" tag="span" class="art-title">{{item.articleTitle}}</router-link></h5>
            <el-row class="art-info d-flex align-items-center justify-content-start">
              <div class="art-time"><i class="el-icon-time"></i>：{{item.articleDate}}</div>
              <div class="d-flex align-items-center"><img class="tag" src="@/assets/tag.png" />：
                <el-tag size="mini" v-for="(labes,indexs) in item.labels"  :key="index" style="margin-left: 2px">{{labes.labelName}}</el-tag>
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
                  <div class="view"><i class="el-icon-view"></i>{{item.articleViews}}</div>
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
          <tags></tags>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import tags from "@/components/tags/tag"
  import {fetListArticle} from "@/api/article"
  export default {
    data(){
      return{
        total:0,
        articleList:[],
        listQuery: {
          pageNum: 1,
          pageSize: 10
        },
      }
    },methods: {
      pageArticle(){
        fetListArticle(this.listQuery).then(response=>{
          console.log(response.data)
          this.articleList=response.data.records;
          this.list = response.data.list;
          this.total = response.data.total;
        })
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getLables();
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getLables();
      },
    },
    created() {
      this.pageArticle()
    },
    components: {
      tags
    }
  }
</script>


<style>
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
