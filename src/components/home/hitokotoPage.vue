<template>
  <div class="hitokotoRoot">
    <span :class="{hitokotoFont:true, isSolidColor:SolidColor}">「 {{ msg }} 」</span>
  </div>
</template>

<script>
export default {
  name: "hitokotoPage",
  data() {
    return {
      msg: ""
    }
  },
  computed: {
    SolidColor() {
      return localStorage.getItem("ThemeBackGround") === "solidColor"
    }
  },
  beforeMount() {
    let url = "https://v1.hitokoto.cn/?c=d&c=h&c=i&c=j&encode=json"
    this.$axios({
      method: "get",
      url: url
    }).then((res) => {
      console.log(res.data.hitokoto);
      this.msg = res.data.hitokoto
    })
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
  /*background-color: green;*/
  /*filter: blur(10px);*/
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