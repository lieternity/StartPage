import VueRouter from 'vue-router'

import homePage from "@/pages/homePage";
import setPage from "@/pages/setPage";
import userSetting from "@/components/setting/userSetting";
import personaliseSetting from "@/components/setting/personaliseSetting";
import aboutSetting from "@/components/setting/aboutSetting";
import loginPage from "@/components/setting/loginPage";
import registerPage from "@/components/setting/registerPage"
import functionSetting from "@/components/setting/functionSetting";
import page404 from "@/pages/404"

const router = new VueRouter({
    mode: "history",
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
                        title: "设置-用户",
                        isAuth: true
                    },
                    beforeEnter: (to, from, next) => {
                        if (to.meta.isAuth === true) {
                            let userItemJson = JSON.parse(localStorage.getItem("user"));
                            try {
                                if (userItemJson.name && userItemJson.uid) {
                                    next()
                                } else {
                                    next("/setting/login")
                                }
                            } catch (e) {
                                next("/setting/login")
                            }
                        } else {
                            next()
                        }
                    }
                },
                {
                    path: "personalise",
                    component: personaliseSetting,
                    meta: {
                        title: "设置-个性化"
                    }
                },
                {
                    path: "about",
                    component: aboutSetting,
                    meta: {
                        title: "设置-关于"
                    }
                },
                {
                    path: "function",
                    component: functionSetting,
                    meta: {
                        title: "设置-功能"
                    }
                },
                {
                    path: "login",
                    component: loginPage,
                    meta: {
                        title: "包子起始页-登录"
                    }
                },
                {
                    path: "register",
                    component: registerPage,
                    meta: {
                        title: "包子起始页-注册"
                    }
                },
            ]
        },
        {
            path: '*',
            component:page404,
            meta: {
                title: "404-包子起始页"
            }

        },
    ]
})
router.beforeEach((to, from, next) => {
    if (to.fullPath === '/setting') {
        next("/setting/user")
    } else {
        next()
    }

})

router.afterEach((to) => {
    document.title = to.meta.title || '包子起始页'
})
export default router