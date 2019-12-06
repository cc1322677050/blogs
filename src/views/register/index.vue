<template>
  <div>
      <div class="register-wrapper">
        <div id="register">
          <h3 class="title">注册</h3>
          <el-form
            :model="RegisterForm"
            status-icon
            :rules="rules2"
            ref="RegisterForm"
            label-width="0">
            <el-form-item prop="email">
              <el-input v-model="RegisterForm.email" auto-complete="off" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="pass">
              <el-input type="password" v-model="RegisterForm.pass" auto-complete="off" placeholder="输入密码"></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
              <el-input type="password" v-model="RegisterForm.checkPass" auto-complete="off" placeholder="确认密码"></el-input>
            </el-form-item>
            <el-form-item prop="smscode">
              <el-input v-model="RegisterForm.smscode" placeholder="验证码" style="width: 50%;float: left"></el-input>
              <validcode ref="code"  style="float: right;box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1)"></validcode>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('RegisterForm')" style="width:100%;">注册</el-button>
              <p class="login" @click="gotoLogin">已有账号？立即登录</p>
            </el-form-item>
          </el-form>
        </div>
      </div>
  </div>
</template>

<script>
  import validcode from '@/components/validcode'

  export default {
    name: "Register",
    data() {
      const checkEmail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'))
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
      }
      // <!--验证密码-->
      const validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"))
        } else {
          if (this.RegisterForm.checkPass !== "") {
            this.$refs.RegisterForm.validateField("checkPass");
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
        RegisterForm: {
          pass: "",
          checkPass: "",
          email: "",
          smscode: ""
        },
        rules2: {
          pass: [{ validator: validatePass, trigger: 'blur' }],
          checkPass: [{ validator: validatePass2, trigger: 'blur' }],
          email: [{ validator: checkEmail, trigger: 'blur' }],
          smscode: [{ validator: checkSmscode, trigger: 'blur' }],
        },
        buttonText: '发送验证码',
        isDisabled: false, // 是否禁止点击发送验证码按钮
        flag: true
      }
    },
    methods: {
      // <!--提交注册-->
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            setTimeout(() => {
              alert('注册成功')
            }, 400);
          } else {
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
