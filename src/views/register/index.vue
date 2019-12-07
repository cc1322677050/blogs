<template>
  <div>
      <div class="register-wrapper">
        <div id="register">
          <h3 class="title">注册</h3>
          <el-form
            :model="RegisterForm"
            status-icon
            :rules="rules"
            ref="RegisterForm">
            <el-form-item prop="username">
              <el-input v-model="RegisterForm.username" auto-complete="off" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="pass">
              <el-input type="password" v-model="RegisterForm.pass" auto-complete="off" placeholder="输入密码"></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
              <el-input type="password" v-model="RegisterForm.checkPass" auto-complete="off" placeholder="确认密码"></el-input>
            </el-form-item>
            <el-form-item prop="validcode">
              <el-input v-model="RegisterForm.validcode" placeholder="验证码" style="width: 50%;float: left"></el-input>
              <validcode ref="code"  v-model="validcode" style="float: right;box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1)"></validcode>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click.native.prevent="submitForm" style="width:100%;" :loading="logining">注册</el-button>
            </el-form-item>
            <el-form-item>
              <p class="login" @click="gotoLogin">已有账号？立即登录</p>
            </el-form-item>
          </el-form>
        </div>
      </div>
  </div>
</template>

<script>
  import validcode from '@/components/validcode'
  import {isvalidlength}  from "@/utils/validate"
  import {register,checkeUseranem} from "@/api/users"

  export default {
    name: "Register",
    data() {
      const checkusername = (rule, value, callback) => {
        if (isvalidlength(value)) {
            callback(new Error('用户名不小于6位'))
        } else{
          var username={
            username:value
          };
          checkeUseranem(username).then(response=>{
            if (response.code===500){
              callback(new Error('用户名已经被注册'))
            }else {
              callback()
            }
          })
        }
      };
      //  <!--验证码是否为空-->
      const checkvalidcode = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入验证码'))
        } else {
            callback()
        }
      }
      // <!--验证密码-->
      const validatePass = (rule, value, callback) => {
        if (isvalidlength(value)) {
            callback(new Error('密码不能小于6位'))
        } else {
          if (this.RegisterForm.checkPass !== "") {
            this.$refs.RegisterForm.validateField("checkPass2");
          }
          callback()
        }
      }
      // <!--二次验证密码-->
      const validatePass2 = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.RegisterForm.pass) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      };
      return {
          logining: false,
          validcode:"",
        RegisterForm: {
          pass: "",
          checkPass: "",
          username: "",
          validcode: ""
        },
        rules: {
          pass: [{ validator: validatePass, trigger: 'blur',required:true }],
          checkPass: [{ validator: validatePass2, trigger: 'blur',required:true }],
          username: [{ validator: checkusername, trigger: 'blur',required:true }],
          validcode: [{ validator: checkvalidcode, trigger: 'blur',required:true }],
        },
      }
    },
    methods: {
      submitForm() {
        this.$refs.RegisterForm.validate(valid => {
          if (valid) {
              this.logining=true;
              console.log(this.validcode);
              //验证码错误
              if (this.validcode.toLowerCase()!=this.RegisterForm.validcode.toLowerCase()) {
                  this.$refs.code.createdCode()
                  this.$alert('Verification code error!', 'error', {
                      confirmButtonText: 'ok'
                  })
                  this.$refs.code.refreshCode()
                  this.logining=false;
              }
              register(this.RegisterForm.username,this.RegisterForm.pass).then(response=>{
                  this.logining=false;
                  if (response.code===200){
                      this.$alert('Registered Successfully!', 'info', {
                          confirmButtonText: 'ok'
                      })
                      this.$router.push({path: '/login'})
                  }
              })
            } else {
              this.logining=false;
              console.log("error submit!!");
              return false;
          }
        })
      },
      gotoLogin() {
        this.$router.push({
          path: "/login"
        });
      },
    }, components:{
      validcode
    }
  };
</script>

<style scoped>
  .loading-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: #aedff8;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .register-wrapper img {
    position: absolute;
    z-index: 1;
  }
  .register-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }
  #register {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .title {
    line-height: 50px;
    font-weight: bold;
    margin: 10px;
    text-align: center;
  }
  .login {
    margin-top: 10px;
    font-size: 14px;
    line-height: 22px;
    color: #1ab2ff;
    cursor: pointer;
    text-align: left;
    text-indent: 8px;
    width: 160px;
  }
  .login:hover {
    color: #2c2fd6;
  }
</style>
