<template>
  <div @click.prevent.stop="closeSomeThing" :class="{gradient:gradient}" class="homePage">
    <BackGround/>
    <time-box/>
    <search-box/>
    <search-menu/>
    <search-list/>
    <button-list/>
    <hitokoto-page/>
    <app-list/>
  </div>
</template>

<script>
import BackGround from "@/components/home/BackGround";
import TimeBox from "@/components/home/timeBox";
import SearchBox from "@/components/home/searchBox";
import SearchList from "@/components/home/searchList";
import SearchMenu from "@/components/home/searchMenu";
import buttonList from "@/components/home/buttonList";
import HitokotoPage from "@/components/home/hitokotoPage";
import AppList from "@/components/home/AppList";

export default {
  name: "homePage",
  data() {
    return {
      gradient: this.getGradient()
    }
  },
  methods: {
    getGradient() {
      return localStorage.getItem("gradient") === "true"
    },
    closeSomeThing(){
      this.$bus.$emit("changeAppListShow",false)
      this.$bus.$emit("changeUserMenu",false)
    }
  },
  components: {
    AppList,
    HitokotoPage,
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

.gradient {
  //background-image: radial-gradient(transparent 0, rgba(0, 0, 0, .5) 100%), radial-gradient(transparent 33%, rgba(0, 0, 0, .3) 166%);
  background-image: radial-gradient(rgba(0,0,0,0) 0,rgba(0,0,0,.5) 100%),radial-gradient(rgba(0,0,0,0) 33%,rgba(0,0,0,.3) 166%);
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

@keyframes menuFadeOut {
  from {
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
  }

  50% {
    -webkit-transform: scale(1.03);
    transform: scale(1.03);
  }

  to {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

</style>
