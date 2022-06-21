<template>
  <div class="root">
    <div class="navigationBar">
      <btn-group/>
      <div class="navigationList">
        <router-link
            v-for="navigationbarlist in navigationbarlists"
            class="navigationbarlist"
            :key="navigationbarlist.name"
            :to="'/setting/' + navigationbarlist.path"
        >
          <div class="listOfNavigationButtons">
            {{ navigationbarlist.name }}
          </div>
        </router-link>
      </div>

    </div>
    <div class="settingmain">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import BtnGroup from "@/components/setting/btnGroup";

export default {
  name: "setPage",
  data() {
    return {
      navigationbarlists: [
        {
          name: "用户",
          path: "user"
        },
        {
          name: "个性化",
          path: "personalise"
        },
        {
          name: "功能",
          path: "function"
        },
        {
          name: "关于",
          path: "about"
        },
      ]
    }
  },
  components: {BtnGroup},

}
</script>

<style scoped>
.root {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
}

.navigationBar {
  overflow: hidden;
  height: 100%;
  width: 20%;
  border-right: #cbcbcc solid 1px;
}

.navigationList {
  display: flex;
  flex-direction: column !important;
  gap: 0.25rem !important;
}

.navigationbarlist {
  display: inline-block;
  margin-left: 18px;
  margin-right: 3px;
  line-height: 30px;
  height: 30px;
  width: 90%;
  text-decoration: none;
}

.navigationbarlist:hover {
  background-color: #eaeaea !important;
  border-radius: 5px;
}

.listOfNavigationButtons {
  color: rgb(31 41 55) !important;
  padding: 0 10px;
  font-size: 14px;
  font-weight: bold;
}

.router-link-active {
  background-color: #eaeaea !important;
  border-radius: 5px;
}

.settingmain {
  width: 100%;
  padding-left: 20px;
  /*background-color: skyblue;*/
}
</style>