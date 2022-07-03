<template>
  <div id="form">
    <input @click="changeSearchMenuShow(false)"
           @keydown.enter="startSearch"
           v-model="searchValue" type="text" aria-autocomplete="none" autocomplete="off">
    <div @click="changeSearchMenuShow" class="iconbox" id="searchBtnList">
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
      timer: "",
      searchDefault: {
        type: "baidu",
        action: "https://www.baidu.com/s",
        name: "wd"
      },

    }
  },
  computed: {
    iconList() {
      return "#icon-" + this.searchDefault.type
    }
  },
  watch:{
    searchValue(){
      this.giveSearchListValue(this.searchValue)
    }
  },
  methods: {
    startSearch() {
      top.location.href = this.searchDefault.action + "?" + this.searchDefault.name + "=" + this.searchValue
    },
    changeSearchMenuShow(value = "") {
      this.$bus.$emit("searchMenuShowStatus", value)
    },
    giveSearchListValue(value) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.$bus.$emit("getCandidates", value)
      }, 100);


    }
  },
  beforeMount() {
    if (!localStorage.getItem("searchBtn")) {
      localStorage.setItem("searchBtn", JSON.stringify(this.searchDefault))
    } else {
      let item = localStorage.getItem("searchBtn");
      try {
        this.searchDefault = JSON.parse(item)
      } catch (e) {
        localStorage.removeItem("searchBtn");
        window.location.reload();
      }
    }
  },
  mounted() {
    this.$bus.$on("changeSearchDefault", () => {
      let item = localStorage.getItem("searchBtn");
      try {
        this.searchDefault = JSON.parse(item)
      } catch (e) {
        localStorage.removeItem("searchBtn");
        window.location.reload();
      }
    })
    this.$bus.$on("startSearch", (value) => {
      top.location.href = this.searchDefault.action + "?" + this.searchDefault.name + "=" + value
    })
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
  opacity: 0.8;

}

#form:hover {
  animation: searchFadeOut 0.2s forwards;
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
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
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