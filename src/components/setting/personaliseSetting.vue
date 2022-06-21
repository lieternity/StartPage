<template>
  <div class="personaliseRoot" style="height: 100%;width: 100%;padding: 20px">
    <h2>个性化</h2>
    <div class="preview">
      <back-ground style=" width: 100%!important;height: 100% !important; "/>
    </div>
    <div class="controlCard">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-tupian"></use>
      </svg>
      <span>背景</span>
      <el-popover
          placement="top-start"
          title="Who am i？"
          width="200"
          trigger="hover"
          content="这是一个开关，用来控制，首页的遮罩，还不知道？打开或者关闭后看看首页">
        <el-switch
            class="switch"
            slot="reference"
            v-model="gradient"
        >
        </el-switch>
      </el-popover>
      <el-input v-show="themeBackGround === 'img'" v-model="imgSrc" class="imgInput" @blur="setImgSrc"
                placeholder="请输入图片的url地址"></el-input>
      <div v-show="themeBackGround === 'video'" @click="upVideoFn" class="upVideo">
        <input ref="upInput" type="file">
        上传视频
      </div>
      <el-select v-model="themeBackGround" class="themeColor" placeholder="请选择">
        <el-option
            v-for="item in themeBackGrounds"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="controlCard">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-huaban"></use>
      </svg>
      <span>主题</span>
      <el-select v-model="themeColor" class="themeColor" placeholder="请选择">
        <el-option
            v-for="item in themeColors"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import BackGround from "@/components/home/BackGround";

export default {
  name: "personaliseSetting",
  data() {
    return {
      themeBackGrounds: [{
        value: 'solidColor',
        label: '纯色'
      }, {
        value: 'img',
        label: '在线图片'
      }, {
        value: 'video',
        label: '视频背景'
      }],
      themeColors: [{
        value: 'followTheSystem',
        label: '跟随系统'
      }, {
        value: 'lightTheme',
        label: '浅色背景'
      }, {
        value: 'darkTheme',
        label: '深色背景'
      }],
      imgSrc: this.getImgSrc(),
      themeColor: this.getThemeColor(),
      themeBackGround: this.getThemeBackGround(),
      gradient: this.getGradient()
    }
  },
  methods: {
    giveMessage() {
      console.log(123)
      this.$notify.info({
        title: '消息',
        message: '这是一条消息的提示消息'
      });
    },
    getGradient() {
      return localStorage.getItem("gradient") === "true"
    },
    getImgSrc() {
      return localStorage.getItem("imgSrc")
    },
    setImgSrc() {
      localStorage.setItem("imgSrc", this.imgSrc)
      window.location.reload()
    },
    getThemeColor() {
      return localStorage.getItem("ThemeColor");
    },
    getThemeBackGround() {
      return localStorage.getItem("ThemeBackGround")
    },
    upVideoFn() {
      var upInput = this.$refs.upInput;
      upInput.click()
      upInput.onchange = (e) => {
        const resultFile = e.target.files;
        console.log(`resultFile`, resultFile);
        if (resultFile.length) {
          const aBlob = new Blob([resultFile[0]], {type: 'video/mp4'});
          console.log(this)
          this.$bus.$emit("getBlob", aBlob)
        } else {
          console.log("上传失败");
        }
      }
    }
  },
  watch: {
    themeBackGround(newValue) {
      if (newValue === "solidColor" || newValue === "video") {
        localStorage.setItem("gradient", "false")
      } else {
        localStorage.setItem("gradient", "true")
      }
      localStorage.setItem("ThemeBackGround", this.themeBackGround)
      window.location.reload()
    },
    themeColor() {
      localStorage.setItem("ThemeColor", this.themeColor)
      window.location.reload()
    },
    gradient() {
      localStorage.setItem("gradient", this.gradient)
    }

  },

  components: {BackGround}
}
</script>

<style scoped>
h2 {
  color: #666666;
}

.preview {
  width: 400px !important;
  height: 225px !important;
  border: #cbcbcc dashed 1px;
}

.imgInput {
  position: absolute;
  right: 260px;
  width: 300px;
  display: inline-block;
  margin-right: 30px;
  border-radius: 3px;
  animation: menuFadeOut 0.3s forwards;
}

.switch {
  position: relative;
  right: -280px;
}

.mainBackground {
  position: static !important;
}

.upVideo {
  position: absolute;
  right: 300px;
  display: inline-block;
  margin-right: 30px;
  border-radius: 3px;
  padding: 0 10px;
  border: #cbcbcc solid 1px;
  animation: menuFadeOut 0.3s forwards;
  cursor: pointer;
}

.upVideo input {
  display: none;
}

.personaliseRoot {
  display: flex;
  flex-direction: column !important;
  gap: 2.5rem !important;
  flex-wrap: nowrap;
}

.controlCard {
  position: relative;
  width: 80%;
  height: 40px;
  font-weight: bold;
  line-height: 40px;
  padding: 12px 16px;
  border: #e5e7eb solid 1px;
  border-radius: 10px;
}

.controlCard * {
  margin-left: 12px;
}

.themeColor {
  position: absolute;
  right: 30px;
  height: 30px;
  text-align: center;
  outline: none;
  border-radius: 5px;
}
</style>