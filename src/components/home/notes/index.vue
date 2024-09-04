<script>
import {v4 as uuidv4} from 'uuid';
import {formatTime} from "@/utils/dateUtils";

export default {
  name: "NotesBox",
  data() {
    return {
      activenote: 0,
      notes: []
    };
  }, watch: {
    // 监听note数组的变化
    notes: {
      handler(newVal) {
        // 当notes数组变化时，将其保存到localStorage
        localStorage.setItem('notes', JSON.stringify(newVal));
        this.$bus.$emit("changeNote");

      },
      deep: true // 深度监听，因为我们要监听数组内部对象的变化
    },
  },
  created() {

    // 在组件创建时从localStorage恢复数据
    let SavedNote = localStorage.getItem('notes');
    if (SavedNote) {
      try {
        SavedNote = JSON.parse(SavedNote);
        this.notes = SavedNote;
      } catch (error) {
        console.error('Error parsing saved note:', error);
      }
      if (SavedNote.length === 0) {
        this.notes = [{
          n_id: "0",
          title: '默认便签',
          content: '这是默认便签，一个说明书签，当你新建一个你自己的便签后就会被删除\n固定需要刷新才会生效\n=======👇特殊用法👇=======\nJOKER出生[toTime 2002-10-1]了\n' +
              'JOKER下个生日[toTime 2024-10-1]\n' +
              '下一个元旦节[toTime 1-1]',
          time: new Date().getTime() / 1000,
          isFixed: false
        }]
      }
    } else {
      this.notes = [{
        n_id: "0",
        title: '默认便签',
        content: '这是默认便签，一个说明书签，当你新建一个你自己的便签后就会被删除\n固定需要刷新才会生效\n=======👇特殊用法👇=======\nJOKER出生[toTime 2002-10-1]了\n' +
            'JOKER下个生日[toTime 2024-10-1]\n' +
            '下一个元旦节[toTime 1-1]',
        time: new Date().getTime() / 1000,
        isFixed: false
      }]
    }

  },
  computed: {
    filterednotes() {
      // 如果 notes 长度超过 2，跳过 n_id 为 0 的 note
      if (this.notes.length > 1) {
        return this.notes.filter(note => note.n_id !== "0");
      } else {
        return this.notes;
      }
    },
    selectednoteContent: {
      get() {
        if (this.notes[0].n_id === "0" && this.notes.length > 1) {
          return this.notes[this.activenote + 1].content;
        } else {
          return this.notes[this.activenote].content;
        }

      },
      set(value) {
        if (this.notes[0].n_id === "0" && this.notes.length > 1) {
          this.notes[this.activenote + 1].content = value;
        } else {
          this.notes[this.activenote].content = value;
        }

      }
    }
  },
  methods: {
    formatTime,
    selectnote(index) {
      if (this.notes.length > index) {
        this.activenote = index;
      } else {
        this.activenote = 0;
      }
    },
    delNote(id) {
      if (id === "0") {
        this.$msg('success', '默认便签无法删除，新建一个自己的就会自动消失', 1000);
        return;
      }
      this.notes = this.notes.filter(note => note.n_id !== id);
      this.activenote = 0
      this.$msg('success', '删除成功', 1000)
    },
    addNote() {
      this.notes.push({
        n_id: uuidv4(),
        title: 'new note',
        content: '',
        time: new Date().getTime() / 1000,
        isFixed: false
      })
      this.selectnote(this.filterednotes.length - 1)
    },
    formatContent(content) {
      return content.replace(/\n/g, '<br>');
    }
  }
};
</script>

<template>
  <div class="note-container">
    <span class="add_note" @click="addNote">
      <svg font-size="20px" aria-hidden="true" class="icon material-icons">
        <use xlink:href="#icon-add"></use>
      </svg>
      <span style="line-height: 10px">新便签</span>
    </span>
    <ul class="notes">
      <li
          v-for="(note, index) in filterednotes"
          :key="note.n_id"
          @click="selectnote(index)"
          :class="{ active: activenote === index }"
          class="note"
      >
        <input class="note_text_title" :aria-label="note.n_id" type="text" name="note_title" autocomplete="off"
               v-model="note.title">
        <span class="note_text_time">{{ formatTime(note.time) }}</span>
        <span @click.prevent="delNote(note.n_id)" class="note_icon notes-del" title="删除">
          <svg aria-hidden="true" class="icon material-icons">
            <use xlink:href="#icon-delete"></use>
          </svg>
          </span>
        <span v-if="note.n_id !==0" @click="note.isFixed = !note.isFixed" class="note_icon note-fixed" title="固定">
          <svg aria-hidden="true" class="icon material-icons">
            <use :xlink:href="note.isFixed ? '#icon-unfixed':'#icon-tudingyangshi2'"></use>
          </svg>
        </span>
      </li>
    </ul>
    <div class="content">
      <textarea v-model="selectednoteContent" class="note-content"></textarea>
    </div>
  </div>
</template>

<style scoped>
.note-container {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
}

.notes {
  padding-left: 0;
  width: 200px;
  height: calc(100% - 50px);
  overflow-y: scroll;
}

.notes::-webkit-scrollbar {
  width: 0; /* Safari and Chrome */
  height: 0;
}

.note {
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid rgba(204, 204, 204, 0.1);
  border-top: 1px solid rgba(204, 204, 204, 0.1);
  list-style: none;
  position: relative;

}

.note_text_title {
  background-color: transparent;
  color: #FFFFFF;
  display: block;
  max-width: 100px;
  width: 100%;
  line-height: 18px;
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
}

.note_text_time {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}

.notes-del {
  font-size: 18px;
}

.note_icon {
  position: absolute;
  right: 10px;
  top: 5px;
  transform: scale(0);
  transition: .2s ease-out;
}


.note.active {
  background-color: rgba(255, 255, 255, .5) !important;
  color: #FFFFFF !important;
  border-left: rgba(0, 0, 0, .5) 6px solid !important;
  box-shadow: #0000004d 0 4px 24px -12px;

}

.note:hover {
  background-color: rgba(255, 255, 255, .1);
  border-color: transparent;
  transform: scale(1);
}

.note:hover .note_icon {
  transform: scale(1);
}

.note-fixed {
  top: 29px;
}

.content {
  flex-grow: 1;
  flex-basis: auto;
  overflow: auto;
  padding: 10px;
  /*  height: 100%;*/
  width: 100%;
}

.note-content {
  width: 100%;
  height: calc(100% - 24px);
  resize: vertical;
  outline: none;
  border: none;
  margin: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: none;
  background-color: transparent;
  font-size: inherit;
  color: #FFFFFF;
  padding: 5px 11px;
  position: relative;
  box-sizing: border-box;
}

/* 自定义滚动条样式 */
textarea::-webkit-scrollbar {
  display: none;
}

textarea::-webkit-scrollbar-track {
  display: none;
}

textarea::-webkit-scrollbar-thumb {
  display: none;
}

.add_note {
  position: fixed;
  /* left: 10px;*/
  bottom: 0;
  color: #FFFFFF;
  font-size: 16px;
  z-index: 99999999;
  background-color: #00000012;
  padding: 8px 0;
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  width: 200px;

}

.add_note svg {
  padding-left: 50px;
}


</style>
