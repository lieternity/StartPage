<template>
  <div class="appRoot">
    <transition name="app" appear>
      <div v-show="appListShow" class="appsList">
        <svg @click="hideList" class="icon" aria-hidden="true">
          <use xlink:href="#icon-close"></use>
        </svg>
        <div class="appList">
          <h3 v-show="otherApps.length !== 0">Customize</h3>
          <button v-show="otherApps.length !== 0"
                  v-for="app in otherApps"
                  class="custom-btn btn"
                  @click="jump(app.link)"
                  :key="app.id">
            {{ app.name }}
          </button>
          <h3>个人网站</h3>
          <button v-for="app in personalWebsite" class="custom-btn btn" @click="jump(app.link)" :key="app.id">
            {{ app.name }}
          </button>
          <h3>常用</h3>
          <button v-for="app in commonlyUsedApps" class="custom-btn btn" @click="jump(app.link)" :key="app.id">
            {{ app.name }}
          </button>
          <h3>开发</h3>
          <button v-for="app in devApps" class="custom-btn btn" @click="jump(app.link)" :key="app.id">
            {{ app.name }}
          </button>
          <h3>云开发</h3>
          <button v-for="app in yunDevs" class="custom-btn btn" @click="jump(app.link)" :key="app.id">
            {{ app.name }}
          </button>
        </div>
      </div>
    </transition>
  </div>


</template>

<script>
export default {
  name: "AppList",
  data() {
    return {
      appListShow: false,
      commonlyUsedApps: [
        {
          id: 1,
          name: "哔哩哔哩",
          link: "https://www.bilibili.com"
        },
        {
          id: 2,
          name: "GitHub",
          link: "https://github.com"
        },
        {
          id: 3,
          name: "Google翻译",
          link: "https://translate.google.cn"
        },
        {
          id: 4,
          name: "百度地图",
          link: "https://map.baidu.com/"
        },
        {
          id: 5,
          name: "空投快传",
          link: "https://airportal.cn/"
        },
        {
          id: 6,
          name: "QQ邮箱",
          link: "https://mail.qq.com/"
        },

      ],
      personalWebsite: [
        {
          id: 100,
          name: "包子",
          link: "https://www.bugjava.cn/"
        },
        {
          id: 101,
          name: "包子's Blog",
          link: "https://blog.bugjava.cn/"
        },
        {
          id: 102,
          name: "包子API",
          link: "https://api.bugjava.cn/"
        }
      ],
      devApps: [
        {
          id: 200,
          name: "codepen",
          link: "https://codepen.io/"
        },
        {
          id: 201,
          name: "吾爱破解",
          link: "https://www.52pojie.cn/"
        },
        {
          id: 202,
          name: "Uni-App",
          link: "https://uniapp.dcloud.io/"
        }
        ,
        {
          id: 203,
          name: "Vue.js",
          link: "https://cn.vuejs.org/"
        },
        {
          id: 204,
          name: "Element-UI",
          link: "https://element.eleme.cn/"
        },
        {
          id: 205,
          name: "掘金",
          link: "https://juejin.cn/"
        },
        {
          id: 206,
          name: "Can I Use",
          link: "https://caniuse.com/"
        }


      ],
      yunDevs: [
        {
          id: 301,
          name: "腾讯云",
          link: "https://cloud.tencent.com/"
        },
        {
          id: 302,
          name: "阿里云",
          link: "https://www.aliyun.com/"
        },
        {
          id: 303,
          name: "百度云",
          link: "https://cloud.baidu.com/"
        },
        {
          id: 304,
          name: "华为云",
          link: "https://www.huaweicloud.com/"
        }
      ],
      otherApps: []
    }
  },
  methods: {
    hideList() {
      this.appListShow = false
    },
    jump(value) {
      top.location.href = value
    }
  },
  mounted() {
    this.$bus.$on("changeAppListShow", (value) => {
      if (value !== undefined){
        this.appListShow=value
      }else{
        this.appListShow = !this.appListShow
      }
    })
  },
  beforeMount() {
    if (!localStorage.getItem("develop")) {
      localStorage.setItem("develop", "")
    } else {
      let appsArr = localStorage.getItem("develop").split("#");
      for (let i = 0; i < appsArr.length - 1; i++) {
        let parse = JSON.parse(appsArr[i]);
        this.otherApps.push(parse)
      }

    }
  }
}
</script>

<style scoped>
.appsList {
  box-sizing: border-box;
  background-color: rgba(140, 142, 145, 0.6);
  position: fixed;
  right: 0;
  width: 360px;
  top: 0;
  bottom: 0;
  padding: 25px;
  overflow: scroll;
  overflow-style: auto;
  overflow-x: hidden;
  text-shadow: 0 0 20px rgb(0 0 0 / 80%);
}

.appsList::-webkit-scrollbar {
  display: none
}

.icon {
  position: fixed;
  right: 10px;
  top: 16px;
  cursor: pointer;
  color: #fefefe;
}

h3, p {
  color: #fefefe;
}

.app-enter, .app-leave-to {
  transform: translateX(100%);
}

.app-enter-active, .app-leave-active {
  transition: 0.3s linear;
}

.app-enter-to, .app-leave {
  transform: translateX(0);
}

.btn {
  border: none;
  color: #000;
}

.btn:after {
  position: absolute;
  content: "";
  width: 0;
  height: 100%;
  top: 0;
  left: 0;
  direction: rtl;
  z-index: -1;
  box-shadow: -7px -7px 20px 0px #fff9,
  -4px -4px 5px 0px #fff9,
  7px 7px 20px 0px #0002,
  4px 4px 5px 0px #0001;
  transition: all 0.3s ease;
}

.btn:hover {
  color: #000;
}

.btn:hover:after {
  left: auto;
  right: 0;
  width: 100%;
}

.btn:active {
  top: 2px;
}

.custom-btn {
  width: 130px;
  height: 40px;
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, .5),
  7px 7px 20px 0px rgba(0, 0, 0, .1),
  4px 4px 5px 0px rgba(0, 0, 0, .1);
  outline: none;
  overflow: hidden;
}

.appList button {
  margin: 10px;
}

</style>