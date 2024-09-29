<template>
  <div class="frosted-glass-background-applist" @click="closeOpacity2"
       :style="{opacity:bgOpacity,zIndex:bgOpacity === 0?'-10':'1000'}">
    <!-- 右键菜单 -->
    <div v-if="menuVisible" :style="menuStyle" class="custom-menu custom-btn">
      <ul>
        <li @click="sendToPhone">发送到手机</li>
      </ul>
    </div>

    <!-- 弹出框 -->
    <div v-if="popupVisible" class="popup">
      <div class="popup-content">
        <p>微信/浏览器扫一扫打开</p>
        <img :src="popupimg" alt="二维码出错" class="qr-code">
        <p>{{ popupname }}</p>
        <button @click="closePopup">关闭</button>
      </div>
    </div>

    <div class="app_list_box">
      <div class="tabs">
        <div class="appList">
          <h3 v-show="otherApps.length !== 0">Customize</h3>
          <div v-show="otherApps.length !== 0" class="app_list">
            <div @contextmenu.prevent="showMenu($event,app.name,app.link)"  v-show="otherApps.length !== 0"
                 v-for="app in otherApps"
                 class="custom-btn btn"
                 @click="jump(app.link)"
                 :key="app.id">
              <span :url="app.link">{{ app.name }}</span>
            </div>
          </div>

          <h3>个人网站</h3>
          <div class="app_list">
            <div @contextmenu.prevent="showMenu($event,app.name,app.link)" v-for="app in personalWebsite"
                 class="custom-btn btn"
                 @click="jump(app.link)" :key="app.id">
              <span :url="app.link">{{ app.name }}</span>
            </div>
          </div>
          <h3>常用</h3>
          <div class="app_list">
            <div @contextmenu.prevent="showMenu($event,app.name,app.link)"  v-for="app in commonlyUsedApps" class="custom-btn btn" @click="jump(app.link)" :key="app.id">
              <span :url="app.link">{{ app.name }}</span>
            </div>
          </div>

          <h3>开发</h3>
          <div class="app_list">
            <div @contextmenu.prevent="showMenu($event,app.name,app.link)"  v-for="app in devApps" class="custom-btn btn" @click="jump(app.link)" :key="app.id">
              <span :url="app.link">{{ app.name }}</span>
            </div>
          </div>
          <h3>云开发</h3>
          <div class="app_list">
            <div @contextmenu.prevent="showMenu($event,app.name,app.link)"  v-for="app in yunDevs" class="custom-btn btn" @click="jump(app.link)" :key="app.id">
              <span :url="app.link">{{ app.name }}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import QRCode from 'qrcode';

export default {
  name: "AppList",
  data() {
    return {
      bgOpacity: 0,
      appListShow: false,
      menuVisible: false,
      popupVisible: false,
      popupname: "",
      popupimg: "",
      menuStyle: {
        top: '0px',
        left: '0px'
      },
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
          link: "https://translate.google.com"
        },
        {
          id: 4,
          name: "百度地图",
          link: "https://map.baidu.com/"
        },
        {
          id: 5,
          name: "文叔叔",
          link: "https://www.wenshushu.cn/"
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
    generateQRCode(url) {
      // 返回一个 Promise，生成二维码并返回二维码的 Data URL
      return QRCode.toDataURL(url)
          .then(dataUrl => {
            console.log(dataUrl)
            this.popupimg = dataUrl;  // 返回生成的二维码 Data URL
          })
          .catch(error => {
            console.error('生成二维码时出错:', error);
            throw error; // 如果出错，抛出异常
          });
    },
    showMenu(event, name, link) {
      this.popupname = name
      this.generateQRCode(link)
      // 显示右键菜单，并根据鼠标位置设置位置
      this.menuVisible = true;
      this.menuStyle.top = `${event.clientY}px`;
      this.menuStyle.left = `${event.clientX}px`;

      // 监听点击事件，点击页面其他部分时关闭右键菜单
      document.addEventListener('click', this.hideMenu);
    },
    hideMenu() {
      this.menuVisible = false;
      document.removeEventListener('click', this.hideMenu);
    },
    sendToPhone() {
      // 显示发送到手机的弹出框
      this.popupVisible = true;
      this.hideMenu(); // 关闭右键菜单
    },
    closePopup() {
      // 关闭弹出框
      this.popupVisible = false;
    },
    closeOpacity2(event) {
      if (event.target.classList.contains('frosted-glass-background-applist')) {
        this.bgOpacity = 0;
        this.$bus.$emit("backgroundBecomesLarger", 1);
      }

    },
    jump(value) {
      top.location.href = value
    }
  },
  mounted() {
    this.$bus.$on("changeAppListShow", (value) => {
      if (value === true) {
        this.bgOpacity = 1;
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
.frosted-glass-background-applist {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff30;
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  color: #ffffff;
  border-radius: 8px;
  transition: opacity .3s, transform .3s, margin-top .3s, height .3s;
}

.custom-btn {
  cursor: pointer;
  height: 60px;
  width: 200px;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #00000030;
  border-radius: 8px;
  font-size: 16px;
  transition: background-color .3s, box-shadow .3s;
}

.custom-btn:hover {
  background-color: #00000040;
  box-shadow: 0 0 0 2px #00000040;
}

.app_list_box {
  position: absolute;
  width: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 64vh;
  background-color: #00000030;
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  color: #ffffff;
  border-radius: 8px;
  transition: opacity .3s, transform .3s, margin-top .3s, height .3s;
  overflow: hidden;
}

.appList {
  padding-top: 20px;
  overflow: scroll; /* Enables scrolling */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
}

.appList::-webkit-scrollbar {
  width: 0; /* Safari and Chrome */
  height: 0;
}

.tabs {
  display: flex;
  height: 100%;
  flex-direction: column;
}

.tab-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* 子元素平分父元素的宽度 */
  justify-items: center; /* 子元素在父元素内居中 */
}

.tab-list div {
  width: 100%;
  text-align: center; /* 子元素内的文本居中 */
  cursor: pointer;
  padding: 10px;
  /*transition: all 0.3s ease;*/
}

.tab-list div.active {
  color: #FFFFFF;
  border-bottom: 3px solid #FFFFFF;
}

.tab-content {
  z-index: 9999;
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none; /* IE and Edge */

}

.tab-content::-webkit-scrollbar {
  display: none; /* Chrome, Safari, and Opera */
}

.tabs-container {
  height: 100%;
  display: flex;
}

.app_list {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 20px;
  flex-wrap: wrap;
  box-sizing: border-box;
}


/* 定义过渡动画 */

/* 过渡动画 */
.slide-left-enter-active {
  animation: menuFadeOut 0.6s forwards;
  width: 100%;
}

.slide-left-leave-active {
  display: none;
}


div[mode='out-in'] {
  width: 100%;
}

h3 {
  display: none;
}

/*2024-9-29*/
.custom-menu {
  position: absolute;
  width: 100px;
  height: 30px;
  padding: 5px !important;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.custom-menu ul {
  list-style: none;
  margin: 0;
  padding: 10px;
}

.custom-menu li {
  cursor: pointer;
}

.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  padding: 20px;
  background-color: #00000060;
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  border-radius: 15px;
  overflow: hidden;
}

.popup-content {
  text-align: center;
}

.qr-code {
  width: 150px;
  height: 150px;
}

button {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

</style>
