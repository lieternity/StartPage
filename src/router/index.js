import VueRouter from 'vue-router'

import homePage from "@/pages/homePage";
import setPage from "@/pages/setPage";
import userSetting from "@/components/setting/userSetting";
import personaliseSetting from "@/components/setting/personaliseSetting";

const router = new VueRouter({
    mode:"history",
    routes: [
        {
            path: '/',
            component: homePage,
            meta: {
                title: "包子起始页"
            }
        },
        {
            path: '/setting',
            component: setPage,
            children: [
                {
                    path: "user",
                    component: userSetting,
                    meta: {
                        title: "设置-用户"
                    }
                },
                {
                    path: "personalise",
                    component: personaliseSetting,
                    meta: {
                        title: "设置-个性化"
                    }
                },
            ]
        }
    ]
})
router.beforeEach((to, from, next)=>{
    if (to.fullPath === '/setting'){
        router.push("/setting/user").catch(err => err)
        console.log(123)
    }
    next()
})

router.afterEach((to) => {
    document.title = to.meta.title || '包子起始页'
})
export default router