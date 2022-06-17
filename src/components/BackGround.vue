<template>
  <div class="mainBackground">
    <img class="mainbg" v-if="mainBackground.type === 'img'" :src="mainBackground.imgSrc" alt="backgroundPicture">
    <video class="mainbg" loop v-else :src="mainBackground.videoSrc" muted autoplay></video>
  </div>
</template>

<script>

export default {
  name: "backGround",
  data() {
    return {
      mainBackground: {
        videoSrc: "",
        imgSrc: "./img/bg1.jpg",
        // imgSrc: "https://cdn.seovx.com/?mom=302",
        type: "img",
        DB:{}
      }
    }
  },
  beforeCreate() {
    const indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB,
        dbVersion = 2;
    if (!indexedDB) {
      alert("你的浏览器不支持IndexedDB");
    }
    var request = indexedDB.open('ImagesDB', dbVersion)
    var DB
    request.onerror = function (e) {
      console.log(e.currentTarget.error.message)
    }
    request.onupgradeneeded = function (e) {
      DB = e.target.result
      if (!DB.objectStoreNames.contains('VideoImages')) {
        DB.createObjectStore('VideoImages')
      }
    }

    request.onsuccess = ()=>{
      DB = request.result
      DB.onerror = function (e) {
        console.log(e.currentTarget.error.message)
      }
      this.$data.mainBackground.DB = DB
    }
  },
  beforeMount() {

  }
}
</script>

<style scoped>
.mainBackground {
  position: fixed;
  object-fit: cover;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.mainbg {
  width: 100%;
  height: 100%;
  z-index: -3;
  -o-object-fit: cover;
  object-fit: cover;
  transition: opacity 1s, transform .25s, filter .25s
}

</style>