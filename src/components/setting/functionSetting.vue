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
  </div>
</template>

<script>
export default {
  name: "functionSetting",
  data() {
    return {
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
      hitokotoClass:this.getHitokotoClass()
    }
  },
  methods:{
    getHitokotoClass(){
      return localStorage.getItem("hitokotoClass")
    }
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
</style>