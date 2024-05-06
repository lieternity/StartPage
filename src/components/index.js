import {message} from './message/index.js'
export default {
    install(Vue){
        Vue.prototype.$msg = message
    }
}
