<script>
export default {
  name: "TodoList",
  data() {
    return {
      newitem: '',
      sortByStatus: true,
      todo: [
        {id: 1, label: "这是默认的Todo", done: false, del: false},
        {id: 2, label: "嘿嘿", done: true, del: false},
        {id: 3, label: "kiss kiss", done: false, del: false}
      ]
    }
  },
  methods: {
    addItem() {
      if (this.newitem === "") {
        this.$msg('warn', '此处无声胜有声？', 1000)

        return;
      }
      this.todo.push({id: Math.floor(Math.random() * 9999) + 10, label: this.newitem, done: false, del: false});
      this.newitem = '';
    },
    markAsDoneOrUndone: function (item) {
      item.done = !item.done
    },
    deleteItemFromList: function (item) {
      item.del = true;
      // 使用 setTimeout 在 0.3 秒后执行删除操作
      setTimeout(() => {
        let index = this.todo.indexOf(item);
        if (index !== -1) { // 确保 item 存在于数组中
          this.todo.splice(index, 1);
        }
      }, 200); // 300 毫秒等于 0.3 秒
    },
  },
  computed: {
    todoByStatus: function () {

      if (!this.sortByStatus) {
        return this.todo;
      }

      let sortedArray;
      let doneArray = this.todo.filter(function (item) {
        return item.done;
      });
      let notDoneArray = this.todo.filter(function (item) {
        return !item.done;
      });

      sortedArray = [...notDoneArray, ...doneArray];
      return sortedArray;
    }
  },
  watch: {
    // 监听todo数组的变化
    todo: {
      handler(newVal) {
        // 当todo数组变化时，将其保存到localStorage
        localStorage.setItem('todo', JSON.stringify(newVal));
      },
      deep: true // 深度监听，因为我们要监听数组内部对象的变化
    }
  },
  created() {
    // 在组件创建时从localStorage恢复数据
    const savedTodo = localStorage.getItem('todo');
    if (savedTodo) {
      try {
        this.todo = JSON.parse(savedTodo);
      } catch (error) {
        console.error('Error parsing saved todo:', error);
      }
    }
  },
}
</script>

<template>
  <div id="todolist">
    <div class="todolist-box" v-if="todo.length">
      <transition-group name="todolist" tag="ul">
        <li v-for="item in todoByStatus" v-bind:class="{done:item.done,'todolist-del':item.del}"
            v-bind:key="item.id">
          <span class="label" :aria-label="item.label" :title="item.label">{{ item.label }}</span>
          <div class="actions">
            <button class="btn-picto" type="button" v-on:click="markAsDoneOrUndone(item)"
                    v-bind:aria-label="item.done ? '未完成' : '完成'" v-bind:title="item.done ? '未完成' : '完成'">
              <svg class="icon material-icons" aria-hidden="true">
                <use v-bind:xlink:href="item.done ? '#icon-checkboxoutline' : '#icon-checkboxoutlineblank'"></use>
              </svg>
            </button>
            <button class="btn-picto" type="button" v-on:click="deleteItemFromList(item)" aria-label="删除"
                    title="删除">
              <svg class="icon material-icons" aria-hidden="true">
                <use xlink:href="#icon-delete"></use>
              </svg>
            </button>
          </div>
        </li>
      </transition-group>
    </div>
    <p v-else class="emptylist todolist-box">你的任务都已经完成了</p>

    <div class="todoform">
      <form name="newform">
        <label for="newitem">添加到待办事项列表</label>
        <input type="text" name="newitem" id="newitem" v-model="newitem">
        <button @click="addItem" type="submit">Add</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
@keyframes strikeitem {
  to {
    width: calc(100% + 1rem);
  }
}
@keyframes strikeitemend {
  to {
    width: 0;
  }
}
.todolist-del {
  transform: scale(0);
  /* 为了平滑过渡，可以添加 transition 属性 */
  transition: transform 0.3s ease;
}

#todolist {
  display: flex;
  color: #FFF;
  justify-content: space-evenly;
  flex-grow: 1;
}

.todolist-box {
  margin-bottom: 50px;
  width: 40%;
}

.todoform {
  width: 40%;
}

#todolist h1 {
  /*text-align:center;*/
  font-weight: normal;
  font-size: 2.6rem;
  letter-spacing: 0.05em;
  border-bottom: 1px solid rgba(255, 255, 255, .3);
}

#todolist h1 span {
  display: block;
  font-size: 0.8rem;
  margin-bottom: 0.7rem;
  margin-left: 3px;
  margin-top: 0.2rem;
}

#todolist .emptylist {
  margin-top: 2.6rem;
  text-align: center;
  letter-spacing: .05em;
  font-style: italic;
  opacity: 0.8;

}

#todolist ul {
  list-style: none;
  width: 75%;
}

#todolist, .todolist-move {
  transition: transform 0.5s;
}

#todolist li {
  display: flex;
  margin: 0 -3rem 4px;
  padding: 1.1rem 3rem;
  justify-content: space-between;
  align-items: center;
  background: #00000030;
  border-radius: 6px;

}

#todolist .actions {
  flex-shrink: 0;
  padding-left: 0.7em;
}

#todolist .label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
  transition: opacity .2s linear;
}

#todolist .done .label {
  opacity: .6;
}

#todolist .done .label:before {
  content: '';
  position: absolute;
  top: 50%;
  left: -.5rem;
  display: block;
  width: 0;
  height: 2px;
  background: #FFFFFF;
  animation: strikeitem .3s ease-out 0s forwards;
}
#todolist .label:before {
  content: '';
  position: absolute;
  top: 50%;
  left: -.5rem;
  display: block;
  width: calc(100% + 1rem);
  height: 2px;
  background: #FFFFFF;
  animation: strikeitemend .3s ease-out 0s forwards;
}
#todolist .btn-picto {
  border: none;
  background: none;
  -webkit-appearance: none;
  cursor: pointer;
  color: #FFF;
}


/* FORM */
form {
  margin-top: 3rem;
  display: flex;
  flex-wrap: wrap;
  position: fixed;
}

form label {
  display: block;
  min-width: 100%;
  margin-bottom: .5rem;
  font-size: 1.3rem;
}

form input {
  flex-grow: 1;
  border: none;
  background: #f7f1f1;
  padding: 0 1.5em;
  font-size: initial;
  border-radius: 6px;
}

form button {
  padding: 0 1.3rem;
  border: none;
  background: #00000030;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  border-radius: 6px;
  margin-left: 5px;
  cursor: pointer;
  transition: background .2s ease-out;
}

form button:hover {
  background: #00000060;
}

form input,
form button {
  font-family: 'Quicksand', sans-serif;
  height: 3rem;
}

.material-icons {
  font-size: 24px;
}
</style>
