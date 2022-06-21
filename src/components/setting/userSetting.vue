<template>
  <div class="userRoot" style="height: 100%; width: 100%; padding: 20px;">
    <h2>用户</h2>
    <el-card shadow="hover" class="box-card">
      <el-avatar :size="80" :src="circleUrl"></el-avatar>
      <div class="userName">
        {{  }}
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "userSetting",
  data() {
    return {
      circleUrl: this.getCircleUrl()
    }
  },
  methods: {
    getCircleUrl() {
      try {
        let uid = JSON.parse(localStorage.getItem("user")).uid;
        if (uid) {
          return "https://q2.qlogo.cn/headimg_dl?dst_uin=" + uid + "&spec=640"
        } else {
          return "/img/user.png"
        }
      } catch (e) {
        return "/img/user.png"
      }

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
  height: 60%;
  line-height: 100%;
  position: absolute;
  display: inline-block;
  margin-left: 30px;
  background-color: skyblue;
  /*float: right;*/
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