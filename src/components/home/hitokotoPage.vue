<template>
  <div v-if="yiyan" class="hitokotoRoot">
    <span v-if="type === 'hitokoto'" class="hitokotoFont" :class="{isSolidColor:SolidColor}">「 {{ msg }} 」</span>
    <div v-if="type === 'poetry'">
      <span class="hitokotoFont" :class="{isSolidColor:SolidColor}">「 {{ msg.content }} 」</span>
      <span class="hitokotoFont" style="position: relative;top: 20px;font-size:calc(1em - 5px) ">
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
      yiyan: true
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
      })
    }, getjinrishici(url) {
      this.$axios({
        method: "get",
        url: url
      }).then((res) => {
        console.log(res.data)
        this.msg = res.data
      })
    }
  },
  beforeMount() {
    this.type = localStorage.getItem("hitokotoClass")
    let yiyanurl = "https://v1.hitokoto.cn/?c=d&c=h&c=i&c=j&encode=json"
    let shiciurl = "https://v1.jinrishici.com/all"
    if (this.type === "hitokoto") {
      this.getHitokoto(yiyanurl)
    } else if (this.type === "poetry") {
      this.getjinrishici(shiciurl)
    } else {
      this.yiyan = false
    }

  }
}
</script>

<style scoped>
.hitokotoRoot {
  position: fixed;
  bottom: 100px;
  width: 100%;
  height: 100px;
  text-align: center;
  line-height: 100px;
  transition: all 0.3s;
  /*z-index: -1;*/
  /*background-color: green;*/
  /*filter: blur(10px);*/

}
.hitokotoRoot:hover{
  backdrop-filter: blur(15px);
}

.hitokotoFont {
  color: hsla(0, 0%, 100%, .9);
  text-shadow: 0 0 20px rgb(0 0 0 / 80%);
  transition: all .25s;
}

.isSolidColor {
  color: #000000 !important;
}
</style>