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
    <div class="controlCard">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-font-size"></use>
      </svg>
      <span>切换页面字体样式</span>
      <el-select v-model="fontFamily" placeholder="请选择">
        <el-option
            v-for="item in fontStyleList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>

      <div style="display: inline-block">
        <span class="demonstration">切换字体大小</span>
        <el-slider
            class="functionSlider"
            v-model="fontSize"
            :min="13"
            :max="25"
        >
        </el-slider>
      </div>
    </div>
    <div class="controlCard">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-jurassic_label"></use>
      </svg>
      <span>自定义快捷导航</span>
      <el-button style="float: right" @click="addLable">添加自定义网站</el-button>

    </div>
  </div>
</template>

<script>
import {nanoid} from 'nanoid'

export default {
  name: "functionSetting",
  data() {
    return {
      searchClass: this.getSearchClass(),
      restaurants: [],
      hitokotoClasss: [
        {
          value: "close",
          label: "关闭"
        },
        {
          value: "hitokoto",
          label: "一言"
        },
        {
          value: "poetry",
          label: "诗词"
        }
      ],
      fontSize: this.getFontSize(),
      fontFamily: this.getfontFamily(),
      fontStyleList: [
        {
          value: 'PingFang',
          label: '默认字体'
        }, {
          value: 'font_pr1',
          label: '楷体'
        }, {
          value: 'font_pr2',
          label: '玩艺记趣体'
        }, {
          value: 'font_pr3',
          label: '字体传奇南安体'
        }, {
          value: 'font_pr4',
          label: '摄图摩登小方体'
        }, {
          value: 'font_pr5',
          label: '杨任东竹石体'
        }, {
          value: 'font_pr6',
          label: '字制区喜脉体'
        }, {
          value: 'font_pr7',
          label: '江西拙楷'
        }, {
          value: 'font_pr8',
          label: '悠哉字体'
        }, {
          value: 'font_pr9',
          label: '沐瑶软笔手写体'
        }, {
          value: 'font_pr10',
          label: '字体视界法棍体'
        }, {
          value: 'font_pr11',
          label: 'Webmo'
        }, {
          value: 'font_pr12',
          label: '本墨悦亦'
        }, {
          value: 'font_pr13',
          label: '汉仪唐美人'
        }, {
          value: 'font_pr14',
          label: '汉仪魁肃'
        }, {
          value: 'font_pr15',
          label: '汉仪新蒂棉花糖体'
        }, {
          value: 'font_pr16',
          label: '走路带风小可爱'
        }, {
          value: 'font_pr17',
          label: '方正锐正圆'
        }, {
          value: 'font_pr18',
          label: '站酷快乐体'
        }, {
          value: 'font_pr19',
          label: '落日飞行体'
        }, {
          value: 'font_pr20',
          label: '汉仪细中圆'
        }
      ],
      hitokotoClass: this.getHitokotoClass()
    }
  },
  methods: {
    addLable() {
      this.$prompt('自定义网站  例：百度#https://baidu.com', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /.*?#http.*?/,
        inputErrorMessage: '格式不正确'
      }).then(({value}) => {
        let oldValue = localStorage.getItem("develop");
        let newValue = oldValue + JSON.stringify({
          id: nanoid(),
          name: value.split("#")[0],
          link: value.split("#")[1]
        }) + "#";
        localStorage.setItem("develop", newValue)
        this.$message({
          type: "success",
          message: "添加成功"
        })
      }).catch((err) => {
        console.error(err)
        this.$message({
          type: 'error',
          message: "添加出错！！！"
        });
      });
    },
    getfontFamily() {
      try {
        return (JSON.parse(localStorage.getItem("font_style"))).fontFamily
      } catch (e) {
        return ""
      }
    },
    getFontSize() {
      try {
        return (JSON.parse(localStorage.getItem("font_style"))).fontSize
      } catch (e) {
        return ""
      }
    },
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
    },
    fontSize(newValue) {
      this.$bus.$emit("giveFontSize", newValue)
    },
    fontFamily(newValue) {
      this.$bus.$emit("giveFontFamily", newValue)
    },
    hitokotoClass(newValue) {
      console.log(newValue)
      localStorage.setItem("hitokotoClass", newValue)
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

.functionSlider {
  width: 35%;
  display: inline-block;
  line-height: 40px;
  position: absolute;
}
</style>