<template>
  <div class="buttonList">
    <div class="appIcon" @click.stop="showAppList">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-app"></use>
      </svg>
    </div>
    <div class="userIcon" @click.stop="userMenuShow($event)">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-user"></use>
      </svg>
    </div>
    <router-link class="setIcon" to="/setting">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-setting-filling"></use>
      </svg>
    </router-link>
    <div v-show="userMenu" @click.stop="userMenuClick($event)" class="userMenu"
         :style="{'top':top + 'px','left':left+ 'px'}">
      <div class="account">账号管理</div>
      <div class="quit">退出登录</div>
    </div>
  </div>
</template>

<script>
import {Message} from "element-ui";

export default {
  name: "buttonList",
  data() {
    return {
      userMenu: false,
      top: 0,
      left: 0
    }
  },
  mounted() {
    this.$bus.$on("changeUserMenu", (value) => {
      if (value !== undefined) {
        this.userMenu = value
      } else {
        this.userMenu = !this.userMenu
      }
    })
  },
  methods: {
    showAppList() {
      this.$bus.$emit("changeAppListShow", true);
      this.$bus.$emit("backgroundBecomesLarger", 1.2);
    },
    userMenuShow($event) {
      this.left = $event.clientX
      this.top = $event.clientY
      this.userMenu = !this.userMenu
    },
    userMenuClick($event) {
      if ($event.target.className === "quit") {
        localStorage.removeItem('user');
        Message({
          type: "success",
          showClose: "true",
          message: "退出登录成功"
        })

      } else {
        this.$router.replace("/setting/user").catch(() => {
        })
      }
      this.userMenu = !this.userMenu
    },
  }
}
</script>

<style scoped>
.buttonList {
  position: fixed;
  top: 20px;
  right: 30px;
  width: 180px;

}

.userIcon, .setIcon, .appIcon {
  display: inline-block;
  line-height: 48px;
  text-align: center;
  width: 40px;
  height: 40px;
  margin: 0 10px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.2);
}

.userMenu {
  position: fixed;
  width: 120px;
  height: 100px;
  z-index: 3;
  border-radius: 10px;
  background-color: #fefefe;
  overflow: hidden;
  animation: menuFadeOut 0.3s linear;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.userMenu div {
  text-align: center;
  line-height: 50px;
  width: 100%;
  height: 50px;
}

.userMenu div:hover {
  background-color: rgba(0, 0, 0, 0.1);
  animation: changeSize 0.2s forwards;
}

.userIcon:hover, .setIcon:hover, .appIcon:hover {
  animation: changeSize 0.2s forwards;
}

svg {
  color: #FFFFFF !important;
  font-size: 24px;
}

@keyframes changeSize {
  from {
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  50% {
    -webkit-transform: scale(1.05);
    transform: scale(1.1);
  }

  to {
    -webkit-transform: scale(1.05);
    transform: scale(1.05);
  }
}
</style>
