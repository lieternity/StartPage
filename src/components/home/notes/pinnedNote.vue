<script>
import {formatTime} from "@/utils/dateUtils";

export default {
  name: "fixedNote",
  data() {
    return {
      notes: []
    }
  }, methods: {
    formatTime,
    closefixed(event) {
      console.log(event)
      this.notes = this.notes.map(item => {
        if (item.n_id === event) {
          // 修改 isfixed 的值
          return {...item, isFixed: false};
        }
        // 如果不是我们要找的项，直接返回原对象
        return item;
      });
    }
  },
  created() {
    let SavedNote = localStorage.getItem('notes');
    if (SavedNote) {
      try {
        SavedNote = JSON.parse(SavedNote);
        this.notes = SavedNote;
      } catch (error) {
        console.error('Error parsing saved note:', error);
      }

    }
    console.log(this.notes)
  },
  computed: {
    filteredItems() {
      return this.notes.filter(item => item.isFixed);
    }
  }, watch: {
    // 监听note数组的变化
    notes: {
      handler(newVal) {
        // 当notes数组变化时，将其保存到localStorage
        localStorage.setItem('notes', JSON.stringify(newVal));
      },
      deep: true // 深度监听，因为我们要监听数组内部对象的变化
    },
  },
}
</script>

<template>
  <div class="fixedNoteContainer">
    <div v-for="item in filteredItems" class="fixedNote"
         style="opacity: 0.8;"
         :key="item.n_id"
         :title="item.title">
      <div class="fixedNoteContent" v-html="item.content.replace(/\n/g, '<br/>')">
      </div>
      <div class="fixedNoteTime">{{ formatTime(item.time) }}</div>
      <div class="close" @click="closefixed(item.n_id)" title="取消固定" style="opacity: 0;">
        <svg aria-hidden="true" class="icon material-icons">
          <use xlink:href="#icon-close"></use>
        </svg>
      </div>
    </div>
  </div>

</template>

<style scoped>


.fixedNoteContainer {
  /*  display: none;*/
  position: absolute;
  top: 20px;
  left: 40px;
  max-height: calc(100vh - 60px);
  perspective-origin: 145px 68px;
  perspective: 500px;
  overflow-y: auto;
  transition: .25s;
}

.fixedNoteContainer::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, .15) !important;
  border-radius: 10px !important;
  -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255, .30) !important;
}

.fixedNoteContainer::-webkit-scrollbar {
  width: 6px;
}

.fixedNoteContainer::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, .30) !important;
}

.fixedNote {
  position: relative;
  opacity: 0;
  margin-bottom: 10px;
  width: 250px;
  padding: 10px 10px 10px 20px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, .8);
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, .05) 0 10px 20px;
  transition: .25s;
  cursor: pointer;
}

.fixedNoteContent {
  display: inline-block;
  width: 200px;
  max-height: unset;
  white-space: unset;
  text-overflow: unset;
  overflow: hidden;
  color: black;
  font-size: small;
}

.fixedNoteTime {
  color: rgba(0, 0, 0, .35);
  font-size: 12px;
}

.fixedNote:hover {
  opacity: 1 !important;
}

.fixedNote:hover .close {
  opacity: 1 !important;
}

.close {
  transition: opacity 0.1s;
  position: absolute;
  top: 10px;
  right: 16px;
  width: 16px;
  height: 16px;
}
</style>
