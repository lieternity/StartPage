<template>
  <div class="registerRoot">
    <el-card class="box-card">
      <h2>register</h2>
      <el-form label-position="left" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="user">
          <el-input v-model.number="ruleForm.user"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {Message} from "element-ui";

export default {
  name: "registerPage",
  data() {
    var checkName = (rule, value, callback) => {
      value = value.trim()
      if (!value) {
        return callback(new Error('用户名不能为空'));
      }
      setTimeout(() => {
        if (value) {
          console.log(value)
          callback()
        } else {
          callback()
        }
      }, 500);
    };
    var validatePass = (rule, value, callback) => {
      value = value.trim()
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      value = value.trim()
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
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
            if (res.data.code === 404) {
              callback()
            } else {
              callback(new Error('该账号已经被注册'));
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
        pass: '',
        checkPass: '',
        user: "",
        name: ''
      },
      rules: {
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'}
        ],
        name: [
          {validator: checkName, trigger: 'blur'}
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
            url: process.env.VUE_APP_SERVE + "/api/registerUser",
            params: {
              user: this.ruleForm.user,
              passwd: this.ruleForm.pass,
              name: this.ruleForm.name
            }
          }).then((res) => {
            if (res.data.code === 200) {
              Message({
                showClose: true,
                message: '注册成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.$router.replace("/setting/login")
                }
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
.registerRoot {
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