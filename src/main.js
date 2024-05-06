import Vue from 'vue'
import App from './App.vue'
import vueResource from "vue-resource"
import VueRouter from 'vue-router'
import router from './router'
import axios from 'axios'
import './registerServiceWorker'
import './elementui'
import myPlugin  from './components/index';
Vue.use(myPlugin)
Vue.use(VueRouter)
Vue.use(vueResource)


Vue.config.productionTip = false

new Vue({
    el: '#app', render: h => h(App),
    router: router,
    beforeCreate() {
        Vue.prototype.$bus = this;
        Vue.prototype.$axios = axios;
    }
})
