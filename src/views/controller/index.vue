<template>
  <div>
      <div class="address-layout">
      </div>
      <div class="total-layout">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="total-frame">
              <img :src="img_home_order" class="total-icon">
              <div class="total-title">发表文章数</div>
              <div class="total-value">200</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="total-frame">
              <img :src="img_home_today_amount" class="total-icon">
              <div class="total-title">获得的点赞数</div>
              <div class="total-value">￥5000.00</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="total-frame">
              <img :src="img_home_yesterday_amount" class="total-icon">
              <div class="total-title">收到的评论数</div>
              <div class="total-value">￥5000.00</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="total-frame">
              <img :src="img_home_yesterday_amount" class="total-icon">
              <div class="total-title">好友申请</div>
              <div class="total-value">￥5000.00</div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="un-handle-layout">
        <div class="layout-title">我最近发表的文章</div>
        <div class="un-handle-content">

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
  import UpdataProFilePhoto from "@/components/Upload/UpdataProFilePhoto"
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
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
    },
    components:{
      UpdataProFilePhoto
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
</style>
