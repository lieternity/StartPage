import Vue from 'vue'
import App from './App.vue'
import vueResource from "vue-resource"
import VueRouter from 'vue-router'
import router from './router'
import axios from 'axios'
import './registerServiceWorker'
import {
    Select,
    Option,
    Collapse,
    Col,
    collapseItem,
    Button,
    Input,
    Switch,
    Popover,
    Card,
    Avatar,
    FormItem,
    Form,
    Upload,
    Timeline,
    TimelineItem,
    Dialog,
    Autocomplete,
    Backtop,
    Divider
} from 'element-ui';

Vue.use(Card)
Vue.use(Divider)
Vue.use(Backtop)
Vue.use(Col)
Vue.use(Upload)
Vue.use(Timeline)
Vue.use(Dialog)
Vue.use(TimelineItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Avatar)
Vue.use(Select);
Vue.use(Option);
Vue.use(Collapse);
Vue.use(Switch);
Vue.use(Button);
Vue.use(Input);
Vue.use(Popover);
Vue.use(collapseItem);
Vue.use(Autocomplete)
Vue.use(VueRouter)
Vue.use(vueResource)

Vue.config.productionTip = false

new Vue({
    el: '#app',
    render: h => h(App),
    router: router,
    beforeCreate() {
        Vue.prototype.$bus = this;
        Vue.prototype.$axios = axios;

    }
})
