import { createRouter, createWebHashHistory } from 'vue-router'
import Main from '../views/main.vue'
import CategoryEdit from '../views/categoryEdit.vue'
import CategoryList from '../views/categoryList.vue'
import ItemEdit from '../views/itemEdit.vue'
import ItemList from '../views/itemList.vue'
import HeroEdit from '../views/heroEdit.vue'
import HeroList from '../views/heroList.vue'
import ArticleEdit from '../views/articleEdit.vue'
import ArticleList from '../views/articleList.vue'
import AdEdit from '../views/adEdit.vue'
import AdList from '../views/adList.vue'
import AdminUserEdit from '../views/adminUserEdit.vue'
import AdminUserList from '../views/adminUserList.vue'
import Login from '../views/login.vue'

const routes = [
    { 
        path: '', 
        redirect: '/login' 
    }, //重定向
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            isPublic: true
        }
    },
    {
        path: '/main',
        name: 'Main',
        component: Main,
        children: [
            { path: '/categories/create', component: CategoryEdit },
            { path: '/categories/edit/:id', component: CategoryEdit, props: true },
            { path: '/categories/list', component: CategoryList },
            { path: '/items/create', component: ItemEdit },
            { path: '/items/edit/:id', component: ItemEdit, props: true },
            { path: '/items/list', component: ItemList },
            { path: '/heroes/create', component: HeroEdit },
            { path: '/heroes/edit/:id', component: HeroEdit, props: true },
            { path: '/heroes/list', component: HeroList },
            { path: '/articles/create', component: ArticleEdit },
            { path: '/articles/edit/:id', component: ArticleEdit, props: true },
            { path: '/articles/list', component: ArticleList },
            { path: '/ads/create', component: AdEdit },
            { path: '/ads/edit/:id', component: AdEdit, props: true },
            { path: '/ads/list', component: AdList },
            { path: '/admin_users/create', component: AdminUserEdit },
            { path: '/admin_users/edit/:id', component: AdminUserEdit, props: true },
            { path: '/admin_users/list', component: AdminUserList },
        ]
    },
]



const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => { //next是一个函数，执行放行
    if (to.path === "/login") return next()
    // 获取token
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) return next('/login')
    next()
})
export default router
