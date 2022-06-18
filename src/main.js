import Vue from 'vue'
import App from './App.vue'
import vueResource from "vue-resource"
import VueRouter from 'vue-router'
import router from './router'

Vue.use(VueRouter)
Vue.use(vueResource)

Vue.config.productionTip = false

new Vue({
    el: '#app',
    render: h => h(App),
    router: router,
    beforeCreate() {
        Vue.prototype.$bus = this;
    }
})
