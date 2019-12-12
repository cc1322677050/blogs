<template>
  <div class="tag">
    <el-card  class="box-card">
      <div slot="header" class="d-flex align-items-center">
        <img class="card-icon" src="@/assets/biaoqian.png" />
        <span>分类</span>
      </div>
      <el-menu >
        <!-- 一级菜单 -->
        <template v-for="(item,index) in menuList">
          <el-submenu v-if="item.children && item.children.length"  :index="item.sortId.toString()" :key="index">
            <template slot="title"><img style="height: 20px;width: 20px;margin-right: 10px" :src="item.icon">{{item.sortName}}</template>
            <!-- 二级菜单 -->
            <template v-for="(itemChild,index1) in item.children">
              <el-submenu v-if="itemChild.children && itemChild.children.length"  :index="itemChild.sortId.toString()" :key="index1">
                <template  slot="title"><img style="height: 20px;width: 20px;margin-right: 10px" :src="itemChild.icon">{{itemChild.sortName}}</template>
                <!-- 三级菜单 -->
                <el-menu-item v-for="(itemChild_Child,index2) in itemChild.children" :index="itemChild_Child.sortId.toString()" :key="index2">
                <span slot="title"><img style="height: 20px;width: 20px;margin-right: 10px" :src="itemChild_Child.icon">{{itemChild_Child.sortName}}</span></el-menu-item>
              </el-submenu>
              <el-menu-item v-else  :index="itemChild.sortId.toString()"  :key="itemChild.sortId"><img style="height: 20px;width: 20px;margin-right: 10px" :src="itemChild.icon"><span slot="title">{{itemChild.sortName}}</span></el-menu-item>
            </template>
          </el-submenu>
          <el-menu-item v-else   :index="item.sortId.toString()" :key="item.sortId"><span slot="title"><img style="height: 20px;width: 20px;margin-right: 10px" :src="item.icon">{{item.sortName}}</span></el-menu-item>
        </template>
      </el-menu>
    </el-card>
  </div>
</template>
<script>
  import {getSortTree} from '@/api/sorts'
  export default {
    data(){
      return{
        //这里的数据我就模拟一个了
        menuList:[],
      }
    },
    methods:{
      getTree(){
        getSortTree().then(res=>{
          console.log(res.data)
          this.menuList=res.data
        })
      }
    },created() {
      this.getTree()
    },

  }
</script>
<style>
  .box-card .item:hover {
    color: #409EFF;
    cursor: pointer;
  }

  .box-card span {
    font-weight: bold;
  }

  .card-icon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
  .tag-item {
    margin-top: 5px;
    margin-right: 10px;
  }
</style>
