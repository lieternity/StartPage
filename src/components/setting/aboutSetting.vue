<template>
  <div class="aboutRoot" style="height: 100%;width: 100%;padding: 20px">
    <h2>关于</h2>
    <el-collapse class="collapseList">
      <el-collapse-item title="设备信息 DeviceInformation " name="1">
        <div>浏览器：{{ bowserName.browserName }}</div>
        <div>版本：{{ bowserName.browserVersion }}</div>
        <div>系统：{{ bowserName.OSname }}</div>
      </el-collapse-item>
      <el-collapse-item title="版本信息 VersionInformation" name="2">
        <div>版本：0.3</div>
        <div>更新日期：2022-6-19</div>
        <div>发布者：包子</div>
      </el-collapse-item>
      <el-button @click="goToBin" type="text">反馈中心 FeedbackHub</el-button>
    </el-collapse>
    <div class="block">
      <el-timeline>
        <el-timeline-item timestamp="2022/6/21" placement="top">
          <el-card>
            <h4>网站的设置部分完成</h4>
            <dt>功能：</dt>
            <dd>用户设置云同步，自定义背景（本地视频，在线图片&lt;需要搭配 <a target="_blank" href="https://www.baidu.com/s?word=%E5%9B%BE%E5%BA%8A">图床</a> &gt;），自定义头像 等...</dd>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2022/6/20" placement="top">
          <el-card>
            <h4>网站大体完成</h4>
            <dt>功能：</dt>
            <dd>自以为好看</dd>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import Bowser from "bowser";

export default {
  name: "aboutSetting",
  data() {
    return {
      isClick: true
    }
  },
  methods: {
    goToBin() {
      top.location.href = 'https://bin.bugjava.cn'
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
  }

}
</script>

<style scoped>
h2 {
  color: #666666;
}

.aboutRoot {
  display: flex;
  flex-direction: column !important;
  gap: 2.5rem !important;
}
</style>