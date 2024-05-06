<script>
import TodoList from "@/components/home/todolist/index.vue";
// import NotesBox from "@/components/home/notes/index.vue";

export default {
  name: "tabsWrapper",
  components: {
   /* NotesBox, */
    TodoList
  },
  data() {
    return {
      bgOpacity: 0,
      activeTab: 0,
      tabs: [
        {title: '待办', content: `<h1>123</h1>`},
        {title: '便签', content: `Content for Tab 2`},
        {title: '工具', content: `Content for Tab 2`},
        // 更多选项卡...
      ],
    };
  },
  mounted() {
    this.$bus.$on("openTabs", (value) => {
      if (value === true) {
        this.bgOpacity = 1;
      }
    })

  },
  methods: {
    closeOpacity(event) {
      if (event.target.classList.contains('frosted-glass-background')) {
        this.bgOpacity = 0;
        this.$bus.$emit("backgroundBecomesLarger", 1);
      }

    },
  }
}
</script>

<template>
  <div class="frosted-glass-background" @click="closeOpacity"
       :style="{opacity:bgOpacity,zIndex:bgOpacity === 0?'-10':'1000'}">
    <div class="tab_main_box">
      <div class="tabs">
        <div class="tab-list">
          <div
              v-for="(tab, index) in tabs"
              :key="index"
              @click="activeTab = index"
              :class="{ 'active': activeTab === index }"
          >
            {{ tab.title }}
          </div>
        </div>
        <div class="tabs-container">
          <transition-group name="slide-left" mode="out-in" tag="div">
            <div
                class="tab-content"
                v-if="activeTab === 0"
                :key="0"
            >
              <div class="todo_box">
                <todo-list/>
              </div>
            </div>
            <div
                class="tab-content"
                v-if="activeTab === 1"
                :key="1"
            >
              <div class="notes_box">
                还在开发中
<!--                <notes-box/>-->
              </div>
            </div>
            <div
                class="tab-content"
                v-if="activeTab === 2"
                :key="2"
            >
              <div>
                即将完善
              </div>
            </div>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.frosted-glass-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff30;
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  color: #ffffff;
  border-radius: 8px;
  transition: opacity .3s, transform .3s, margin-top .3s, height .3s;
}

.tab_main_box {
  position: absolute;
  width: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 64vh;
  max-width: 1200px;
  background-color: #00000030;
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  color: #ffffff;
  border-radius: 8px;
  transition: opacity .3s, transform .3s, margin-top .3s, height .3s;
  z-index: 2;
  overflow: hidden;
}

.tabs {
  display: flex;
  height: 100%;
  flex-direction: column;
}

.tab-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* 子元素平分父元素的宽度 */
  justify-items: center; /* 子元素在父元素内居中 */
}

.tab-list div {
  width: 100%;
  text-align: center; /* 子元素内的文本居中 */
  cursor: pointer;
  padding: 10px;
  /*transition: all 0.3s ease;*/
}

.tab-list div.active {
  color: #FFFFFF;
  border-bottom: 3px solid #FFFFFF;
}

.tab-content {
  z-index: 9999;
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none; /* IE and Edge */

}
.tab-content::-webkit-scrollbar {
  display: none; /* Chrome, Safari, and Opera */
}

.tabs-container {
  height: 100%;
  display: flex;
}

/* 定义过渡动画 */

/* 过渡动画 */
.slide-left-enter-active{
  animation: menuFadeOut 0.6s forwards;
  width: 100%;
}
.slide-left-leave-active{
  display: none;
}


div[mode='out-in']{
  width: 100%;
}
.todo_box{
  display: flex;
}
.notes_box{
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
