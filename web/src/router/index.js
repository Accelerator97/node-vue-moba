import { createRouter, createWebHashHistory } from 'vue-router'
import Main from '../views/main.vue'
import Home from '../views/home.vue'
import StrategyCenter from '../views/strategyCenter.vue'
import MatchCenter from '../views/matchCenter.vue'
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/main',
    name: 'Main',
    component: Main,
    children: [
      {path:'/home',component:Home},
      {path:'/strategycenter',component:StrategyCenter},
      {path:'/matchcenter',component:MatchCenter}
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
