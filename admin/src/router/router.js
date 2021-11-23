import {createRouter, createWebHashHistory} from 'vue-router'
import Main from '../views/main.vue'
import CategoryEdit from '../views/categoryEdit.vue'

const routes = [
    {
        path: '/',
        redirect: '/main',
    },
    {
        path: '/main',
        name: 'Main',
        component: Main,
        children:[
            {path:'/category/create',component:CategoryEdit}
        ]
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
