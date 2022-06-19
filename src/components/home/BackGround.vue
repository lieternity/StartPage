<template>
  <div :class="{darkTheme:darkTheme,isSolidColor:mainBackground.type === 'solidColor',mainBackground:true}">
    <img class="mainbg" v-if="mainBackground.type === 'img'" :src="mainBackground.imgSrc" alt="backgroundPicture">
    <video class="mainbg" loop v-else-if="mainBackground.type === 'video'" :src="mainBackground.videoSrc" muted
           autoplay></video>
  </div>
</template>

<script>

export default {
  name: "backGround",
  data() {
    return {
      darkTheme: false,
      mainBackground: {
        videoSrc: this.getImageRequest(),
        imgSrc: this.getImgSrc(),
        type: this.getType(),
        DB: {},
        this: this
      }
    }
  },
  methods: {
    getType() {
      return localStorage.getItem("ThemeBackGround")
    },
    getImgSrc() {
      return localStorage.getItem("imgSrc")
    },
    putImageInDb(blob) {
      var transaction = this.mainBackground.DB.transaction(['VideoImages'], 'readwrite');
      var put = transaction.objectStore('VideoImages').put(blob, "default");
      // put.onsuccess = () => window.location.reload();
      put.onsuccess = () => alert("视频上传成功，刷新一下试试？");
    },
    getImageRequest() {
      var vsthis = this
      let indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB,
          dbVersion = 2
      let request = indexedDB.open('ImagesDB', dbVersion), DB
      request.onerror = function (e) {
        console.log(e.currentTarget.error.message)
      }
      request.onsuccess = function () {
        DB = request.result
        DB.onerror = function (e) {
          console.log(e.currentTarget.error.message)
        }
        let transaction = DB.transaction(['VideoImages'], 'readwrite')
        transaction.objectStore('VideoImages').get("default").onsuccess = (event) => {
          let blob = event.target.result
          if (blob) {
            vsthis.$data.mainBackground.videoSrc = window.URL.createObjectURL(blob)
          }
        }
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

    request.onsuccess = () => {
      DB = request.result
      DB.onerror = function (e) {
        console.log(e.currentTarget.error.message)
      }
      this.$data.mainBackground.DB = DB
    }
  },
  mounted() {
    this.$bus.$on("darkTheme", (value) => {
      this.darkTheme = value
    })
    this.$bus.$on("backGroundType", (value) => {
      this.mainBackground.type = value
    })
    this.$bus.$on("getBlob", (value) => {
      this.putImageInDb(value)
    })
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
  z-index: -1;
}

.mainbg {
  width: 100%;
  height: 100%;
  z-index: -3;
  -o-object-fit: cover;
  object-fit: cover;
  transition: opacity 1s, transform .25s, filter .25s
}

.isSolidColor {
  background-color: #FFFFFF;
}

</style>