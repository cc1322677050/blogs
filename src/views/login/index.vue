<template>
  <div class="login-container">
    <el-form :model="ruleForm" :rules="rules"
             status-icon
             ref="LoginForm"
             label-position="left"
             label-width="0px"
             class="login-page">
      <h3 class="login-title">系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text"
                  v-model="ruleForm.username"
                  auto-complete="off"
                  placeholder="用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password"
                  v-model="ruleForm.password"
                  auto-complete="off"
                  placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="validcode">
        <el-input style="width:50%;float: left;"
                  v-model="ruleForm.validcode"
                  placeholder="验证码"></el-input>
        <validcode  v-model="validcode" ref="code"  style="float: right;box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1)"></validcode>
      </el-form-item>
      <el-checkbox
        v-model="ruleForm.checked"
        class="rememberme">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;"  @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
      </el-form-item>
      <el-form-item style="width:100%;">
        <router-link  class="main_color login "  to="/register" style="width:100%;text-decoration: none;"  @click="register">没有账号，立即注册</router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {isvalidlength}  from "@/utils/validate"
  import validcode from '@/components/validcode'
  import { setCookie,getCookie,delCookie} from '@/utils/cookie'



  const checkEmail = (rule, value, callback) => {
    if (isvalidlength(value)) {
      callback(new Error('用户名不小于6位'))
    }  else {
      callback()
    }
  };

  const validatePass = (rule, value, callback) => {
    if (isvalidlength(value)) {
      callback(new Error('密码不能小于6位'))
    } else {
      callback()
    }
  };
  //  <!--验证码是否为空-->
  const checkSmscode = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入验证码'))
    } else {
      callback()
    }
  };
  export default {
    data(){
      return {
        logining: false,
        ruleForm: {
          username:"",
          password:"",
          validcode:"",
          checked:false
        },
        validcode:"",
        rules: {
          username: [{required: true, trigger: 'blur',validator:checkEmail}],
          password: [{required: true, trigger: 'blur',validator:validatePass}],
          validcode: [{ required: true,trigger: 'blur',validator: checkSmscode}],
        },
      }
    },
    methods: {
      getCookies(){
        this.ruleForm.username=getCookie("username");
        this.ruleForm.password=getCookie("password");
        if (getCookie("checked")==="true")
        this.ruleForm.checked=true
      },
      register(){
        this.$router.push({path:"/register"})
      },
      handleSubmit(){
        this.$refs.LoginForm.validate((valid) => {
          if(valid){
            this.logining = true;
            if (this.validcode.toLowerCase()!=this.ruleForm.validcode.toLowerCase()){
              this.logining = false;
              this.$refs.code.refreshCode();
              this.$message.error('Verification code error!');
              }else {
              this.$store.dispatch('Login', this.ruleForm).then(() => {
                this.logining = false;
                if (this.ruleForm.checked){
                  setCookie("username",this.ruleForm.username,7);
                  setCookie("password",this.ruleForm.password,7);
                  setCookie("checked",this.ruleForm.checked,7);
                }else {
                  delCookie("username");
                  delCookie("checked");
                  delCookie("password");
                }
                this.$router.push({path: '/home'});
              }).catch(() => {
                this.$refs.code.refreshCode();
                this.logining = false;
                this.$message.error('Username or Password  wrong!');
              })
            }
          }else{
            this.$message.error('error submit!');
            return false;
          }
        })
      }
    },
    created() {
      this.getCookies()
    },
    components:{
      validcode
    }
  };
</script>

<style scoped>
  .login-title{
    text-align: center;
  }
  .login-container {
    width: 100%;
    height: 100%;
  }
  .login-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  label.el-checkbox.rememberme {
    margin: 0px 0px 15px;
    text-align: left;
  }
  .login:hover {
    color: #2c2fd6;
  }
</style>
