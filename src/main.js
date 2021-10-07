import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App);

// 引入axios
import axios from 'axios'
app.config.globalProperties.$axios = axios; //把axios挂载到全局

// 引入qs
import qs from 'qs'
app.config.globalProperties.$qs = qs; //把qs挂载到全局


// 定义一个过滤方法(改变图片的宽高)
app.config.globalProperties.$filters = {
    setWH(url, arg) {
        return url.replace(/w\.h/, arg);
    }
}

// 引入element-plus
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
app.use(ElementPlus);



import scroller from '@/components/scroller';
app.component('scroller', scroller); //全局注册scroller组件

import loading from '@/components/loading';
app.component('loading', loading); //全局注册loading组件


app.use(store).use(router).mount('#app')