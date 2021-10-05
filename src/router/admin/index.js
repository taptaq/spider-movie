export default {
    path:'/admin',
    component:()=>import('@/views/admin'),  //按需加载admin组件
    children:[
        {
            path:'user',
            component:()=>import('@/views/admin/user.vue')
        },
        {
            path:'movie',
            component:()=>import('@/views/admin/movie.vue')
        },
        {
            path:'cinema',
            component:()=>import('@/views/admin/cinema.vue')
        },
        {
            path:'hotData',
            component:()=>import('@/views/admin/hotData.vue')
        },
        {
            path:'/admin',
            redirect: '/admin/user'
        }
    ]
}