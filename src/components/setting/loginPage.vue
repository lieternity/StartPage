<template>
  <div class="loginRoot">
    <el-card class="box-card">
      <h2>Login</h2>
      <el-form label-position="left" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="账号" prop="user">
          <el-input v-model.number="ruleForm.user"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button type="info" @click="$router.replace('/setting/register')">去注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {Message} from 'element-ui'

export default {
  name: "loginPage",
  data() {

    var validatePass = (rule, value, callback) => {
      value = value.trim()
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    var checkUser = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账号不能为空'));
      }
      if (!Number.isInteger(value)) {
        callback(new Error('请输入数字值'));
      } else {
        if ((value + "").length >= 5 && (value + "").length <= 11) {
          this.$axios({
            method: "get",
            url: process.env.VUE_APP_SERVE + "/api/isRegister",
            params: {
              user: value
            }
          }).then((res) => {
            if (res.data.code === 200) {
              callback()
            } else {
              callback(new Error('该账号未注册'));
            }
          }).catch((err) => {
            Message({
              showClose: true,
              message: err,
              type: 'error'
            });
          })
        } else {
          callback(new Error('账号长度必须在5-11之间'));
        }
      }
    }
    return {
      ruleForm: {
        user: "",
        pass: "",
      },
      rules: {
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
        user: [
          {validator: checkUser, trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: "get",
            url: process.env.VUE_APP_SERVE + "/api/login",
            params: {
              user: this.ruleForm.user,
              passwd: this.ruleForm.pass
            }
          }).then((res) => {
            if (res.data.code === 200) {
              localStorage.setItem("user", JSON.stringify(res.data.result))
              Message({
                showClose: true,
                message: '登陆成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.$router.replace("/setting/user").catch(()=>{})
                }
              });
            } else if (res.data.code === 403) {
              Message({
                showClose: true,
                message: '密码错误',
                type: 'error'
              });
            } else if (res.data.code === 404) {
              Message({
                showClose: true,
                message: '用户不存在',
                type: 'warning'
              });
            } else {
              Message({
                showClose: true,
                message: '出错了',
                type: 'error'
              });
            }
          }).catch((err) => {
            Message({
              showClose: true,
              message: err,
              type: 'error'
            });
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
.loginRoot {
  position: relative;
  width: 100%;
  height: 100%;
}

.box-card {
  width: 480px;
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 10px;
  transform: translate(-50%, -50%);
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}


</style>