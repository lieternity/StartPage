<template>
  <div class="aboutRoot" style="height: 100%;width: 100%;padding: 20px;overflow: scroll;">
    <template>
      <el-backtop target=".aboutRoot" :bottom="50">
        <div style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiangshang1"></use>
          </svg>
        </div>
      </el-backtop>
    </template>
    <h2>关于</h2>
    <el-collapse class="collapseList">
      <el-collapse-item title="设备信息 DeviceInformation " name="1">
        <div>浏览器：{{ bowserName.browserName }}</div>
        <div>版本：{{ bowserName.browserVersion }}</div>
        <div>系统：{{ bowserName.OSname }}</div>
        <el-button @click="clearConfig" type="">清除配置信息</el-button>
      </el-collapse-item>
      <el-collapse-item title="版本信息 VersionInformation" name="2">
        <div>版本：{{ config.version }}</div>
        <div>更新日期：{{ config.author.upDataTime }}</div>
        <div>发布者：{{ config.author.name }}</div>
      </el-collapse-item>
      <el-collapse-item title="项目依赖 ProjectDependencies" name="3">
        <h2>项目依赖</h2>
        <el-divider></el-divider>
        <el-timeline>
          <el-timeline-item
              v-for="(value, key) in config.dependencies"
              :key="key"
              :timestamp="value">
            {{ key }}
          </el-timeline-item>
        </el-timeline>
        <h2>开发依赖</h2>
        <el-divider></el-divider>
        <el-timeline>
          <el-timeline-item
              v-for="(value, key) in config.devDependencies"
              :key="key"
              :timestamp="value">
            {{ key }}
          </el-timeline-item>
        </el-timeline>
      </el-collapse-item>
      <el-button @click="goToBin" type="text">反馈中心 FeedbackHub</el-button>
    </el-collapse>
    <div class="block">
      <el-timeline class="Timeline">
        <el-timeline-item v-for="(item, index) in line_time" :key="index" :timestamp="item.time" placement="top">
          <el-card>
            <h4>{{ item.title }}</h4>
            <dl>
              <dt>{{ item.p }}</dt>
              <dd v-html="item.content"></dd>
            </dl>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2022/6/18" placement="top">
          <el-card>
            <h4>初始化工程</h4>
            <p>npm init</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import Bowser from "bowser";
import Config from '../../../package.json'

export default {
  name: "aboutSetting",
  data() {
    return {
      isClick: true,
      config: Config,
      line_time: [
        {
          "time": "2024/10/15",
          "title": "修复网站出现的bug",
          "p": "说明：",
          "content": '1.修复网站出现的bug'
        },
        {
          "time": "2024/9/29",
          "title": "修复网站出现的bug|添加快捷网址生成二维码.",
          "p": "说明：",
          "content": '1.修复网站出现的bug  2.在网址合集页面，右键可以生成二维码，方便手机快速扫码访问'
        },
        {
          "time": "2024/8/4",
          "title": "更新常用网站的样式",
          "p": "说明：",
          "content": '修改网站捷径的样式，使网页看起来更加协调'
        },
        {
          "time": "2024/7/2",
          "title": "新增在线视频背景",
          "p": "说明：",
          "content": '可以设置视频格式的外链地址作为网站的背景，也可以使用随机视频API'
        },
        {
          "time": "2024/6/3",
          "title": "新增便签功能",
          "p": "说明：",
          "content": '通过点击首页的时间，打开便签页面，就可以添加您的便签了'
        },
        {
          "time": "2024/5/6",
          "title": "新增待办功能",
          "p": "说明：",
          "content": '通过点击首页的时间，打开待办页面，添加您的待办事件'
        },
        {
          "time": "2023/10/27",
          "title": "添加将背景图片视频存放到本地功能",
          "p": "说明：",
          "content": '背景图片视频存放到本地,大大加快了网站打开速度<br>在右上角的设置，个性化，选择本地图片或视频后就可以选择上传了，后上传的会覆盖前上传的'
        },
        {
          "time": "2022/9/3",
          "title": "添加诗词API，更换全局页面加载动画",
          "p": "说明：",
          "content": '在设置里面的一言接口选择诗词'
        },
        {
          "time": "2022/8/21",
          "title": "云同步配置",
          "p": "功能：",
          "content": '登陆账号可以上传和同步配置文件'
        },
        {
          "time": "2022/7/3",
          "title": "美化右键菜单（2024-06-03已移除）",
          "p": "功能：",
          "content": '让右键菜单好看点'
        },
        {
          "time": "2022/7/2",
          "title": "新增载入页面动画",
          "p": "功能：",
          "content": '在页面没有完全加载完成前，显示动画'
        },
        {
          "time": "2022/7/1",
          "title": "新增快捷导航",
          "p": "功能：",
          "content": '用户可以快速进入自己常用的网站'
        },
        {
          "time": "2022/6/23",
          "title": "新增自定义字体",
          "p": "功能：",
          "content": '用户可以自主切换网站的默认字体样式和大小'
        },
        {
          "time": "2022/6/21",
          "title": "网站整体完成",
          "p": "功能：",
          "content": '用户设置云同步，自定义背景（本地视频，在线图片&lt;需要搭配 <a target="_blank" href="https://cn.bing.com/search?q=%E5%9B%BE%E5%BA%8A">图床</a>&gt;），自定义头像 等...'
        },
        {
          "time": "2022/6/20",
          "title": "网站大体完成",
          "p": "说明：",
          "content": '感觉还行'
        },
      ]
    }
  },
  methods: {
    goToBin() {
      top.location.href = 'https://bin.bugjava.cn'
    },
    clearConfig() {
      localStorage.clear()
      this.$message({
        type: "success",
        message: "配置文件清除成功！！！",
        duration: 1000,
        onClose: () => {
          window.location.reload()
        }
      })
    }
  },
  computed: {
    bowserName() {
      const browser = Bowser.getParser(window.navigator.userAgent);
      return {
        browserName: browser.getBrowserName(),
        browserVersion: browser.getBrowserVersion(),
        OSname: browser.getOSName()
      }
    }
  }, mounted() {
    // console.log(Config)
  }

}
</script>

<style scoped>
h2 {
  color: #666666;
  cursor: default;
}

.aboutRoot {
  display: flex;
  flex-direction: column !important;
  gap: 2.5rem !important;
}

.collapseList, .Timeline {
  width: 80%;
}
</style>
