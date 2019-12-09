<template>
  <div>
    <el-row class="main" type="flex" justify="center">
      <el-col :span="16">

      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'article'
  }
</script>

<style scoped>
  #artcle-info {
    padding: 20px;
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

  #statement {
    border-left: 3px solid #F56C6C;
    padding: 20px;
    background-color: #EBEEF5;
  }
</style>
