<template>
  <div id="form">
    <input @keydown.enter="startSearch" v-model="searchValue" type="text" aria-autocomplete="none" autocomplete="off">
    <div class="iconbox" id="searchBtnList">
      <svg class="icon iconsvg" aria-hidden="true">
        <use :xlink:href="iconList"></use>
      </svg>
    </div>
    <div @click="startSearch" class="iconbox" id="searchBtn">
      <svg class="icon iconsvg" aria-hidden="true">
        <use xlink:href="#icon-search"></use>
      </svg>
    </div>

  </div>
</template>

<script>
export default {
  name: "searchBox",
  data() {
    return {
      searchValue: "",
      iconList:"#icon-github",
      searchDefault: {
        type: "baidu",
        action: "https://www.baidu.com/s",
        name: "wd"
      },
      search: [
        {
          type: "baidu",
          action: "https://www.baidu.com/s",
          name: "wd"
        },
        {
          type: "bing",
          action: "https://cn.bing.com/search",
          name: "q"
        },
        {
          type: "google",
          action: "https://www.google.com/search",
          name: "q"
        },
        {
          type: "github",
          action: "https://github.com/search",
          name: "q"
        },

      ]
    }
  },
  methods: {
    startSearch() {
      window.open(this.searchDefault.action + "?" + this.searchDefault.name + "=" + this.searchValue)
    }
  }
}
</script>

<style scoped>
#form {
  width: 550px;
  height: 40px;
  display: flex;
  justify-content: center;
  position: relative;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
}

input[type=text]:focus {
  outline: none;
}

input[type=text] {
  padding: 0 30px;
  border: none;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  text-align: center;
}

.iconbox {
  width: 28px;
  height: 28px;
  border: none;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  margin: 1px 0;
  justify-content: center;
  border-radius: 30px;
  line-height: 35px;
}

.iconbox:hover {

  background-color: rgba(0, 0, 0, 0.1);
}

.iconsvg {
  font-size: 18px;
}

#searchBtn {
  right: 5px;
}

#searchBtnList {
  left: 5px;
  color: rgba(0, 0, 0, .5);
}

</style>