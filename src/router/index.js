import VueRouter from 'vue-router'

import homePage from "@/pages/homePage";
import setPage from "@/pages/setPage";

export default new VueRouter({
    routes: [
        {
            path: '/',
            component: homePage
        },
        {
            path: '/set',
            component: setPage
        }
    ]
})