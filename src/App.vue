<template>
  <div style="height: 100%">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: "App",
}
</script>

<style>
html {
  width: 100%;
  height: 100%;
}

body {
  max-width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  font-family: microsoft yahei light, microsoft yahei, pingfang sc, Helvetica, sans-serif, 等线;
  background-color: #333;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

</style>