<template>
  <div class="homePage">
    <BackGround/>
    <time-box/>
    <search-box/>
    <search-menu/>
    <search-list/>
    <button-list/>
  </div>
</template>

<script>
import BackGround from "@/components/home/BackGround";
import TimeBox from "@/components/home/timeBox";
import SearchBox from "@/components/home/searchBox";
import SearchList from "@/components/home/searchList";
import SearchMenu from "@/components/home/searchMenu";
import buttonList from "@/components/home/buttonList";

export default {
  name: "homePage",
  components: {
    SearchMenu,
    SearchList,
    SearchBox,
    TimeBox,
    BackGround,
    buttonList
  }

}
</script>

<style>

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.homePage, .body {
  height: 100%;
}

@keyframes searchFadeOut {
  from {
    opacity: 0.8;
  }

  50% {
    opacity: 0.9;
  }

  to {
    opacity: 1;
  }
}

</style>