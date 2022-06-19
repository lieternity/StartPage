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
        <div>版本：0.1</div>
        <div>更新日期：2022-6-19</div>
        <div>发布者：包子</div>
      </el-collapse-item>
      <el-button @click="goToBin"  type="text">反馈中心 FeedbackHub</el-button>
    </el-collapse>
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
  methods:{
    goToBin(){
      top.location.href='https://bin.bugjava.cn'
    }
  },
  computed: {
    bowserName() {
      const browser = Bowser.getParser(window.navigator.userAgent);
      return {
        browserName: browser.getBrowserName(),
        browserVersion:browser.getBrowserVersion(),
        OSname:browser.getOSName()
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