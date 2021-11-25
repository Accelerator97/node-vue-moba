import {createRouter, createWebHashHistory} from 'vue-router'
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
            {path:'/items/create',component:ItemEdit},
            {path:'/items/edit/:id',component:ItemEdit,props:true},
            {path:'/items/list',component:ItemList},
            {path:'/heroes/create',component:HeroEdit},
            {path:'/heroes/edit/:id',component:HeroEdit,props:true},
            {path:'/heroes/list',component:HeroList},
            {path:'/articles/create',component:ArticleEdit},
            {path:'/articles/edit/:id',component:ArticleEdit,props:true},
            {path:'/articles/list',component:ArticleList},
            {path:'/ads/create',component:AdEdit},
            {path:'/ads/edit/:id',component:AdEdit,props:true},
            {path:'/ads/list',component:AdList},
        ]
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
