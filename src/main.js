import Vue from 'vue'
import App from './App.vue'
import vueResource from "vue-resource"
import VueRouter from 'vue-router'
import router from './router'
import {Select, Option, Collapse, collapseItem,Button,Input,Switch,Popover} from 'element-ui';
import './registerServiceWorker'

Vue.use(Select);
Vue.use(Option);
Vue.use(Collapse);
Vue.use(Switch);
Vue.use(Button);
Vue.use(Input);
Vue.use(Popover);
Vue.use(collapseItem);

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
