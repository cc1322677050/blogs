<template>
  <div>
    <div style="width: 50%;">
      <el-form :model="userInfoForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户头像：" >
            <UpdataProFilePhoto v-on:imageurl="listenToMyBoy"  v-model="userInfoForm.userProfilePhoto"></UpdataProFilePhoto>
        </el-form-item>
        <el-form-item label="用户名：" prop="name" style="width: 25%" >
          <span class="spanfont">{{userInfoForm.userName}}</span>
        </el-form-item>
        <el-form-item label="昵 称：" prop="昵称" style="width: 25%" >
          <el-input :value="userInfoForm.userNickname" v-model="userInfoForm.userNickname"></el-input>
        </el-form-item>
        <el-form-item label="邮箱："   prop="userEmail"  style="width: 50%;">
          <el-input :value="userInfoForm.userEmail" v-model="userInfoForm.userEmail"></el-input>
        </el-form-item>
        <el-form-item label="电话号码：" prop="userTelephoneNumber" style="width: 50%;">
          <el-input :value="userInfoForm.userTelephoneNumber" v-model="userInfoForm.userTelephoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="用户生日：" required style="width: 50%" >
          <el-date-picker @blur="jsGetAge" value-format=" yyyy-MM-dd" format="yyyy-MM-dd" type="date" placeholder="选择日期" :value="userInfoForm.userBirthday" v-model="userInfoForm.userBirthday" style="width: 100%;" required></el-date-picker>
        </el-form-item>
        <el-form-item label="年 龄：" prop="name" required style="width: 50%;">
          <span class="spanfont">{{userInfoForm.userAge}}岁</span>
        </el-form-item>
        <el-form-item label="注册时间">
          <span class="spanfont">{{userInfoForm.userRegistrationTime}}</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click.native.preventk="submitForm" :loading="loading">立即保存</el-button>
          <el-button  size="mini" @click="resetForm('userInfoForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import UpdataProFilePhoto from '@/components/Upload/UpdataProFilePhoto';
  import {updataUserInfo} from '@/api/users'
  import store from "../../../store";
    export default {
        name: "info",
      data(){
        var checkPhone = (rule, value, callback) => {
          const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
          if (!value) {
            return callback(new Error('电话号码不能为空'))
          }
          setTimeout(() => {
            // Number.isInteger是es6验证数字是否为整数的方法,但是我实际用的时候输入的数字总是识别成字符串
            // 所以我就在前面加了一个+实现隐式转换

            if (!Number.isInteger(+value)) {
              callback(new Error('请输入数字值'))
            } else {
              if (phoneReg.test(value)) {
                callback()
              } else {
                callback(new Error('电话号码格式不正确'))
              }
            }
          }, 100)
        }
        var checkEmail = (rule, value, callback) => {
          const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
          if (!value) {
            return callback(new Error('邮箱不能为空'))
          }
          setTimeout(() => {
            if (mailReg.test(value)) {
              callback()
            } else {
              callback(new Error('请输入正确的邮箱格式'))
            }
          }, 100)
        }

          return{
            loading:false,
            userInfoForm: {
              userName:this.$store.getters.username,
              userNickname: this.$store.getters.nickname,
              userEmail:this.$store.getters.email,
              userProfilePhoto:this.$store.getters.avatar,
              userRegistrationTime:this.$store.getters.registrationTime,
              userBirthday:this.$store.getters.birthday,
              userAge:this.$store.getters.age,
              userTelephoneNumber:this.$store.getters.telephoneNumber,
            },
            rules:{
              userTelephoneNumber: [{ validator: checkPhone, trigger: 'blur',message:"请输入正确的手机号码"}],
              userEmail: [{ validator: checkEmail, trigger: 'blur',message:"请输入正确的邮箱格式" }]},
          }
      },
      methods:{
        listenToMyBoy($event){
          this.userInfoForm.userProfilePhoto=$event
        },
        submitForm() {
          this.loading=true
          updataUserInfo(this.$store.getters.userId,this.userInfoForm).then(response=>{
              if(response.code===200){
                this.$alert('Modify Successfully !', 'info', {
                  confirmButtonText: 'ok'
                })
                //更新完后立即刷新
                this.$store.dispatch('GetInfo').then(res => { // 拉取用户信息
                })
                this.loading=false
              }
          })
          console.log(this.userInfoForm)
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        jsGetAge() {
          let birthdays = new Date(this.userInfoForm.userBirthday.replace(/-/g, "/"));
          let d = new Date();
          let age = d.getFullYear() - birthdays.getFullYear() - (d.getMonth() < birthdays.getMonth() ||
                    (d.getMonth() == birthdays.getMonth() && d.getDate() < birthdays.getDate()) ? 1 : 0);
          this.userInfoForm.userAge = age;
        }

      },
      components:{
        UpdataProFilePhoto
      }
    }
</script>

<style scoped>
  .spanfont{
    font-size: 15px;
  }
</style>
