<template>
  <div class="userRoot" style="height: 100%; width: 100%; padding: 20px;">
    <h2>用户</h2>
    <el-card shadow="hover" class="box-card">
      <el-avatar :size="80" :src="userInfo.avatar"></el-avatar>
      <div class="userName">
        {{ userInfo.name }}
      </div>
      <div class="createTime">
        创建时间：{{ createTime }}
      </div>
      <el-upload
          action=""
          class="alignContainer"
          :http-request="upload"
          :show-file-list="false"

      >
        <div class="avatar-update">修改头像</div>
      </el-upload>

    </el-card>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "userSetting",
  data() {
    return {
      userInfo: this.getCircleUrl()
    }
  },
  methods: {
    getCircleUrl() {
      return JSON.parse(localStorage.getItem("user"));
    },
    upload(file) {
      const formData = new FormData()
      formData.append('smfile', file.file)

      this.$axios.post('https://sm.ms/api/v2/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'itZqjxJ1s3Hxi1IISXPJ5nJFT459WVqy'
        }
      }, {timeout: 30000}).then(res => {
        if (res.data.code === 'image_repeated') {
          console.log(res.data)
          this.userInfo.avatar = res.data.images;
        } else {
          this.userInfo.avatar = res.data.data.url;
        }
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
</style>