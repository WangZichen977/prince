//该页面用于创建整个应用的路由管理者router
import Vue from 'vue'
import Router from "vue-router";

Vue.use(Router)

//创建并暴露一个router
export default new Router({
    routes:[
        {
            path: '/',
            name: 'Login',
            component: () => import('../page/LoginPage.vue')
        },
        {
            path:'/home',
            name: 'home',
            component: () => import('../page/HomePage.vue')
        }
    ]
})
