import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/style.scss'
import router from './router'
import './assets/iconfont/iconfont.css'

createApp(App).use(router).mount('#app')
