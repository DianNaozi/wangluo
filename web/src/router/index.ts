import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home/index.vue')
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('@/views/MyColleciton/index.vue')
    },
    // 更多路由...
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
