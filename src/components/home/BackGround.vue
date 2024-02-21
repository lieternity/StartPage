<template>
  <div :class="{darkTheme:darkTheme,isSolidColor:mainBackground.type === 'solidColor',mainBackground:true}">
    <img class="mainbg"
         v-if="mainBackground.type === 'img' || mainBackground.type === 'localimg'"
         v-on:load="imageLoaded"
         v-bind:style="{ opacity: imageOpacity }"
         :src="mainBackground.type === 'img' ? mainBackground.imgSrc:mainBackground.localimgSrc"
         alt="backgroundPicture">
    <video class="mainbg" loop v-if="mainBackground.type === 'video'" :src="mainBackground.videoSrc" muted
           autoplay></video>
  </div>
</template>

<script>

import {
  MessageBox
} from 'element-ui'

export default {
  name: "backGround",
  data() {
    return {
      imageOpacity: 0,
      darkTheme: false,
      mainBackground: {
        localimgSrc: 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=',
        videoSrc: 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=',
        imgSrc: this.getImgSrc(),
        type: this.getType(),
        DB: {},
        this: this
      }
    }
  },
  methods: {
    imageLoaded() {
      this.imageOpacity = 1;
    },
    getImgFile() {
      this.$bus.$emit("loadpage", true)
      let vmthis = this
      let url = "https://gh.api.99988866.xyz/https://raw.githubusercontent.com/acodegod/pic-cdn/main/2022/ikun.mp4"
      console.log(url)
      var xhr = new XMLHttpRequest(),
          blob;

      xhr.open("GET", url, true);
      // Set the responseType to blob
      xhr.responseType = "blob";

      xhr.addEventListener("load", function () {
        if (xhr.status === 200) {
          blob = xhr.response;
          console.log(blob);
          vmthis.putImageInDb(blob)

        }
      }, false);
      xhr.send();
    },
    getType() {
      return localStorage.getItem("ThemeBackGround")
    },
    getImgSrc() {
      return localStorage.getItem("imgSrc")
    },
    putImageInDb(blob) {
      var transaction = this.mainBackground.DB.transaction(['VideoImages'], 'readwrite');
      var put;
      if (blob.type === "image/png" || blob.type === "image/jpeg" || blob.type === "image/gif") {
        put = transaction.objectStore('VideoImages').put(blob, "img");
      } else if (blob.type === "video/mp4") {
        // eslint-disable-next-line no-redeclare
        put = transaction.objectStore('VideoImages').put(blob, "default");
      } else {
        alert("错误文件")
      }

      // put.onsuccess = () => window.location.reload();
      put.onsuccess = () => {
        setTimeout(function () {
          window.location.reload()
        }, 1000)
      };
    },
    getImageRequest(value) {
      let getbloburlname = "default";
      if (value === "img") {
        // eslint-disable-next-line no-unused-vars
        getbloburlname = "img";
      }
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
        transaction.objectStore('VideoImages').get(getbloburlname).onsuccess = (event) => {
          let blob = event.target.result
          if (blob) {
            if (getbloburlname === "img") {
              vsthis.$data.mainBackground.localimgSrc = window.URL.createObjectURL(blob)
            } else if (getbloburlname === "default") {
              vsthis.$data.mainBackground.videoSrc = window.URL.createObjectURL(blob)
            }

          } else if (vsthis.mainBackground.type === 'video' && getbloburlname === "default") {
            MessageBox({
              title: '提示',
              message: '您还未上传视频，请上传视频',
              confirmButtonText: '确定',
              showClose: false,
              type: 'warning',
              callback() {
                // vsthis.getImgFile()
              }
            })
          }
        }
      }
    }
  },

  beforeMount() {
    this.getImageRequest("img");
    this.getImageRequest();
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
