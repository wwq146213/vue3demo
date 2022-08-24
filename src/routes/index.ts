import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

const routes:Array<RouteRecordRaw> = [
    { path: '/', name: 'index', component: () => import('../view/index.vue'), meta: { title: '首页' } },
]
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})
export default router