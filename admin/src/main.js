import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import http from './http'


const app = createApp(App).use(router)

app.config.globalProperties.$http = http;

app.mount('#app')
