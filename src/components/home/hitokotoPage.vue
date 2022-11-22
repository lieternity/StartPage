<template>
  <div @click="changeMsg" v-if="yiyan" class="hitokotoRoot">
    <div class="blurred"></div>
    <div v-if="type === 'hitokoto'">
      <span class="hitokotoFont" :class="{isSolidColor:SolidColor}" v-show="yiyantext">「 {{ msg }} 」</span>
    </div>
    <div v-show="yiyantext" v-if="type === 'poetry'">
      <span class="hitokotoFont" :class="{isSolidColor:SolidColor}">「 {{ msg.content }} 」</span>
      <span v-show="msg.author !== void 0 && msg.origin !== void 0" class="hitokotoFont"
            :class="{isSolidColor:SolidColor}"
            style="position: relative;top: 20px;font-size:calc(1em - 5px) ">
        <span>{{ msg.author }}</span>---<span>{{ msg.origin }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "hitokotoPage",
  data() {
    return {
      msg: "",
      type: "",
      yiyan: true,
      yiyantext: true,
      yiyanurl: "https://v1.hitokoto.cn/?c=d&c=h&c=i&c=j&encode=json",
      shiciurl: "https://v1.jinrishici.com/all"
    }
  },
  computed: {
    SolidColor() {
      return localStorage.getItem("ThemeBackGround") === "solidColor"
    }
  },
  methods: {
    getHitokoto(url) {
      this.$axios({
        method: "get",
        url: url
      }).then((res) => {
        this.msg = res.data.hitokoto
        this.yiyantext = true
      }).catch(() => {
        this.msg = "你点击的太快了！！！"
        this.yiyantext = true
      })
    },
    getjinrishici(url) {
      this.$axios({
        method: "get",
        url: url
      }).then((res) => {
        this.msg = res.data
        this.yiyantext = true
      }).catch(() => {
        this.msg.content = "你点击的太快了！！！"
        this.msg.author = void 0
        this.yiyantext = true
      })
    },
    changeMsg() {
      this.yiyantext = false
      if (this.type === "hitokoto") {
        this.getHitokoto(this.yiyanurl)
      } else if (this.type === "poetry") {
        this.getjinrishici(this.shiciurl)
      } else {
        this.yiyan = false
      }
    }
  },
  beforeMount() {
    this.type = localStorage.getItem("hitokotoClass")
    if (this.type === "hitokoto") {
      this.getHitokoto(this.yiyanurl)
    } else if (this.type === "poetry") {
      this.getjinrishici(this.shiciurl)
    } else {
      this.yiyan = false
    }

  }
}
</script>

<style scoped>

.hitokotoRoot *{
  white-space: nowrap;
}

.hitokotoRoot {
  position: fixed;
  bottom: 100px;
  height: 120px;
  text-align: center;
  line-height: 120px;
  transition: all 0.5s !important;
  width: 50vw;
  left: 50%;
  transform: translateX(-50%);

  /*z-index: -1;*/
  /*background-color: green;*/
  /*filter: blur(10px);*/
}

.blurred {
  z-index: -1;
  position: absolute;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(30px) !important;
  opacity: 0;
  transition: all 0.5s !important;
  border-radius: 10px;
}

.hitokotoRoot:hover > .blurred {
  opacity: 1;
}

.hitokotoFont {
  color: hsla(0, 0%, 100%, .9);
  text-shadow: 0 0 20px rgb(0 0 0 / 80%);
  animation: showText 0.5s linear;
  white-space: nowrap;
}

.isSolidColor {
  color: #000000 !important;
}

@keyframes showText {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

</style>