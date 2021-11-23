import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import 'element-plus/lib/theme-chalk/el-button.css'
import { components } from "./plugins/element";


const app = createApp(App).use(router)
app.component(ElContainer.name, ElContainer)

app.mount('#app')
