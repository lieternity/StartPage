<template>
  <div class="functionRoot" style="height: 100%;width: 100%;padding: 20px">
    <h2>功能</h2>
    <div class="controlCard">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sey-talk-a"></use>
      </svg>
      <span>一言类型</span>
      <el-select v-model="hitokotoClass" class="hitokotoClass" placeholder="请选择">
        <el-option
            v-for="item in hitokotoClasss"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="controlCard">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-search"></use>
      </svg>
      <span>自定义搜索引擎</span>

      <el-autocomplete
          class="inline-input"
          v-model="searchClass"
          :fetch-suggestions="querySearch"
          placeholder="请输入搜索引擎URL"
      ></el-autocomplete>

    </div>
  </div>
</template>

<script>
export default {
  name: "functionSetting",
  data() {
    return {
      searchClass: this.getSearchClass(),
      restaurants: [],
      hitokotoClasss: [
        {
          value: "hitokoto",
          label: "一言"
        },
        {
          value: "poetry",
          label: "诗词"
        }
      ],
      hitokotoClass: this.getHitokotoClass()
    }
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadAll() {
      return [
        {"value": "https://www.sogou.com/web?query=", "name": "搜狗搜索"},
        {"value": "https://www.so.com/s?q=", "name": "360搜索"},
      ];
    },
    getHitokotoClass() {
      return localStorage.getItem("hitokotoClass")
    },
    getSearchClass() {
      return localStorage.getItem("diyAction")
    }
  },
  watch: {
    searchClass(newValue) {
      localStorage.setItem("diyAction", newValue)
    }
  },
  mounted() {
    this.restaurants = this.loadAll();
  }
}
</script>

<style scoped>
.controlCard {
  position: relative;
  width: 80%;
  height: 40px;
  font-weight: bold;
  line-height: 40px;
  padding: 12px 16px;
  border: #e5e7eb solid 1px;
  border-radius: 10px;
  margin-top: 30px;
}

.controlCard * {
  margin-left: 12px;
}

.hitokotoClass {
  position: absolute;
  right: 30px;
  height: 30px;
  text-align: center;
  outline: none;
  border-radius: 5px;
}

.inline-input {
  float: right;
  width: 400px;
}
</style>