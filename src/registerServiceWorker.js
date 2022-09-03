import {
    register
} from 'register-service-worker'
import {
    Message,
    MessageBox
} from 'element-ui'

if (process.env.NODE_ENV === 'production') {
    console.log(process.env.NODE_ENV)
    register(`${process.env.BASE_URL}service-worker.js`, {
        registered() {
            console.log('Service worker has been registered.')
        },
        cached() {
            console.log('Content has been cached for offline use.')
        },
        updatefound() {
            if (localStorage.getItem("firstTime") !== "true") {
                return
            } else {
                localStorage.setItem("firstTime", "true")
            }
            Message({
                message: '检测到新版本，正在下载',
                type: 'info'
            })
            console.log('New content is downloading.')
        },
        updated() {
            MessageBox({
                title: '更新',
                message: '新版本内容下载完成，点击确定按钮立即使用新版',
                confirmButtonText: '确定',
                showClose: false,
                showCancelButton: false,
                closeOnClickModal: false,
                closeOnPressEscape: false,
                type: 'success',
                callback() {
                    location.reload()
                }
            })
            console.log('New content is available; please refresh.')
        },
        offline() {
            console.log('No internet connection found. App is running in offline mode.')
        },
        error(error) {
            console.error('Error during service worker registration:', error)
        }
    })
}