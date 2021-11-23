import {createRouter, createWebHashHistory} from 'vue-router'
import Main from '../views/main.vue'
import CategoryEdit from '../views/categoryEdit.vue'
import CategoryList from '../views/categoryList.vue'

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
            {path:'/categories/create',component:CategoryEdit},
            {path:'/categories/edit/:id',component:CategoryEdit,props:true},
            {path:'/categories/list',component:CategoryList},
        ]
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
