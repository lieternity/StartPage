<template>
  <div class="personaliseRoot" style="height: 100%;width: 100%;padding: 20px">
    <h2>个性化</h2>
    <div class="preview">
      <back-ground style=" width: 100%!important;height: 100% !important; "/>
    </div>
    <div class="controlCard">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-huaban"></use>
      </svg>
      <span>页面载入动画 <span style="font-size: 10px;color: #7f7f88;">(如果使用的在线图片，将载入动画关闭较好！！！)</span> </span>
      <el-switch style="position:absolute;right: 100px;top:20px"
                 v-model="loadingAnimation"
                 active-color="#13ce66"
                 inactive-color="#ff4949">
      </el-switch>
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
      <div v-show="themeBackGround === 'img'" class="upImg">
        <el-upload
            action=""
            class="alignContainer"
            :http-request="upImgFn"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
        >
          <el-button class="avatar-update">上传背景图</el-button>
        </el-upload>
      </div>
      <div v-show="themeBackGround === 'video' || themeBackGround === 'localimg'" @click="upVideoFn" class="upVideo">
        <input ref="upInput" type="file">
        上传图片视频
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
    <!--    <div class="controlCard">
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
        </div>-->
    <div class="controlCard">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-huaban"></use>
      </svg>
      <span>页面底部波浪</span>
      <el-select v-model="wave" class="themeColor" placeholder="请选择">
        <el-option
            label="开启"
            value="true">
        </el-option>
        <el-option
            label="关闭"
            value="false">
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import BackGround from "@/components/home/BackGround";
import {Message} from "element-ui";

export default {
  name: "personaliseSetting",
  data() {
    return {
      wave: "",
      loadingAnimation: this.getLoadingAnimation(),
      themeBackGrounds: [{
        value: 'solidColor',
        label: '纯色'
      }, {
        value: 'img',
        label: '在线图片'
      }, {
        value: 'video',
        label: '本地视频背景'
      }, {
        value: 'localimg',
        label: '本地图片背景'
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
    getLoadingAnimation() {
      return localStorage.getItem("loadingAnimation") === "true"
    },
    beforeAvatarUpload(file) {
      const isJpgOrPng = (file.type === 'image/jpeg' || file.type === 'image/png');
      const isLt2M = file.size / 1024 / 1024 < 5;

      if (!isJpgOrPng) {
        Message({
          showClose: true,
          message: '上传头像图片只能是 JPG 或者 PNG格式!',
          type: 'error'
        });
      }
      if (!isLt2M) {
        Message({
          showClose: true,
          message: '上传头像图片大小不能超过 5MB!',
          type: 'error'
        });
      }
      return isJpgOrPng && isLt2M;
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
          const aBlob = new Blob([resultFile[0]], {type: resultFile[0].type});
          console.log(aBlob)
          this.$bus.$emit("getBlob", aBlob)
        } else {
          console.log("上传失败");
        }
      }
    },
    upImgFn(file) {
      const formData = new FormData()
      formData.append('pic', file.file)

      this.$axios.post(process.env.VUE_APP_UPLOAD, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }, {
        timeout: 30000
      }).then(res => {
        console.log(res.data)
        if (res.data.code === "success") {
          localStorage.setItem("imgSrc", res.data.data.url)
          Message({
            type: "success",
            message: "上传成功",
            showClose: true,
            duration: 1000,
            onClose: () => {
              // window.location.reload()
            }
          })
        } else {
          Message({
            type: "warning",
            message: "上传出错",
            showClose: "true"
          })
        }
      }).catch(err => {
        Message({
          type: "warning",
          message: err,
          showClose: "true"
        })
      })
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
    },
    loadingAnimation() {
      localStorage.setItem("loadingAnimation", this.loadingAnimation)
    },
    wave(newValue) {
      localStorage.setItem("wave", newValue)
    }

  },
  beforeMount() {
    this.wave = localStorage.getItem("wave")
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
  right: 330px;
  width: 300px;
  display: inline-block;
  margin-right: 30px;
  border-radius: 3px;
  animation: menuFadeOut 0.3s forwards;
}

.switch {
  position: relative;
  right: -200px;
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

.upImg {
  position: absolute;
  right: 240px !important;
  display: inline-block;
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
