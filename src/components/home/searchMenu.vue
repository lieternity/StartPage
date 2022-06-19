<template>
  <div v-if="searchMenuShow" class="searchMenuBox">
    <div :class="{searchMenuShow:searchMenuShow,searchMenu:true}">
      <div class="searchMenuBoxList">
        <ul>
          <li v-show="search.action" @click="changeSearchBtn(search.type)" v-for="search in searchs" :key="search.type">
            {{ search.sname }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchMenu",
  data() {
    return {
      searchMenuShow: false,
      searchs: [
        {
          sname: "百度",
          type: "baidu",
          action: "https://www.baidu.com/s",
          name: "wd"
        },
        {
          sname: "必应",
          type: "bing",
          action: "https://cn.bing.com/search",
          name: "q"
        },
        {
          sname: "谷歌",
          type: "google",
          action: "https://www.google.com/search",
          name: "q"
        },
        {
          sname: "Github",
          type: "github-fill",
          action: "https://github.com/search",
          name: "q"
        },
        {
          sname: "自定义",
          type: "ditu_diqiu_o",
          action: this.getDiyAction().action,
          name: this.getDiyAction().name
        },


      ]
    }
  },
  methods: {
    getDiyAction() {
      let diyAction = localStorage.getItem("getdiyaction");
      if (/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&amp;:/~+#]*[\w\-@?^=%&amp;/~+#])?/.test(diyAction)) {
        let diyActionArray = /(.*?)\?(.*?)=/.exec(diyAction);
        return {
          action: diyActionArray[1],
          name: diyActionArray[2]
        }
      } else {
        return {
          name: "",
          action: ""
        }
      }

    },
    changeSearchBtn(value) {
      this.searchMenuShow = !this.searchMenuShow
      for (const valueKey of this.searchs) {
        if (value === valueKey.type) {
          localStorage.setItem("searchBtn", JSON.stringify(valueKey));
          this.$bus.$emit("changeSearchDefault")
          return;
        }
      }
    }
  }
  ,
  mounted() {
    this.$bus.$on("searchMenuShowStatus", (value) => {
      if (value === false) {
        this.searchMenuShow = value
      } else {
        this.searchMenuShow = !this.searchMenuShow;
      }
    })
  }
}
</script>

<style scoped>
.searchMenuBox {
  position: absolute;
  width: 550px;
  height: 60px;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0.8;
  z-index: 2;
}

.searchMenuBox:hover {
  animation: searchFadeOut 0.2s forwards;
}

.searchMenuBoxList {
  width: 100%;
  height: 50%;
}

.searchMenu {
  width: 100%;
  height: 100%;
  opacity: 0;
  display: none;
  align-content: center;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.searchMenuShow {
  opacity: 1 !important;
  display: inline-flex;
  animation: menuFadeOut 0.3s linear;
  flex-wrap: wrap;


}

ul {
  list-style: none;
  display: flex;
  width: 100%;
  margin: 0;
  padding: 0;
  line-height: 30px;
  align-content: center;
  text-align: center;
}

li {
  float: left;
  cursor: default;
  border-radius: 50%;
  display: inline-block;
  width: 100%;
}

li:hover {
  animation: menuFadein 0.3s linear;
}
@keyframes menuFadein {
  from {
    -webkit-transform: scale(0.8);
    transform: scale(0.8);
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