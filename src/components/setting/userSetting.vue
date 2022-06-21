<template>
  <div class="userRoot" style=" width: 100%;margin-top: 20px; padding: 0 0 0 20px;">
    <h2>用户</h2>
    <el-card shadow="hover" class="box-card">
      <el-avatar :size="80" :src="userInfo.avatar"></el-avatar>
      <div class="userName">
        {{ userInfo.name }}
      </div>
      <div class="createTime">
        注册时间：{{ createTime }}
      </div>
      <el-upload
          action=""
          class="alignContainer"
          :http-request="upload"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
      >
        <div class="avatar-update">修改头像</div>
      </el-upload>

    </el-card>
    <div class="userSettings">
      <!--      <el-button type="primary" round @click="changeInfo = true">修改信息</el-button>-->
      <el-dialog
          title="提示"
          :visible.sync="changeInfo"
          width="30%"
          center>
        <span><el-input v-model="userInfo.name" placeholder="请输入内容"></el-input></span>

        <span slot="footer" class="dialog-footer">
    <el-button @click="changeInfo = false">取 消</el-button>
    <el-button type="primary" @click="changeInfo = false">确 定</el-button>
  </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import {Message} from "element-ui";

export default {
  name: "userSetting",
  data() {
    return {
      userInfo: this.getCircleUrl(),
      changeInfo: false
    }
  },
  methods: {
    getCircleUrl() {
      return JSON.parse(localStorage.getItem("user"));
    },
    beforeAvatarUpload(file) {
      const isJpgOrPng = (file.type === 'image/jpeg' || file.type === 'image/png');
      const isLt2M = file.size / 1024 / 1024 < 5;

      if (!isJpgOrPng) {
        Message({
          showClose: true,
          message: '上传头像图片只能是 JPG 或者 PNG格式!',
          type: 'error'
        });
      }
      if (!isLt2M) {
        Message({
          showClose: true,
          message: '上传头像图片大小不能超过 5MB!',
          type: 'error'
        });
      }
      return isJpgOrPng && isLt2M;
    },
    upload(file) {
      const formData = new FormData()
      formData.append('smfile', file.file)

      this.$axios.post(process.env.VUE_APP_UPLOAD + '/api/v2/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'itZqjxJ1s3Hxi1IISXPJ5nJFT459WVqy'
        }
      }, {
        timeout: 30000
      }).then(res => {
        console.log(res.data)
        if (res.data.code === 'image_repeated') {
          this.userInfo.avatar = res.data.images;
          this.uploadAvatar(res.data.images)
        } else {
          this.userInfo.avatar = res.data.data.url;
          this.uploadAvatar(res.data.data.url)
        }
      })
    },
    uploadAvatar(newAvatar) {
      let user = JSON.parse(localStorage.getItem("user"));
      user.avatar = newAvatar
      localStorage.setItem("user", JSON.stringify(user))
      this.$axios({
        method: "get",
        url: process.env.VUE_APP_SERVE + "/api/uploadAvatar",
        params: {
          user: this.userInfo.uid,
          passwd: this.userInfo.passwd,
          avatar: newAvatar
        }
      }).then((req) => {
        if (req.data.code === 200) {
          Message({
            showClose: true,
            message: '切换成功',
            type: 'success'
          });
        } else {
          Message({
            showClose: true,
            message: '切换失败',
            type: 'warning'
          });
        }
      }).catch((err) => {
        Message({
          showClose: true,
          message: err,
          type: 'warning'
        });
      })
    }


  },
  computed: {
    createTime() {
      return dayjs(this.userInfo.registerTime).format('YYYY-MM-DD HH:mm:ss')
    }
  }

}
</script>

<style scoped>
h2 {
  color: #666666;
}

.userRoot {
  display: flex;
  flex-direction: column !important;
  gap: 1.5rem !important;
}

.userName {
  height: 30px;
  width: 150px;
  line-height: 100%;
  position: absolute;
  top: 30px;
  display: inline-block;
  margin-left: 30px;
  font-size: 23px;
  font-weight: bold;
}

.createTime {
  position: absolute;
  display: inline-block;
  margin-left: 30px;
  bottom: 30px;
}

.avatar-update {
  margin-left: 8px;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
  /*display: flex;*/
  position: relative;
}

.userSettings {
  display: inline-block;
}
</style>