import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import './style.css'
import router from './routes'
import store from './store'

import App from './App.vue'

createApp(App)
    .use(store)
    .use(router)
    .use(ElementPlus, { locale: zhCn })
    .mount('#app')
  