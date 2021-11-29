import { createRouter, createWebHashHistory } from 'vue-router'
import Main from '../views/main.vue'
import Home from '../views/home.vue'
import StrategyCenter from '../views/strategyCenter.vue'
import MatchCenter from '../views/matchCenter.vue'
import ArticleDetail from '../views/articleDetail'
import HeroDetail from '../views/heroDetail'

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
      { path: '/home', component: Home },
      { path: '/articles/:id', name: 'articleDetail', component: ArticleDetail, props: true },
      { path: '/strategycenter', component: StrategyCenter },
      { path: '/matchcenter', component: MatchCenter }
    ]
  },
  {
    path: '/heroes/:id',
    name: 'heroDetail',
    component: HeroDetail,
    props: true
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
