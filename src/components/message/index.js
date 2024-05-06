import Message from './index.vue'
import Vue from 'vue'

export function message(type, text,durition=1500){
  // 创建构造器
  const constructor = Vue.extend({
    render(h){
      return h(Message,{props:{ type, text, durition}})
    }
  })
  // 创建 constructor 组件实例，并挂载。
  const vm = new constructor().$mount()
  // 把组件DOM添加到body中
  document.body.appendChild(vm.$el)
}
