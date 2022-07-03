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
        <el-timeline-item timestamp="2022/7/3" placement="top">
          <el-card>
            <h4>美化右键菜单</h4>
            <dt>功能：</dt>
            <dd>让右键菜单好看点</dd>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2022/7/2" placement="top">
          <el-card>
            <h4>新增载入页面动画</h4>
            <dt>功能：</dt>
            <dd>在页面没有完全加载完成前，显示动画</dd>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2022/7/1" placement="top">
          <el-card>
            <h4>新增快捷导航</h4>
            <dt>功能：</dt>
            <dd>用户可以快速进入自己常用的网站</dd>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2022/6/23" placement="top">
          <el-card>
            <h4>新增自定义字体</h4>
            <dt>功能：</dt>
            <dd>用户可以自主切换网站的默认字体样式和大小</dd>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2022/6/21" placement="top">
          <el-card>
            <h4>网站整体完成</h4>
            <dt>功能：</dt>
            <dd>用户设置云同步，自定义背景（本地视频，在线图片&lt;需要搭配 <a target="_blank"
                                                   href="https://www.baidu.com/s?word=%E5%9B%BE%E5%BA%8A">图床</a> &gt;），自定义头像
              等...
            </dd>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2022/6/20" placement="top">
          <el-card>
            <h4>网站大体完成</h4>
            <dt>功能：</dt>
            <dd>自以为好看</dd>
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
      config: Config
    }
  },
  methods: {
    goToBin() {
      top.location.href = 'https://bin.bugjava.cn'
    },
    clearConfig(){
      localStorage.clear()
      this.$message({
        type:"success",
        message:"配置文件清除成功！！！",
        duration:1000,
        onClose:()=>{
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