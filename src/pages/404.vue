<template>
  <div id="svgContainer"></div>
</template>

<script>
export default {
  name: "page404-Vue",
  mounted() {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '/static/404.js';
    document.body.appendChild(script);
  },
}
</script>

<style scoped>
html {
  margin: 0;
  padding: 0;
  background-color: white;
}

body,
html {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#svgContainer {
  width: 100%;
  height: 512px;
  background-color: white;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
</style>