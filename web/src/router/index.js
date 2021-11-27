import { createRouter, createWebHashHistory } from 'vue-router'
import Main from '../views/main.vue'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children:[
      
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
