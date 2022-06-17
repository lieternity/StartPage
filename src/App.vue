<template>
  <div class="mian">
    <BackGround/>
    <time-box class="timebox"/>
    <search-box/>
  </div>
</template>

<script>
import BackGround from "@/components/BackGround";
import TimeBox from "@/components/timeBox";
import SearchBox from "@/components/searchBox";

export default {
  name: "App",
  components: {
    SearchBox,
    TimeBox,
    BackGround
  }

}
</script>

<style>
html{
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
.mian{
  height: 100%;
}
</style>