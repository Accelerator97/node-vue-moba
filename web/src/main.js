import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/style.scss'
import router from './router'
import './assets/iconfont/iconfont.css'
import axios from 'axios'
const http = axios.create({
    baseURL:"http://localhost:3000/web/api"
})
const app = createApp(App)
app.config.globalProperties.$http = http;
app.use(router).mount('#app')
