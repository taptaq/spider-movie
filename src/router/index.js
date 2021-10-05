import {
  createRouter,
  createWebHistory
} from 'vue-router'
import movieRouter from './movie'
import cinemaRouter from './cinema'
import mineRouter from './mine'
import adminRouter from './admin'

const routes = [
  movieRouter,
  cinemaRouter,
  mineRouter,
  adminRouter,
  // 管理后台登录页面
  {
    path: '/adminLogin',
    component: () => import('@/views/admin/login.vue')
  },
  {
    path: '/:catchAll(.*)', //路由都不匹配的情况下
    redirect: '/movie' //重定向到电影页面的路由
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



export default router