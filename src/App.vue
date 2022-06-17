<template>
  <div class="mainBackground">
    <img v-if="mainBackground.type === 'img'" :src="mainBackground.imgSrc" alt="backgroundPicture">
    <video v-else :src="mainBackground.videoSrc" muted autoplay></video>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      mainBackground: {
        videoSrc: "",
        imgSrc: "./assets/img/bg1.jpg",
        type:"img"
      }
    }
  },
  beforeMount() {

  }
}
</script>

<style scoped>

</style>