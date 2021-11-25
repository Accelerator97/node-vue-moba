import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import http from './http'
import {ElMessage,ElMessageBox} from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import {Rate} from 'ant-design-vue'

const app = createApp(App).use(router)

app.config.globalProperties.$http = http;
app.config.globalProperties.$message = ElMessage;
app.config.globalProperties.$confirm = ElMessageBox.confirm;
app.use(Rate).mount('#app')
